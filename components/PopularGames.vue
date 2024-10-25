<template>
  <div class="relative">
    <h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-4">
      <Flame />Popular right now
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
  </div>
</template>

<script lang="ts" setup>
import { Flame } from 'lucide-vue-next'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const popularGames = ref<Array<PopularCategory>>([]);
const loading = ref<boolean>(true)
const error = ref<string|null>(null)

// getPopularGamesFromApi()

/**
 * Get most playing id games.
 * @return Promise<void>
 */
async function getPopularGamesFromApi(): Promise<void> {
  try {
    const { data } = await useFetch('/api/igdb-api', {
      method: 'POST',
      body: { endpoint: 'popularity_primitives', query: 'fields game_id; sort value desc; where popularity_type = 1; limit 10;' }
    })
    popularGames.value = data.value
  } catch (error) {
    console.error('Erreur détaillée:', error.response?.data || error.message)
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: error.response?.data?.message || 'Erreur lors de la recherche des jeux'
    })
  } finally {
    getSearchPopularGamesFromApi()
  }
}

/**
 * Get games from ids.
 * @return Promise<void>
 */
async function getSearchPopularGamesFromApi(): Promise<void> {
  let queries = ""
  popularGames.value.forEach(element => {
    queries = queries + `query games "Popular ${element.game_id}" { fields name; where id = ${element.game_id}; };`
  });
  console.log("popular games", popularGames.value, queries)
  try {
    const { data } = await useFetch('/api/igdb-api', {
      method: 'POST',
      body: { endpoint: 'multiquery', query: queries }
    })
    console.log("popular games", data.value)
  } catch (error) {
    console.error('Erreur détaillée:', error.response?.data || error.message)
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: error.response?.data?.message || 'Erreur lors de la recherche des jeux'
    })
  }
}
</script>
