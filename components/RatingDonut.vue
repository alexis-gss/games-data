<template>
  <div class="w-[10rem] h-[10rem] relative">
    <canvas ref="chartCanvas" />
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <p class="text-center">{{ title }}</p>
      <span class="text-xl font-bold">
        {{ rating }}/{{ maxRating }}
      </span>
      <p
        v-if="ratingCount > 0"
        class="text-center text-sm"
      >
      ({{ ratingCount }} ratings)
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { Chart, DoughnutController, ArcElement } from 'chart.js'

Chart.register(DoughnutController, ArcElement)

// * PROPS
const props = defineProps({
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  ratingCount: {
    type: Number,
    required: false,
    default: 0
  },
  maxRating: {
    type: Number,
    required: true,
    default: 100
  },
  title: {
    type: String,
    required: false,
    default: ""
  }
})

// * DATA
const chartCanvas = ref(null)
let chart = null

const createOrUpdateChart = () => {
  const ctx = chartCanvas.value.getContext('2d')
  const data = {
    labels: ['Score', 'Restant'],
    datasets: [
      {
        data: [props.rating, props.maxRating - props.rating],
        backgroundColor: ['#3b82f6', '#e5e7eb'],
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
  if (chart) {
    chart.data = data
    chart.options = options
    chart.update()
  } else {
    chart = new Chart(ctx, {
      type: 'doughnut',
      data,
      options
    })
  }
}

watch([() => props.rating, () => props.maxRating], createOrUpdateChart)

onMounted(() => {
  createOrUpdateChart()
})

onUnmounted(() => {
  if (chart) {
    chart.destroy()
  }
})
</script>
