<template>
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset class="container">
      <slot />
    </SidebarInset>
  </SidebarProvider>
</template>

<script lang="ts" setup>
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "@/components/layout/AppSidebar.vue"
</script>
