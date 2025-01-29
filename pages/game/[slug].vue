<template>
  <AppHeader breadcrumb="Games" />
  <!-- Loader -->
  <div
    v-if="loading"
    class="flex justify-center items-center h-64"
  >
    ça charge
  </div>
  <!-- Error -->
  <div
    v-else-if="errorMessage"
    class="text-red-500"
  >
    {{ errorMessage }}
  </div>
  <!-- No game -->
  <div v-else-if="game === null">
    <TriangleAlert class="mb-1" />
    <p>No game associated to this name : {{ slug }}</p>
    <NuxtLink to="/" class="text-background-foreground hover:text-primary">
      Back to the homepage
    </NuxtLink>
  </div>
  <!-- Game Details -->
  <template v-else>
    <!-- Game Banner -->
    <h1 class="sm:hidden text-center text-4xl text-white font-bold mb-6 z-10">
      {{ game?.name }}
    </h1>
    <div class="hidden sm:block">
      <AspectRatio
        :ratio="25/9"
        class="relative rounded-md overflow-hidden mb-6"
      >
        <h1 class="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-4xl text-white font-bold mb-6 z-10">
          {{ game?.name }}
        </h1>
        <div class="absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-black h-64"></div>
        <img
          :src="game.background_image ?? ''"
          :alt="game.name"
          class="w-full h-full object-cover"
        />
      </AspectRatio>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
      <!-- Details -->
      <Card>
        <CardHeader>
          <CardTitle>Détails du jeu</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Release date :</strong> {{ new Date(game!.released).toLocaleDateString() }}</p>
          <p><strong>Genres :</strong> {{ game.genres.map(g => g.name).join(', ') }}</p>
          <p><strong>Stores :</strong> {{ game.stores.map(g => g.store.name).join(', ') }}</p>
          <p><strong>Plateforms :</strong> {{ game.platforms.map(g => g.platform.name).join(', ') }}</p>
          <p><strong>Tags :</strong> {{ game.tags.filter(g => g.language === "eng").map(g => g.name).join(', ') }}</p>
          <p><strong>ESRB Rating :</strong> {{ game.esrb_rating?.name }}</p>
          <p><strong>Average playtime :</strong> {{ game.playtime }}h</p>
        </CardContent>
      </Card>
      <!-- Ratings -->
      <Card>
        <CardHeader>
          <CardTitle>Ratings</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col lg:flex-row justify-center lg:justify-around items-center">
          <RatingDonut
            v-if="game.rating > 0"
            title="Rawg"
            :rating="game.rating"
            :rating-count="game.ratings_count"
            :max-rating="game.rating_top"
            class="mb-6 lg:mb-0"
          />
          <RatingDonut
            v-if="game.metacritic !== null"
            title="Metacritic"
            :rating="game.metacritic"
            :max-rating="100"
          />
        </CardContent>
      </Card>
      <!-- Rawg stats -->
      <Card>
        <CardHeader>
          <CardTitle>Rawg stats</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Added :</strong> {{ game.added }}</p>
          <p><strong>beaten :</strong> {{ game.added_by_status?.beaten }}</p>
          <p><strong>dropped :</strong> {{ game.added_by_status?.dropped }}</p>
          <p><strong>owned :</strong> {{ game.added_by_status?.owned }}</p>
          <p><strong>playing :</strong> {{ game.added_by_status?.playing }}</p>
          <p><strong>toplay :</strong> {{ game.added_by_status?.toplay }}</p>
          <p><strong>yet :</strong> {{ game.added_by_status?.yet }}</p>
        </CardContent>
      </Card>
    </div>
    <!-- Screenshots -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <AspectRatio
        :ratio="16/9"
        v-for="(screenshot, screenshotIndex) in game.short_screenshots"
        :key="screenshot.id"
      >
        <img
          :src="screenshot.image"
          :alt="`Screenshot n°${screenshotIndex + 1} of ${game.name}`"
          class="w-full h-full object-cover rounded-md"
        />
      </AspectRatio>
      <a
        v-if="gamesgalleryPageCheck"
        :href="`${config.public.ggUrl}/${slug}`"
        target="_blank"
        class="text-xl font-bold rounded-md overflow-hidden"
      >
        <AspectRatio
          :ratio="16/9"
          class="flex justify-center items-center bg-secondary"
        >
          <span class="mr-[5px]">See on Games Gallery</span>
          <SquareArrowOutUpRight />
        </AspectRatio>
      </a>
    </div>
  </template>
</template>

<script lang="ts" setup>
import { TriangleAlert, SquareArrowOutUpRight } from 'lucide-vue-next'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import AppHeader from "@/components/layout/AppHeader.vue"
import RatingDonut from '@/components/RatingDonut.vue'

definePageMeta({
  layout: 'default'
})

// * DATA
const config = useRuntimeConfig()
const { slug } = useRoute().params
const game = ref<Game|null>(null)
const gamesgalleryPageCheck = ref<boolean>(false)
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
    const [dataGame, dataPingCheck] = await Promise.all([
      $fetch('/api/rawg-api', {
        method: 'POST',
        body: {
          endpoint: 'games',
          query: {
            search: unslugify(slug as string),
          }
        }
      }),
      $fetch('/api/gamesgallery-ping', {
        method: 'POST',
        body: {
          endpoint: 'game',
          slug: slug
        }
      }),
    ])
    game.value = dataGame.results[0]
    gamesgalleryPageCheck.value = dataPingCheck.online
  } catch (error) {
    errorMessage.value = errors.methods.handleAjaxError(error)
  } finally {
    loading.value = false
    console.log(game.value)
  }
}

/**
 * Unslugify the game slug.
 * @param slug string
 */
function unslugify(slug: string): string {
  return slug
    .split('-')
    .join(' ');
}
</script>
