<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div v-for="(gameCategory, gameCategoryIndex) in gamesList" :key="gameCategoryIndex">
      <h2 class="flex items-center justify-start mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-4">
        <component :is="gameCategory.icon" class="mr-[5px]" />
        {{ gameCategory.title }}
      </h2>
      <ul class="grid grid-cols-1 gap-4">
        <li v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</li>
        <template v-else>
          <template v-if="loading">
            <li v-for="skeleton in 5" :key="skeleton">
              <Card>
                <CardContent class="space-y-2 p-4">
                  <Skeleton class="h-6 w-full" />
                  <Skeleton class="h-4 w-1/2 pb-[18px]" />
                </CardContent>
              </Card>
            </li>
          </template>
          <template v-else>
            <li v-for="(game, gameIndex) in gameCategory.games" :key="gameIndex">
              <CardGame :game="game" :loading="loading" />
            </li>
          </template>
        </template>
      </ul>
      <NuxtLink :to="gameCategory.link" class="block font-medium text-primary underline underline-offset-4 p-4">
        See more
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { History, Hourglass, CalendarCheck } from 'lucide-vue-next'
import errors from '~/utils/errors'

// * DATA
const loading = ref<boolean>(true)
const errorMessage = ref<string|null>(null)
const unixTimestamp = ref<number>(Math.floor(new Date().getTime() / 1000))
const gamesList = reactive<Array<GameCategory>>([
  {
    title: 'Recently released',
    games: [],
    query: `query games "Recently released" { fields name,cover.url,first_release_date; where first_release_date <= ${unixTimestamp.value} & first_release_date != null; sort first_release_date desc; limit 5; };`,
    link: '/planning/recently-released',
    icon: History
  },
  {
    title: 'Upcoming release',
    games: [],
    query: `query games "Upcoming release" { fields name,cover.url,first_release_date; where first_release_date >= ${unixTimestamp.value} & first_release_date != null; sort first_release_date asc; limit 5; };`,
    link: '/planning/upcoming-release',
    icon: Hourglass
  },
  {
    title: 'Most anticipated',
    games: [],
    query: `query games "Most anticipated" { fields name,cover.url,first_release_date; where first_release_date >= ${unixTimestamp.value} & first_release_date != null & hypes != null; sort hypes desc; limit 5; };`,
    link: '/planning/most-anticipated',
    icon: CalendarCheck
  }
])

getGamesListFromApi()

// * METHODS

/**
 * Get results by multiple queries.
 * @return Promise<void>
 */
async function getGamesListFromApi(): Promise<void> {
  loading.value = true
  let newQuery = ""
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
  } catch (error) {
    errorMessage.value = errors.methods.handleAjaxError(error)
  } finally {
    loading.value = false
  }
}
</script>
