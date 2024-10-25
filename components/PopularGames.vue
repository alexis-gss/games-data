<template>
  <div class="relative">
    <h2 class="flex items-center justify-start mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-4">
      <Flame />Popular right now
    </h2>
    <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
    <Carousel class="w-full mx-auto mb-4" v-else>
      <CarouselContent class="-ml-1 px-8">
        <CarouselItem v-for="(game, gameIndex) in games" :key="gameIndex" class="pl-1 md:basis-1/4 lg:basis-1/6">
          <div class="p-1">
            <Card>
              <CardContent class="flex aspect-square items-center justify-center p-6">
                <span class="text-2xl font-semibold">{{ game.name }}</span>
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
import errors from '~/utils/errors'

// * DATA
const categories = ref<Array<PopularCategory>>([])
const games = ref<Array<Game>>([])
const loading = ref<boolean>(true)
const errorMessage = ref<string|null>(null)

getPopularGamesFromApi()

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
    categories.value = data.value
  } catch (error) {
    errorMessage.value = errors.methods.handleAjaxError(error)
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
  categories.value.forEach(element => {
    queries = queries + `query games "Popular ${element.game_id}" { fields name,first_release_date; where id = ${element.game_id}; };`
  });
  try {
    const { data } = await useFetch('/api/igdb-api', {
      method: 'POST',
      body: { endpoint: 'multiquery', query: queries }
    })
    let results = data.value as Array<{result: Array<Game>}>;
    results.forEach(category => {
      games.value.push(category.result[0])
    })
  } catch (error) {
    errorMessage.value = errors.methods.handleAjaxError(error)
  }
}
</script>
