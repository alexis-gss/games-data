<template>
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button
        class="w-full justify-start text-gray-700 hover:text-blue-600"
        variant="outline"
        @click="resetSearch"
      >
        <Search />Search
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <div class="relative w-full items-center">
          <div class="flex flex-row justify-between align-center">
            <AlertDialogTitle class="font-bold">Search</AlertDialogTitle>
            <AlertDialogCancel>
              <X />
            </AlertDialogCancel>
          </div>
          <AlertDialogDescription class="mb-2">
            Perform a classic search on all game names
          </AlertDialogDescription>
          <div class="flex items-center justify-center">
            <Input
              id="search"
              type="text"
              v-model="searchQuery"
              @keyup.enter="searchGamesFromApi"
              placeholder="ex: Mass Effect 2"
              class="w-full p-2 border border-gray-300 border-e-0 rounded rounded-e-none"
            />
            <Button
              v-if="searchQuery.length"
              @click="resetSearch"
              class="border-s-0 border-e-0 rounded-none"
            >
              <X />
            </Button>
            <Button
              @click="searchGamesFromApi"
              class="border-s-0 rounded-s-none"
            >
              Search
            </Button>
          </div>
          <div v-if="loading" class="mt-4">Chargement...</div>
          <div v-else-if="error" class="mt-4 text-red-500">{{ error }}</div>
          <ul v-else-if="games.length" class="mt-4 space-y-4">
            <li v-for="game in games" :key="game.id">
              <CardGame :game="game" :loading="loading" />
            </li>
          </ul>
          <!-- NO RESULT -->
          <div v-else-if="searched" class="text-center text-gray-500">
            Aucun résultat trouvé
            <button
              @click="resetSearch"
              class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
            >
              Réinitialiser la recherche
            </button>
          </div>
        </div>
      </AlertDialogHeader>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script lang="ts" setup>
import { X, Search } from 'lucide-vue-next'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"

const searchQuery = ref<string>('')
const games = ref<Array<Game>>([])
const searched = ref<boolean>(false)
const loading = ref<boolean>(false)
const error = ref<string|null>(null)

/**
 * Get games from the search input.
 * @return void
 */
async function searchGamesFromApi(): void {
  if (!searchQuery.value) return
  loading.value = true
  try {
    const { data } = await useFetch('/api/igdb-api', {
      method: 'POST',
      body: { endpoint: 'games', query: `fields name, first_release_date; search "${searchQuery.value}"; limit 5;` }
    })
    games.value = data.value ?? []
  } catch (error) {
    console.error('Erreur détaillée:', error.response?.data || error.message)
    throw createError({
      statusCode: error.response?.status || 500,
      statusMessage: error.response?.data?.message || 'Erreur lors de la recherche des jeux'
    })
  } finally {
    loading.value = false
  }
}

/**
 * Reset search input.
 * @return void
 */
function resetSearch(): void {
  searchQuery.value = ''
  games.value = []
  error.value = null
}
</script>
