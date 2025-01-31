<template>
  <div class="w-[7rem] h-[7rem] relative mx-auto">
    <canvas ref="chartCanvas" />
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <p class="text-xl font-bold">
        {{ rating }}<span class="text-muted-foreground">/{{ maxRating }}</span>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Chart, DoughnutController, ArcElement } from 'chart.js'
import { getColorRating, HexColor } from '~/utils/ratingColor'

// * PROPS
const props = defineProps({
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  maxRating: {
    type: Number,
    required: true,
    default: 100
  }
})

// * DATA
const chartCanvas = ref<HTMLCanvasElement|null>(null)
let chart = ref<Chart|null>(null)
Chart.register(DoughnutController, ArcElement)

const createOrUpdateChart = () => {
  const ctx = chartCanvas.value?.getContext('2d')
  if (ctx) {
    const data = {
      labels: ['Score', 'Restant'],
      datasets: [
        {
          data: [props.rating, props.maxRating - props.rating],
          backgroundColor: [getColorRating(props.rating, props.maxRating, HexColor), '#e5e7eb'],
          borderWidth: 0
        }
      ]
    }
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '75%',
      plugins: {
        tooltip: { enabled: false },
        legend: { display: false }
      }
    }
    if (chart.value) {
      chart.value.data = data
      chart.value.options = options
      chart.value.update()
    } else {
      chart.value = new Chart(ctx, {
        type: 'doughnut',
        data,
        options
      })
    }
  } else {
    console.error('Élément canvas introuvable.');
  }
}

watch([() => props.rating, () => props.maxRating], createOrUpdateChart)

onMounted(() => {
  createOrUpdateChart()
})

onUnmounted(() => {
  if (chart.value) {
    chart.value.destroy()
  }
})
</script>
