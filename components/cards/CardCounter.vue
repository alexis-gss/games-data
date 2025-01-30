<template>
  <NuxtLink
    :to="{
      name: 'game-slug',
      params: { slug: slugify(model.name, {lower: true, strict: true}) },
    }"
    class="h-full"
  >
    <Card class="relative flex flex-col justify-center items-center rounded-md overflow-hidden h-full">
      <img
        :src="model.background_image !== null ? model.background_image : 'https://placehold.co/90x90/jpg'"
        class="absolute bottom-0 left-0 w-full h-full object-cover"
        :alt="`Cover of the game ${model.name}`"
      >
      <div class="absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-black h-full"></div>
      <CardHeader class="text-center p-6 pb-4 z-20">
        <CardTitle class="text-white">{{ model.name }}</CardTitle>
        <CardDescription class="flex justify-center items-center">
          <CalendarIcon class="mr-2 h-4 w-4 opacity-70" />
          <span>{{ getFormatDate(model.released) }}</span>
        </CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col items-center justify-center p-6 pt-0 z-20">
        <div class="flex space-x-4">
          <div
            v-for="(time, timeIndex) in time"
            :key="timeIndex"
            class="time-custom flex flex-col items-center bg-secondary rounded-md p-2"
          >
            <div class="text-4xl font-bold text-primary">{{ time.value }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">{{ time.label }}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { CalendarIcon } from 'lucide-vue-next'
import { getFormatDate } from '~/utils/dates'
import slugify from 'slugify';

// * PROPS
defineProps({
  model: {
    type: Object as PropType<Game>,
    default: () => { return []; }
  },
  time: {
    type: Object as PropType<Array<{
      label: string,
      value: number,
    }>>,
    default: () => { return []; }
  },
})
</script>

<style lang="css">
.time-custom {
  width: 4rem;
}
</style>
