<template>
  <AppHeader breadcrumb="Game" />
  <p>{{ game?.name }}</p>
</template>

<script lang="ts" setup>
import AppHeader from "@/components/layout/AppHeader.vue"

definePageMeta({
  layout: 'default'
})

// * DATA
const { slug } = useRoute().params
const game = ref<Game|null>(null)
const loading = ref<boolean>(true)
const errorMessage = ref<string|null>(null)
getGame()
// * METHODS

/**
 * Get games from ids.
 * @return Promise<void>
 */
async function getGame(): Promise<void> {
  try {
    loading.value = true
    const { data } = await useFetch('/api/rawg-api', {
      method: 'POST',
      body: {
        endpoint: 'games',
        query: {
          search: slug,
        }
      }
    })
    game.value = data.value.results[0]
  } catch (error) {
    errorMessage.value = errors.methods.handleAjaxError(error)
  } finally {
    loading.value = false
    console.log(game.value)
  }
}
</script>
