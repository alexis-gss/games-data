<template>
  <AppHeader breadcrumb="Upcoming release" />
  <SimpleResultsTemplate title="Upcoming games release" :icon="Hourglass" :query="query" />
</template>

<script lang="ts" setup>
import { Hourglass } from 'lucide-vue-next'
import AppHeader from "@/components/layout/AppHeader.vue"
import SimpleResultsTemplate from "@/components/SimpleResultsTemplate.vue"

definePageMeta({
  layout: 'default'
})

// * DATA
const unixTimestamp = ref<number>(Math.floor(new Date().getTime() / 1000))
const query = `fields name,cover.url,first_release_date; where first_release_date >= ${unixTimestamp.value} & first_release_date != null; sort first_release_date asc;`
</script>
