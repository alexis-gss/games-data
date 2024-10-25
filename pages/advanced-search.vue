<template>
  <AppHeader breadcrumb="Advanced search" />
</template>

<script lang="ts" setup>
import AppHeader from "@/components/AppHeader.vue"

definePageMeta({
  layout: 'default'
})

const loading = ref<boolean>(true)
const error = ref<string|null>(null)
</script>
