<template>
  <NuxtLink :to="{
    name: 'game-slug',
    params: { slug: game.slug },
  }">
    <Card class="inline-flex flex-row-reverse justify-end w-full">
      <CardHeader class="flex flex-col justify-center items-start p-4 ps-0">
        <CardTitle>{{ game.name }}</CardTitle>
        <CardDescription class="flex justify-start items-center">
          <CalendarIcon class="mr-2 h-4 w-4 opacity-70" />
          <span>{{ getFormatDate(game.released) }}</span>
        </CardDescription>
      </CardHeader>
      <CardContent class="custom-content p-4">
        <img
          :src="game.background_image !== null ? game.background_image : 'https://placehold.co/90x90/jpg'"
          class="rounded-full h-full"
          :alt="`Cover of the game ${game.name}`"
        >
      </CardContent>
    </Card>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { CalendarIcon } from 'lucide-vue-next'

// * PROPS
const props = defineProps({
  model: {
    type: Object as PropType<Game>,
    default: () => { return []; }
  },
})

// * DATA
const game = ref<Game>(props.model)

// * METHODS

/**
 * Format a date.
 * @param timestamp
 * @return string
 */
function getFormatDate(timestamp: string): string {
  return timestamp ? new Date(timestamp).toLocaleDateString('en-EN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }) : 'Date inconnue'
}
</script>

<style lang="css" scoped>
.custom-content {
  height: 90px;
}
</style>
