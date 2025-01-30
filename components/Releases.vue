<template>
  <Carousel
    @init-api="setApi"
    class="w-full mx-auto"
  >
    <CarouselContent class="-ml-2">
      <CarouselItem
        v-for="(event, eventIndex) in events"
        :key="eventIndex"
        class="text-center basis-full sm:basis-1/2 md:basis-full lg:basis-1/2 xl:basis-1/4 pl-2"
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
    <div class="absolute bottom-0 left-0 w-[32px] bg-gradient-to-r from-[hsl(var(--background))] to-transparent h-full" />
    <div class="absolute bottom-0 right-0 w-[32px] bg-gradient-to-r from-transparent to-[hsl(var(--background))] h-full" />
    <CarouselPrevious class="left-0" />
    <CarouselNext class="right-0" />
  </Carousel>
  <div class="py-2 text-center text-sm text-muted-foreground">
    Slide {{ current }} of {{ totalCount }}
  </div>
</template>

<script lang="ts" setup>
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "~/components/ui/carousel"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card"
import { type CarouselApi } from "~/components/ui/carousel"
import CardGameTiny from "~/components/cards/CardGameLink.vue"
import CardGamePlaceholderTiny from "~/components/cards/placeholders/CardGamePlaceholderLink.vue"
import { getFormatDate } from '~/utils/dates'
import { useMediaQuery, watchOnce } from '@vueuse/core'

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
const carouselApi = ref<CarouselApi>()
const totalCount = ref(0)
const current = ref(0)

generateEvents()

// * WATCHERS

watch(props, () => {
  loading.value = props.loading
  games.value = props.models
  generateEvents()
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

// * METHODS

function setApi(val: CarouselApi) {
  carouselApi.value = val
  carouselApi.value?.scrollTo(useMediaQuery('(max-width: 768px)').value ? 5 : 4)
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
  height: 12rem;
  overflow-y: auto;
}
</style>
