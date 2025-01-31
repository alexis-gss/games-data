<template>
  <NuxtLink :to="{
    name: 'game-id',
    params: { id: model.id },
  }">
    <Card class="inline-flex flex-row-reverse justify-end w-full">
      <CardHeader class="flex flex-col justify-center items-start p-4 ps-0">
        <CardTitle>{{ model.name }}</CardTitle>
        <CardDescription class="flex justify-start items-center">
          <CalendarIcon class="mr-2 h-4 w-4 opacity-70" />
          <span>{{ getFormatDate(model.released) }}</span>
        </CardDescription>
      </CardHeader>
      <CardContent class="custom-content p-4">
        <img
          :src="model.background_image ?? 'https://placehold.co/90x90/jpg'"
          class="rounded-full h-full"
          :alt="`Cover of the game ${model.name}`"
        >
      </CardContent>
      <CardFooter>
        <RatingDonut
          v-if="model.metacritic !== null"
          title="Metacritic"
          :rating="model.metacritic"
          :max-rating="100"
        />
      </CardFooter>
    </Card>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { CalendarIcon } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card"
import RatingDonut from "~/components/RatingDonut.vue"
import { getFormatDate } from '~/utils/dates'
import slugify from 'slugify';

// * PROPS
defineProps({
  model: {
    type: Object as PropType<Game>,
    default: () => { return []; }
  },
})
</script>

<style lang="css" scoped>
.custom-content {
  height: 90px;
}
</style>
