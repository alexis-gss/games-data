<template>
  <Breadcrumb class="border-s ms-3 px-3 md:ms-4 md:px-4">
    <BreadcrumbList>
      <BreadcrumbItem>
        <BreadcrumbLink asChild>
          <NuxtLink to="/" class="text-foreground hover:text-primary">Home</NuxtLink>
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
