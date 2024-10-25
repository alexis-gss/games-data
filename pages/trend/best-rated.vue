<template>
  <AppHeader breadcrumb="Best rated" />
  <SimpleResultsTemplate title="Best rated games" :icon="Trophy" :query="query" />
</template>

<script lang="ts" setup>
import { Trophy } from 'lucide-vue-next'
import AppHeader from "@/components/layout/AppHeader.vue"

definePageMeta({
  layout: 'default'
})

// * DATA
const query = `fields name,cover.url,rating,first_release_date; where rating != null; sort rating desc;`
</script>
