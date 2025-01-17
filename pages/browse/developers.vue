<template>
  <AppHeader breadcrumb="Developers" />
  <ResultsTemplate
    title="All developers"
    :icon="CodeXml"
    endpoint="developers"
    :card="CardBrowseMedium"
    :cardPlaceholder="CardBrowsePlaceholderMedium"
    wrapperClass="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
  />
</template>

<script lang="ts" setup>
import { CodeXml } from 'lucide-vue-next'
import AppHeader from "@/components/layout/AppHeader.vue"
import ResultsTemplate from "@/components/ResultsTemplate.vue"
import CardBrowseMedium from "@/components/cards/browse/CardBrowseMedium.vue"
import CardBrowsePlaceholderMedium from "@/components/cards/browse/CardBrowsePlaceholderMedium.vue"

definePageMeta({
  layout: 'default'
})
</script>
