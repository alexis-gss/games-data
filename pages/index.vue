<template>
  <div>
    <AppHeader />
    <PopularGames />
    <TrendGames />
  </div>
</template>

<script lang="ts" setup>
// https://lucide.dev/icons/
import AppHeader from "@/components/AppHeader.vue"
import PopularGames from "@/components/PopularGames.vue"
import TrendGames from "@/components/TrendGames.vue"

definePageMeta({
  layout: 'default'
})
</script>
