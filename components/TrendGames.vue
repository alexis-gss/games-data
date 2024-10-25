<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div v-for="(gameCategory, gameCategoryIndex) in gamesList" :key="gameCategoryIndex">
      <CategoryList :gameCategory="gameCategory" :loading="loading" :error="error" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { History, Hourglass, CalendarCheck } from 'lucide-vue-next'

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

/**
 * Get results by multiple queries.
 * @return void
 */
async function getGamesListFromApi(): void {
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
