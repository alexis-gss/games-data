<template>
  <header class="flex flex-row justify-start items-center">
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
const breadcrumb = ref<string>(props.breadcrumb)

</script>
