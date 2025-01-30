<template>
  <AppHeader breadcrumb="Stores" />
  <ResultsTemplate
    title="All stores"
    :icon="Download"
    endpoint="stores"
    :card="CardBrowse"
    :cardPlaceholder="CardBrowsePlaceholderMedium"
    wrapperClass="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
  />
</template>

<script lang="ts" setup>
import { Download } from 'lucide-vue-next'
import AppHeader from "~/components/layout/AppHeader.vue"
import ResultsTemplate from "~/components/ResultsTemplate.vue"
import CardBrowse from "~/components/cards/CardBrowse.vue"
import CardBrowsePlaceholderMedium from "~/components/cards/placeholders/CardBrowsePlaceholder.vue"

definePageMeta({
  layout: 'default'
})
</script>
