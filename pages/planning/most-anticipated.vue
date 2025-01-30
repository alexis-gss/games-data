<template>
  <AppHeader breadcrumb="Most anticipated" />
  <ResultsTemplate
    title="Most anticipated games"
    :icon="CalendarCheck"
    :query="JSON.stringify(query)"
  />
</template>

<script lang="ts" setup>
import { CalendarCheck } from 'lucide-vue-next'
import AppHeader from "~/components/layout/AppHeader.vue"
import ResultsTemplate from "~/components/ResultsTemplate.vue"

definePageMeta({
  layout: 'default'
})

// * DATA
const currentDate = ref<Date>(new Date())
const futurDate = ref<Date>(new Date())
futurDate.value.setFullYear(currentDate.value.getFullYear() + 10)
const query = {
  dates: `${currentDate.value.toISOString().slice(0, 10)},${futurDate.value.toISOString().slice(0, 10)}`,
  ordering: '-added',
}
</script>
