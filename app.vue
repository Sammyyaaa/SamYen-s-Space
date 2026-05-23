<script setup lang="ts">
import AppCursor from '~/components/ui/AppCursor.vue'
import AppNav from '~/components/ui/AppNav.vue'
import { usePageTransition } from '~/composables/usePageTransition'

const { enter, leave } = usePageTransition()
</script>

<template>
  <!--
    AppCursor 必須在 NuxtPage / Transition 之外：
    若放在 DefaultLayout（Transition 的目標元素）內，
    GSAP 的頁面過渡會對 layout 根元素套用 transform，
    使所有 position: fixed 子元素的基準變為 layout 而非 viewport，
    導致捲動後游標與導覽列偏移至可視區域外。
  -->
  <AppCursor />
  <AppNav />

  <NuxtPage
    :transition="{
      mode: 'out-in',
      css: false,
      onEnter: enter,
      onLeave: leave,
    }"
  />
</template>
