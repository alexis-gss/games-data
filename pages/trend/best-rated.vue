<template>
  <AppHeader breadcrumb="Best rated" />
  <ResultsTemplate
    title="Best rated games"
    :icon="Trophy"
    :query="JSON.stringify(query)"
  />
</template>

<script lang="ts" setup>
import { Trophy } from 'lucide-vue-next'
import AppHeader from "@/components/layout/AppHeader.vue"
import ResultsTemplate from "@/components/ResultsTemplate.vue"

definePageMeta({
  layout: 'default'
})

// * DATA
const query = {
  metacritic: '1,100',
  ordering: '-metacritic',
}
</script>
