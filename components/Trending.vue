<template>
  <Carousel class="w-full mx-auto mb-4">
    <CarouselContent class="-ml-1 px-8">
      <CarouselItem
        v-for="(game, gameIndex) in games"
        :key="gameIndex"
        class="pl-1 md:basis-1/4 lg:basis-1/6"
      >
        <Card class="flex items-center justify-center h-full">
          <CardContent class="flex items-center justify-center p-6">
            <span class="text-2xl text-center font-semibold">{{ game.name }}</span>
          </CardContent>
        </Card>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious class="left-0" />
    <CarouselNext class="right-0" />
  </Carousel>
</template>

<script lang="ts" setup>
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

// * PROPS
const props = defineProps({
  models: {
    type: Object as PropType<Array<Game>>,
    default: () => { return []; }
  },
  loading: {
    type: Boolean,
    default: false
  },
})

// * DATA
const games = ref<Array<Game>>(props.models)
const loading = ref<boolean>(props.loading)

// * WATCHERS

watch(props, () => {
  loading.value = props.loading
  games.value = props.models
})
</script>
