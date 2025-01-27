<template>
  <AppHeader />
  <div class="relative">
    <template
      v-for="(section, sectionIndex) in sections"
      :key="sectionIndex"
    >
      <h2 class="flex items-center justify-start mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-4">
        <component :is="section.icon" class="mr-[5px]" />
      </h2>
      <component :is="section.component" :loading="loading" :models="section.games" />
    </template>
  </div>
</template>

<script lang="ts" setup>
// https://lucide.dev/icons/
import { Flame, CalendarCheck, CalendarIcon } from 'lucide-vue-next'
import errors from '@/utils/errors'
import AppHeader from "@/components/layout/AppHeader.vue"
import Trending from "~/components/Trending.vue"
import Counters from "~/components/Counters.vue"
import Releases from "~/components/Releases.vue"

definePageMeta({
  layout: 'default'
})

// * DATA
const sections = ref<Array<{
  title: string,
  icon: Function,
  component: Object,
  games: Array<Game>
}>>([
  {
    title: 'Trending',
    icon: Flame,
    component: Trending,
    games: [],
  },
  {
    title: 'Countdowns',
    icon: CalendarCheck,
    component: Counters,
    games: [],
  },
  {
    title: 'Releases',
    icon: CalendarIcon,
    component: Releases,
    games: [],
  },
])
const loading = ref<boolean>(true)
const errorMessage = ref<string|null>(null)

// Dates
const today = ref<Date>(new Date())
const dateTrending = ref<Date>(new Date(today.value.getTime() - 15 * 24 * 60 * 60 * 1000))
const dateReleased = ref<Date>(new Date(today.value.getTime()))
dateReleased.value.setDate(dateReleased.value.getDate() - 5);
const dateUpcoming = ref<Date>(new Date(today.value.getTime()))
dateUpcoming.value.setDate(dateUpcoming.value.getDate() + 5);
const dateAnticipated = ref<Date>(new Date(today.value.getTime()))
dateAnticipated.value.setFullYear(today.value.getFullYear() + 10)

getResultsFromApi()

/**
 * Get games from ids.
 * @return Promise<void>
 */
async function getResultsFromApi(): Promise<void> {
  try {
    loading.value = true
    const [dataTrending, dataAnticipated, dataTimeline] = await Promise.all([
      $fetch('/api/rawg-api', {
        method: 'POST',
        body: {
          endpoint: 'games',
          query: {
            dates: `${dateTrending.value.toISOString().slice(0, 10)},${today.value.toISOString().slice(0, 10)}`,
            ordering: '-popularity',
            page_size: '10',
          }
        }
      }),
      $fetch('/api/rawg-api', {
        method: 'POST',
        body: {
          endpoint: 'games',
          query: {
            dates: `${today.value.toISOString().slice(0, 10)},${dateAnticipated.value.toISOString().slice(0, 10)}`,
            ordering: '-added',
            page_size: '4',
          }
        }
      }),
      $fetch('/api/rawg-api', {
        method: 'POST',
        body: {
          endpoint: 'games',
          query: {
            dates: `${dateReleased.value.toISOString().slice(0, 10)},${dateUpcoming.value.toISOString().slice(0, 10)}`,
            ordering: '-released',
          }
        }
      }),
    ])
    sections.value[0].games = dataTrending.results
    sections.value[1].games = dataAnticipated.results
    sections.value[2].games = dataTimeline.results
  } catch (error) {
    errorMessage.value = errors.methods.handleAjaxError(error)
  } finally {
    loading.value = false
  }
}
</script>
