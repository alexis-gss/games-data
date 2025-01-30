<template>
  <AppHeader breadcrumb="Upcoming release" />
  <ResultsTemplate
    title="Upcoming games release"
    :icon="Hourglass"
    :query="JSON.stringify(query)"
  />
</template>

<script lang="ts" setup>
import { Hourglass } from 'lucide-vue-next'
import AppHeader from "~/components/layout/AppHeader.vue"
import ResultsTemplate from "~/components/ResultsTemplate.vue"

definePageMeta({
  layout: 'default'
})

// * DATA
const currentDate = ref<Date>(new Date())
const futurDate = ref<Date>(new Date())
currentDate.value.setDate(currentDate.value.getDate() + 1)
futurDate.value.setFullYear(currentDate.value.getFullYear() + 10)
const query = {
  dates: `${currentDate.value.toISOString().slice(0, 10)},${futurDate.value.toISOString().slice(0, 10)}`,
  ordering: 'released',
}
</script>
