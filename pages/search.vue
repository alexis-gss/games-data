<template>
  <div class="min-h-screen bg-gray-100 py-10">
    <div class="container mx-auto px-4 py-8">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <NuxtLink to="/" class="text-gray-700 hover:text-blue-600">Home</NuxtLink>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Search</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 class="text-3xl font-bold mb-6">Search</h1>
      <div class="mb-4">
        <input
          v-model="searchQuery"
          @keyup.enter="searchGames"
          placeholder="Entrez le nom d'un jeu"
          class="w-full p-2 border border-gray-300 rounded"
        >
      </div>
      <button
        v-if="searchQuery.length"
        @click="resetSearch"
        class="bg-blue-500 text-white px-6 py-2 hover:bg-blue-600 transition duration-300"
      >
        Reset
      </button>
      <button
        @click="searchGames"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Rechercher
      </button>

      <div v-if="loading" class="mt-4">Chargement...</div>
      <div v-else-if="error" class="mt-4 text-red-500">{{ error }}</div>
      <ul v-else-if="games.length" class="mt-4 space-y-4">
        <li v-for="game in games" :key="game.id" class="border p-4 rounded">
          <h2 class="text-xl font-semibold">{{ game.name }}</h2>
          <p class="text-gray-600">{{ game.summary }}</p>
          <p class="text-sm text-gray-500">
            Date de sortie: {{ formatDate(game.first_release_date) }}
          </p>
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
  </div>
</template>

<script setup>
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

definePageMeta({
  layout: 'default'
})

const searchQuery = ref('')
const games = ref([])
const loading = ref(false)
const error = ref(null)

const formatDate = (timestamp) => {
  return timestamp ? new Date(timestamp * 1000).toLocaleDateString() : 'Date inconnue'
}

async function searchGames() {
  if (!searchQuery.value) return
  loading.value = true
  try {
    const { data } = await useFetch('/api/igdb-api', {
      method: 'POST',
      body: { endpoint: 'games', query: `fields name, first_release_date; search "${searchQuery.value}"; limit 10;` }
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

function resetSearch() {
  searchQuery.value = ''
  games.value = []
  error.value = null
}
</script>
