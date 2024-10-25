<template>
  <header class="sticky top-0 left-0 flex flex-row justify-start items-center bg-white w-full z-10">
    <SidebarTrigger />
    <BreadcrumbCondensed :child="breadcrumb" />
  </header>
</template>

<script lang="ts" setup>
import { SidebarTrigger } from "@/components/ui/sidebar"
import BreadcrumbCondensed from "@/components/BreadcrumbCondensed.vue"

// * PROPS
const props = defineProps({
  breadcrumb: {
    type: null as unknown as PropType<string|null>,
    default: null
  },
})

// * DATA
const breadcrumb = ref<string|null>(props.breadcrumb)
</script>
