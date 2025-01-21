<template>
  <header class="sticky top-0 left-0 flex flex-row justify-between items-center bg-background w-full py-4 z-30">
    <div class="flex flex-row justify-start items-center">
      <SidebarTrigger class="text-gray-700 hover:text-primary w-auto h-auto p-2" variant="outline" />
      <BreadcrumbCondensed :child="breadcrumb" />
    </div>
    <SearchCommand v-if="route.name !=='advanced-search'" />
  </header>
</template>

<script lang="ts" setup>
import { SidebarTrigger } from "@/components/ui/sidebar"
import BreadcrumbCondensed from "@/components/BreadcrumbCondensed.vue"
import SearchCommand from "@/components/SearchCommand.vue"

// * PROPS
const props = defineProps({
  breadcrumb: {
    type: null as unknown as PropType<string|null>,
    default: null
  },
})

// * DATA
const breadcrumb = ref<string|null>(props.breadcrumb)
const route = useRoute()
</script>
