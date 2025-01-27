<template>
  <Carousel
    @init-api="setApi"
    class="w-full mx-auto mb-4"
  >
    <CarouselContent class="-ml-1 px-8">
      <CarouselItem
        v-for="(event, eventIndex) in events"
        :key="eventIndex"
        class="text-center pl-1 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
      >
        <Card :class="{'bg-secondary': isToday(event.date)}">
          <CardHeader class="p-2">
            <CardTitle>{{ getFormatDate(String(event.date)) }}</CardTitle>
            <CardDescription>
              {{ (event.games.length) ? `${event.games.length} games released this day :` : 'No game release this day' }}
            </CardDescription>
          </CardHeader>
          <CardContent class="card-content p-2 pt-0">
            <CardGamePlaceholderTiny
              v-if="loading"
              v-for="index in 2"
              :key="index"
            />
            <CardGameTiny
              v-else
              v-for="(game, gameIndex) in event.games"
              :key="gameIndex"
              :model="game"
            />
          </CardContent>
        </Card>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious class="left-0" />
    <CarouselNext class="right-0" />
  </Carousel>
</template>

<script lang="ts" setup>
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { type CarouselApi } from "@/components/ui/carousel"
import CardGameTiny from "@/components/cards/games/CardGameTiny.vue"
import CardGamePlaceholderTiny from "@/components/cards/games/CardGamePlaceholderTiny.vue"
import { getFormatDate } from '@/utils/dates'
import { useMediaQuery } from '@vueuse/core'

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
const today = ref<Date>(new Date())
const events = ref<Array<{date: Date, games: Array<Game>}>>([])

generateEvents()

// * WATCHERS

watch(props, () => {
  loading.value = props.loading
  games.value = props.models
  generateEvents()
})

// * METHODS

function setApi(carouselApi: CarouselApi) {
  carouselApi?.scrollTo(useMediaQuery('(max-width: 768px)').value ? 5 : 4)
}

function isToday(date: Date): boolean {
  return date.toDateString() === today.value.toDateString()
}

function generateEvents(): void {
  const result = [] as {
    date: Date;
    games: Game[];
  }[]
  for (let i = -5; i <= 5; i++) {
    const date = new Date(today.value)
    date.setDate(today.value.getDate() + i)
    result.push({
      date: date,
      games: getGames(date)
    })
  }
  events.value = result
}

function getGames(date: Date): Array<Game> {
  return games.value.filter(game => getFormatDate(game.released) === getFormatDate(String(date)))
}
</script>

<style lang="css">
.card-content {
  height: 10rem;
  overflow-y: auto;
}
</style>
