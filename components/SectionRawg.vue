<template>
  <Card v-if="model.rating">
    <CardHeader class="flex flex-row justify-start items-center">
      <CardTitle>RAWG</CardTitle>
      <RatingMin :rating="model.rating" :maxRating="5" class="mx-2" />
    </CardHeader>
    <CardContent v-if="model.ratings" class="flex flex-col justify-center items-center gap-4 w-full">
      <div class="relative flex rounded-md overflow-hidden w-full h-[36px]">
        <div
          v-for="(value, index) in model.ratings"
          :key="index"
          :class="{
            'relative h-full cursor-pointer': true,
            'opacity-100': hoveredIndex === index,
            'opacity-50': hoveredIndex !== null && hoveredIndex !== index,
          }"
          :style="{ width: `${value.percent}%`, backgroundColor: colors[index] }"
          @mouseover="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
        />
      </div>
      <div class="flex flex-wrap justify-center items-center gap-2">
        <Button
          v-for="(value, index) in model.ratings"
          :key="index"
          variant="outline"
          :class="{
            'capitalize': true,
            'bg-secondary': hoveredIndex === index,
          }"
          @mouseover="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
        >
          <span
            class="w-4 h-4 rounded-full"
            :style="{ backgroundColor: colors[index] }"
          />
          {{ value.title }}
          <span class="text-muted-foreground">({{ model.ratings[index].count }})</span>
        </Button>
      </div>
      <a
        :href="`https://rawg.io/games/${model.id}`"
        target="_blank"
        class="flex justify-center items-center underline underline-offset-4 hover:text-primary focus:text-primary"
      >
        {{ model.ratings_count }} ratings on RAWG <SquareArrowOutUpRight class="text-muted-foreground w-[1rem] pt-[0.2rem] ml-1" />
      </a>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { SquareArrowOutUpRight } from 'lucide-vue-next'
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card"
import RatingMin from '~/components/RatingMin.vue'
import { HexColor } from "~/utils/ratingColor"

// * PROPS
defineProps({
  model: {
    type: Object as PropType<Game>,
    default: () => { return []; }
  },
})

// * DATA
const colors = [HexColor.green, HexColor.blue, HexColor.orange, HexColor.red];
const hoveredIndex = ref<number | null>(null);
</script>
