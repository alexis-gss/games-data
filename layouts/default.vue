<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="container container-custom">
      <slot />
      <AppFooter />
    </SidebarInset>
  </SidebarProvider>
</template>

<script lang="ts" setup>
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "@/components/layout/AppSidebar.vue"
import AppFooter from "@/components/layout/AppFooter.vue"
import { useConfigStore } from '@/utils/config'
import { allColors } from '@/utils/colors'

const { mode, theme, radius } = useConfigStore()

// Whenever the component is mounted, update the document class list.
onMounted(() => {
  document.documentElement.style.setProperty('--radius', `${radius.value}rem`)
  document.documentElement.classList.add(`theme-${theme.value}`)
  document.documentElement.classList.add(`${mode.value}`)
})

// Whenever the theme value changes, update the document class list.
watch(theme, (theme) => {
  document.documentElement.classList.remove(
    ...allColors.map(color => `theme-${color}`),
  )
  document.documentElement.classList.add(`theme-${theme}`)
})

// Whenever the mode value changes, update the document class list.
watch(mode, (mode) => {
  document.documentElement.classList.remove(
    ...allModes.map(mode => `${mode}`),
  )
  document.documentElement.classList.add(`${mode}`)
})

// Whenever the radius value changes, update the document style.
watch(radius, (radius) => {
  document.documentElement.style.setProperty('--radius', `${radius}rem`)
})
</script>

<style lang="css">
.container-custom {
  width: calc(100% - var(--sidebar-width));
}
</style>
