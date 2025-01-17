<template>
  <AppHeader breadcrumb="Popular" />
  <ResultsTemplate
    title="Most popular games"
    :icon="Flame"
    :query="JSON.stringify(query)"
  />
</template>

<script lang="ts" setup>
import { Flame } from 'lucide-vue-next'
import AppHeader from "@/components/layout/AppHeader.vue"
import ResultsTemplate from "@/components/ResultsTemplate.vue"

definePageMeta({
  layout: 'default'
})

// * DATA
const query = reactive<{ordering: string}>({
  ordering: '-popularity',
})
</script>
