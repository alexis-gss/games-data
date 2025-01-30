<template>
  <header class="sticky top-0 left-0 flex flex-row justify-between items-center bg-background w-full py-4 z-30">
    <div class="flex flex-row justify-start items-center">
      <SidebarTrigger class="text-gray-700 hover:text-primary w-auto h-auto p-2" variant="outline" />
      <Breadcrumb class="border-s ms-3 px-3 md:ms-4 md:px-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <NuxtLink to="/" class="text-foreground hover:text-primary">Home</NuxtLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <template v-if="breadcrumb">
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{{ breadcrumb }}</BreadcrumbPage>
            </BreadcrumbItem>
          </template>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    <SearchCommand v-if="route.name !=='advanced-search'" />
  </header>
</template>

<script lang="ts" setup>
import { SidebarTrigger } from "~/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import SearchCommand from "~/components/SearchCommand.vue"

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
