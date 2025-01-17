<template>
  <AppHeader />
  <!-- <PopularGames /> -->
  <!-- <PlanningGames /> -->
</template>

<script lang="ts" setup>
// https://lucide.dev/icons/
import AppHeader from "@/components/layout/AppHeader.vue"
import PopularGames from "@/components/PopularGames.vue"
import PlanningGames from "@/components/PlanningGames.vue"

definePageMeta({
  layout: 'default'
})
</script>
