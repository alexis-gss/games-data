<template>
  <AppHeader breadcrumb="Recently released" />
  <ResultsTemplate
    title="Recently released games"
    :icon="History"
    :query="JSON.stringify(query)"
  />
</template>

<script lang="ts" setup>
import { History } from 'lucide-vue-next'
import AppHeader from "~/components/layout/AppHeader.vue"
import ResultsTemplate from "~/components/ResultsTemplate.vue"

definePageMeta({
  layout: 'default'
})

// * DATA
const currentDate = ref<Date>(new Date())
const pastDate = ref<Date>(new Date())
pastDate.value.setFullYear(currentDate.value.getFullYear() - 10)
const query = {
  dates: `${pastDate.value.toISOString().slice(0, 10)},${currentDate.value.toISOString().slice(0, 10)}`,
  ordering: '-released',
}
</script>
