'use strict'
// WSL2 workaround: this environment has no Unix domain socket support.
// Patch both net.Server.prototype.listen AND net.createConnection to redirect
// Unix socket paths to TCP ports, coordinated via a shared JSON file registry.
const net = require('net')
const fs = require('fs')
const path = require('path')
const os = require('os')

const REGISTRY = path.join(os.tmpdir(), '.nuxt-wsl2-sockets.json')

function isUnix(addr) {
  return typeof addr === 'string' && (addr.charCodeAt(0) === 0 || addr.endsWith('.sock'))
}
function readReg() {
  try {
    return JSON.parse(fs.readFileSync(REGISTRY, 'utf8'))
  } catch {
    return {}
  }
}
function writeReg(data) {
  try {
    fs.writeFileSync(REGISTRY, JSON.stringify(data))
  } catch {}
}

// ── listen side ───────────────────────────────────────────────────────────────
// socket path → random TCP port; writes port to registry after bind succeeds.
const _listen = net.Server.prototype.listen
net.Server.prototype.listen = function (addr, ...args) {
  if (!isUnix(addr)) return _listen.call(this, addr, ...args)
  const key = addr
  const srv = this
  const cbs = args.filter((a) => typeof a === 'function')
  return _listen.call(this, 0, '127.0.0.1', function () {
    const port = srv.address().port
    const reg = readReg()
    reg[key] = port
    writeReg(reg)
    cbs.forEach((cb) => cb.call(this))
  })
}

// ── connect side ──────────────────────────────────────────────────────────────
// Looks up the registry; if the port is registered connect via TCP immediately.
// If not yet registered, returns a deferred Socket that retries every 100ms
// (max 20 attempts = 2 s) — compatible with Vite Node Runner's own retry logic.
const _rawConnect = net.createConnection.bind(net)

function patchedConnect(addr, ...args) {
  if (!isUnix(addr)) return _rawConnect(addr, ...args)

  const key = addr
  const cbs = args.filter((a) => typeof a === 'function')

  const reg = readReg()
  if (reg[key]) {
    return _rawConnect(reg[key], '127.0.0.1', ...cbs)
  }

  // Port not in registry yet — create a socket and defer connection.
  const sock = new net.Socket()
  if (cbs.length) cbs.forEach((cb) => sock.once('connect', cb))

  let attempts = 0
  function tryConnect() {
    const r = readReg()
    if (r[key]) {
      sock.connect(r[key], '127.0.0.1')
    } else if (++attempts < 20) {
      setTimeout(tryConnect, 100)
    } else {
      sock.destroy(
        Object.assign(new Error(`[wsl2-fix] registry timeout: ${key}`), { code: 'ENOENT' })
      )
    }
  }
  process.nextTick(tryConnect)
  return sock
}

net.createConnection = patchedConnect
net.connect = patchedConnect
