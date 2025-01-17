<template>
  <SidebarProvider vaul-drawer-wrapper>
    <AppSidebar />
    <SidebarInset>
      <div class="container">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<script lang="ts" setup>
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "@/components/layout/AppSidebar.vue"
</script>
