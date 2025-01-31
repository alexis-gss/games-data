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
    <p>No game associated to this id : {{ id }}</p>
    <NuxtLink to="/" class="text-background-foreground hover:text-primary"focus:text-primary >
      Back to the homepage
    </NuxtLink>
  </div>
  <!-- Game Details -->
  <template v-else>
    <!-- Game Banner -->
    <SectionBanner :model="game" />
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
      <!-- About -->
      <div class="flex flex-col gap-4">
        <SectionAbout :model="game" />
      </div>
      <div class="flex flex-col gap-4">
        <!-- Metacritic -->
        <SectionMetascore :model="game" />
        <!-- Rawg -->
        <SectionRawg :model="game" />
      </div>
    </div>
    <!-- Screenshots -->
    <!-- <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
        :href="`${config.public.ggUrl}/${slugify(game.name)}`"
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
    </div> -->
  </template>
</template>

<script lang="ts" setup>
import { TriangleAlert } from 'lucide-vue-next'
import AppHeader from "~/components/layout/AppHeader.vue"
import SectionBanner from "~/components/SectionBanner.vue"
import SectionMetascore from "~/components/SectionMetascore.vue"
import SectionRawg from "~/components/SectionRawg.vue"
import slugify from 'slugify'

definePageMeta({
  layout: 'default'
})

// * DATA
const { id } = useRoute().params
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
    const { data } = await useFetch('/api/rawg-api', {
      method: 'POST',
      body: {
        endpoint: 'games',
        query: id,
      }
    })
    game.value = data.value
    console.log(data)
  } catch (error) {
    errorMessage.value = errors.methods.handleAjaxError(error)
  } finally {
    loading.value = false
    pingGamesGallery()
  }
}

/**
 * Check if there is a page dedicted to this game in Games Gallery.
 * @return Promise<void>
 */
async function pingGamesGallery(): Promise<void> {
  try {
    const { data } = await useFetch('/api/gamesgallery-ping', {
      method: 'POST',
      body: {
        endpoint: 'game',
        slug: slugify(game.value!.name)
      }
    })
    gamesgalleryPageCheck.value = data.value!.online
  } catch (error) {
    errorMessage.value = errors.methods.handleAjaxError(error)
  }
}
</script>
