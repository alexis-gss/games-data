<template>
  <SidebarProvider>
    <AppSidebar />
    <main class="container">
      <slot />
    </main>
  </SidebarProvider>
</template>

<script lang="ts" setup>
import AppSidebar from "@/components/layout/AppSidebar.vue"
import SidebarProvider from "@/components/ui/sidebar/SidebarProvider.vue"
</script>
