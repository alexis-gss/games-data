<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 py-1.5">
    <NuxtLink
      v-for="(game, gameIndex) in games"
      :key="gameIndex"
      :to="{
        name: 'game-slug',
        params: { slug: game.slug },
      }"
    >
      <Card class="flex flex-col justify-center items-center h-full">
        <CardHeader class="text-center p-6 pb-4">
          <CardTitle>{{ game.name }}</CardTitle>
          <CardDescription class="flex justify-center items-center">
            <CalendarIcon class="mr-2 h-4 w-4 opacity-70" />
            <span>{{ getFormatDate(game.released) }}</span>
          </CardDescription>
        </CardHeader>
        <CardContent class="flex flex-col items-center justify-center p-6 pt-0">
          <div class="flex space-x-4">
            <div
              v-for="(time, timeIndex) in times[gameIndex]"
              :key="timeIndex"
              class="flex flex-col items-center"
            >
              <div class="text-4xl font-bold text-primary">{{ time.value }}</div>
              <div class="text-sm text-gray-500 dark:text-gray-400">{{ time.label }}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { CalendarIcon } from 'lucide-vue-next'
import { Card, CardContent } from "@/components/ui/card"
import { differenceInYears, differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, addYears, addMonths, addHours, addMinutes } from 'date-fns'

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
const times = ref<Array<[
  {label: string, value: number},
  {label: string, value: number},
  {label: string, value: number},
]>>([])

// * WATCHERS

watch(props, () => {
  loading.value = props.loading
  games.value = props.models
  updateCounter()
})

setInterval(updateCounter, 1000)

// * DATA
function updateCounter() {
  games.value.forEach((game, gameIndex) => {
    const targetDate = new Date(game.released)
    const today = new Date()
    let big: {label: string, value: number} = {label: '', value: 0}
    let middle: {label: string, value: number} = {label: '', value: 0}
    let small: {label: string, value: number} = {label: '', value: 0}
    if (differenceInHours(targetDate, today) < 24) {
      big = {label: 'Hours', value: differenceInHours(targetDate, today)}
      middle = {label: 'Minutes', value: differenceInMinutes(targetDate, addHours(today, big.value))}
      small = {label: 'Seconds', value: differenceInSeconds(targetDate, addMinutes(addHours(today, big.value), middle.value))}
    } else {
      big = {label: 'Years', value: differenceInYears(targetDate, today)}
      middle = {label: 'Months', value: differenceInMonths(targetDate, addYears(today, big.value))}
      small = {label: 'Days', value: differenceInDays(targetDate, addMonths(addYears(today, big.value), middle.value))}
    }
    times.value[gameIndex] = [big, middle, small]
  })
}
</script>
