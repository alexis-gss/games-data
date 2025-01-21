<template>
  <AppHeader />
  <div class="relative">
    <h2 class="flex items-center justify-start mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-4">
      <Flame />Popular right now
    </h2>
    <Carousel class="w-full mx-auto mb-4">
      <CarouselContent class="-ml-1 px-8">
        <CarouselItem v-for="(game, gameIndex) in gamesPopular" :key="gameIndex" class="pl-1 md:basis-1/4 lg:basis-1/6">
          <Card>
            <CardContent class="flex aspect-square items-center justify-center p-6">
              <span class="text-2xl font-semibold">{{ game.name }}</span>
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious class="left-0" />
      <CarouselNext class="right-0" />
    </Carousel>
    <h2 class="flex items-center justify-start mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-4">
      <History />Releases last 15 days
    </h2>
    <Carousel class="w-full mx-auto mb-4">
      <CarouselContent class="-ml-1 px-8">
        <CarouselItem v-for="(game, gameIndex) in gamesReleased" :key="gameIndex" class="pl-1 md:basis-1/4 lg:basis-1/6">
          <Card>
            <CardContent class="flex aspect-square items-center justify-center p-6">
              <span class="text-2xl font-semibold">{{ game.name }}</span>
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious class="left-0" />
      <CarouselNext class="right-0" />
    </Carousel>
    <h2 class="flex items-center justify-start mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-4">
      <Hourglass />Releases next 15 days
    </h2>
    <Carousel class="w-full mx-auto mb-4">
      <CarouselContent class="-ml-1 px-8">
        <CarouselItem v-for="(game, gameIndex) in gamesUpcoming" :key="gameIndex" class="pl-1 md:basis-1/4 lg:basis-1/6">
          <Card>
            <CardContent class="flex aspect-square items-center justify-center p-6">
              <span class="text-2xl font-semibold">{{ game.name }}</span>
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious class="left-0" />
      <CarouselNext class="right-0" />
    </Carousel>
  </div>
</template>

<script lang="ts" setup>
// https://lucide.dev/icons/
import { Flame, History, Hourglass } from 'lucide-vue-next'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import errors from '@/utils/errors'
import AppHeader from "@/components/layout/AppHeader.vue"

definePageMeta({
  layout: 'default'
})

// * DATA
const gamesPopular = ref<Array<Game>>([])
const gamesReleased = ref<Array<Game>>([])
const gamesUpcoming = ref<Array<Game>>([])
const loading = ref<boolean>(true)
const errorMessage = ref<string|null>(null)

const today = ref<Date>(new Date())
const fifteenDays = ref<number>(15 * 24 * 60 * 60 * 1000)
const dateMinus15Days = ref<Date>(new Date(today.value.getTime() - fifteenDays.value));
const dateAdd15Days = ref<Date>(new Date(today.value.getTime() + fifteenDays.value));

getResultsFromApi()

/**
 * Get games from ids.
 * @return Promise<void>
 */
async function getResultsFromApi(): Promise<void> {
  try {
    loading.value = true
    const [dataPopular, dataReleased, dataUpcoming] = await Promise.all([
      $fetch('/api/rawg-api', {
        method: 'POST',
        body: {
          endpoint: 'games',
          query: setParams(JSON.stringify({
            dates: `${dateMinus15Days.value.toISOString().slice(0, 10)},${today.value.toISOString().slice(0, 10)}`,
            ordering: '-popularity',
          }))
        }
      }),
      $fetch('/api/rawg-api', {
        method: 'POST',
        body: {
          endpoint: 'games',
          query: setParams(JSON.stringify({
            dates: `${dateMinus15Days.value.toISOString().slice(0, 10)},${today.value.toISOString().slice(0, 10)}`,
            ordering: '-released',
          }))
        }
      }),
      $fetch('/api/rawg-api', {
        method: 'POST',
        body: {
          endpoint: 'games',
          query: setParams(JSON.stringify({
            dates: `${today.value.toISOString().slice(0, 10)},${dateAdd15Days.value.toISOString().slice(0, 10)}`,
            ordering: 'released',
          }))
        }
      }),
    ])
    gamesPopular.value = dataPopular.results
    gamesReleased.value = dataReleased.results
    gamesUpcoming.value = dataUpcoming.results
  } catch (error) {
    errorMessage.value = errors.methods.handleAjaxError(error)
  } finally {
    loading.value = false
    console.log("success")
  }
}

/**
 * Set params pagination.
 * @param string query
 * @return Object
 */
function setParams(query: string): Object {
  let params = JSON.parse(query)
  params['page'] = 1
  params['page_size'] = 10
  return params
}
</script>
