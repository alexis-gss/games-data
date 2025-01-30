<template>
  <Carousel
    @init-api="setApi"
    class="w-full mx-auto"
  >
    <CarouselContent class="-ml-2">
      <CarouselItem
        v-if="loading"
        v-for="skeleton in 10"
        :key="skeleton"
        class="sm:basis-1/2 md:basis-full lg:basis-1/2 xl:basis-1/4 pl-2"
      >
        <CardPlaceholderSlider />
      </CarouselItem>
      <CarouselItem
        v-else
        v-for="(game, gameIndex) in games"
        :key="gameIndex"
        class="sm:basis-1/2 md:basis-full lg:basis-1/2 xl:basis-1/4 pl-2"
      >
        <CardSlider :model="game" />
      </CarouselItem>
    </CarouselContent>
    <div class="absolute bottom-0 left-0 w-[32px] bg-gradient-to-r from-[hsl(var(--background))] to-transparent h-full" />
    <div class="absolute bottom-0 right-0 w-[32px] bg-gradient-to-r from-transparent to-[hsl(var(--background))] h-full" />
    <CarouselPrevious class="left-0" />
    <CarouselNext class="right-0" />
  </Carousel>
  <div class="text-center text-sm text-muted-foreground py-2 mb-4">
    Slide {{ current }} of {{ totalCount }}
  </div>
</template>

<script lang="ts" setup>
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel"
import { type CarouselApi } from "~/components/ui/carousel"
import CardSlider from "~/components/cards/CardSlider.vue"
import CardPlaceholderSlider from "~/components/cards/placeholders/CardPlaceholderSlider.vue"
import { watchOnce } from '@vueuse/core'

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
const carouselApi = ref<CarouselApi>()
const totalCount = ref(0)
const current = ref(0)

// * WATCHERS

watch(props, () => {
  loading.value = props.loading
  games.value = props.models
})

watchOnce(carouselApi, (api) => {
  if (!api)
    return
  totalCount.value = api.scrollSnapList().length
  current.value = api.selectedScrollSnap() + 1

  api.on('select', () => {
    current.value = api.selectedScrollSnap() + 1
  })
})

// * DATA

function setApi(val: CarouselApi) {
  carouselApi.value = val
}
</script>
