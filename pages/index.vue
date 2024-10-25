<template>
  <div class="container mx-auto px-4 py-8">
    <Button
      @click="getGamesListFromApi"
      class=""
      :disabled="loading"
    >
      <template v-if="loading">
        <LoaderCircle class="animate-spin -ml-1 h-5 w-5 text-white" />
        Chargement...
      </template>
      <template v-else>
        Refresh data
      </template>
    </Button>
    <!-- POPULAR GAMES -->
    <h2 class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-4">
      Popular right now
    </h2>
    <Carousel class="w-full mx-auto mb-4">
      <CarouselContent class="-ml-1 px-8">
        <CarouselItem v-for="index in 10" :key="index" class="pl-1 md:basis-1/4 lg:basis-1/6">
          <div class="p-1">
            <Card>
              <CardContent class="flex aspect-square items-center justify-center p-6">
                <span class="text-2xl font-semibold">{{ index }}</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious class="left-0" />
      <CarouselNext class="right-0" />
    </Carousel>
    <!-- LISTS GAMES -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div v-for="(gameCategory, gameCategoryIndex) in gamesList" :key="gameCategoryIndex">
        <h2 class="flex items-center justify-start mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-4">
          <component :is="gameCategory.icon" class="mr-[5px]" />
          {{ gameCategory.title }}
        </h2>
        <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
        <ul v-else class="grid grid-cols-1 gap-4">
          <li v-for="(game, gameIndex) in gameCategory.games" :key="gameIndex">
            <CardGame :game="game" :loading="loading" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// https://lucide.dev/icons/
import { LoaderCircle, Hourglass, History, CalendarCheck, Flame } from 'lucide-vue-next'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

definePageMeta({
  layout: 'default'
})

const loading = ref<boolean>(true)
const error = ref<string|null>(null)
const unixTimestamp = Math.floor(new Date().getTime() / 1000)
const gamesList = reactive<Array<GameCategory>>([
  {
    title: 'Recently released',
    games: [],
    query: 'query games "Recently released" { fields name,first_release_date; where first_release_date <= ' + unixTimestamp + ' & first_release_date != null; sort first_release_date desc; limit 5; };',
    icon: History
  },
  {
    title: 'Coming soon',
    games: [],
    query: 'query games "Coming soon" { fields name,first_release_date; where first_release_date >= ' + unixTimestamp + ' & first_release_date != null; sort first_release_date asc; limit 5; };',
    icon: Hourglass
  },
  {
    title: 'Most anticipated',
    games: [],
    query: 'query games "Most anticipated" { fields name,first_release_date; where first_release_date >= ' + unixTimestamp + ' & first_release_date != null & hypes != null; sort hypes desc; limit 5; };',
    icon: CalendarCheck
  }
])

getGamesListFromApi()

async function getGamesListFromApi() {
  loading.value = true
  error.value = null
  let newQuery = "";
  gamesList.forEach((gameCategory) => {
    newQuery += gameCategory.query
  })
  try {
    const { data } = await useFetch('/api/igdb-api', {
      method: 'POST',
      body: { endpoint: 'multiquery', query: newQuery }
    })
    data.value.forEach((element: {name: string, result: Array<Game>}, elementIndex: number) => {
      gamesList[elementIndex].title = element.name
      gamesList[elementIndex].games = element.result
    });
  } catch (err) {
    error.value = "Erreur lors de la recherche des jeux"
  } finally {
    loading.value = false
  }
}
</script>
