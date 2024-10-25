<template>
  <AppHeader breadcrumb="Recently released" />
  <SimpleResultsTemplate title="Recently released games" :icon="History" :query="query" />
</template>

<script lang="ts" setup>
import { History } from 'lucide-vue-next'
import AppHeader from "@/components/layout/AppHeader.vue"
import SimpleResultsTemplate from "@/components/SimpleResultsTemplate.vue"

definePageMeta({
  layout: 'default'
})

// * DATA
const unixTimestamp = ref<number>(Math.floor(new Date().getTime() / 1000))
const query = `fields name,cover.url,first_release_date; where first_release_date <= ${unixTimestamp.value} & first_release_date != null; sort first_release_date desc;`
</script>
