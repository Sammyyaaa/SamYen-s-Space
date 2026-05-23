// ── Portfolio Data Types ──

export interface ProjectSection {
  title: string
  items: string[]
}

export interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  year: string
  period?: string
  category: 'company' | 'personal' | 'team'
  /** Image URL for the project cover */
  cover: string
  /** Accent color for project card (hex) */
  color: string
  link?: string
  featured?: boolean
  sections?: ProjectSection[]
  tools?: string[]
}

export interface Stat {
  value: string
  label: string
}

export interface Skill {
  name: string
  category: 'basics' | 'styling' | 'frameworks' | 'state' | 'build' | 'api' | 'uiux' | 'devtools' | 'aitools'
}

export interface NavLink {
  label: string
  href: string
  external?: boolean
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}

// ── Cursor State ──
export interface CursorState {
  x: number
  y: number
  variant: CursorVariant
  label?: string
  scale: number
}

export type CursorVariant =
  | 'default'
  | 'hover'
  | 'text'
  | 'link'
  | 'project'
  | 'drag'

// ── Page Transition ──
export interface PageTransitionConfig {
  duration: number
  ease: string
}

// ── Scroll Direction ──
export type ScrollDirection = 'up' | 'down' | 'idle'

// ── Theme ──
export type Theme = 'dark' | 'light'
