<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2 mb-4">
    <CardCounterPlaceholder
      v-if="loading"
      v-for="skeleton in 4"
      :key="skeleton"
    />
    <CardCounter
      v-else
      v-for="(game, gameIndex) in games"
      :key="gameIndex"
      :model="game"
      :time="times[gameIndex]"
    />
  </div>
</template>

<script lang="ts" setup>
import { differenceInYears, differenceInMonths, differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, addYears, addMonths, addHours, addMinutes } from 'date-fns'
import CardCounter from "~/components/cards/CardCounter.vue"
import CardCounterPlaceholder from '~/components/cards/placeholders/CardCounterPlaceholder.vue';

// * PROPS
const props = defineProps({
  models: {
    type: Object as PropType<Array<Game>>,
    default: () => { return []; }
  },
  loading: {
    type: Boolean,
    default: true
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
