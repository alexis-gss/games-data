<template>
  <div class="py-8">
    <Breadcrumb class="border-s ms-4 px-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <NuxtLink to="/" class="text-gray-700 hover:text-blue-600">Home</NuxtLink>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <template v-if="child">
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{{ child }}</BreadcrumbPage>
          </BreadcrumbItem>
        </template>
      </BreadcrumbList>
    </Breadcrumb>
  </div>
</template>

<script lang="ts" setup>
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// * PROPS
const props = defineProps({
  child: {
    type: null as unknown as PropType<string|null>,
    default: null
  },
})

// * DATA
const child = ref<string|null>(props.child)
</script>
