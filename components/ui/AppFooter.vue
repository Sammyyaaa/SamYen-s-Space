<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer" aria-label="Site footer">
    <div class="line-gradient" />
    <div class="footer-inner">
      <!-- Brand -->
      <div class="footer-brand">
        <span class="footer-logo">
          <span class="footer-logo__first">Sam</span><span class="footer-logo__last">Yen</span>
        </span>
        <p class="footer-tagline">
          Frontend Engineer — Vue · Angular · TypeScript
        </p>
      </div>

      <!-- Copyright -->
      <p class="footer-copy">
        &copy; {{ year }} SamYen. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<style scoped>
@reference "~/assets/styles/main.css";

.footer {
  @apply bg-surface-950 text-surface-400;
  padding: 4rem 2rem;
}

.footer-inner {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

@media (min-width: 768px) {
  .footer-inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.footer-logo {
  display: block;
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  @apply text-surface-50;
  margin-bottom: 0.75rem;
}

.footer-logo__first {
  @apply text-surface-50;
}

.footer-logo__last {
  @apply text-surface-400;
}

.footer-tagline {
  @apply text-sm leading-relaxed;
}

.footer-copy {
  @apply text-xs text-surface-500;
}
</style>
