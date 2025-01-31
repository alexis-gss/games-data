<template>
  <span :class="`font-semibold border ${getColorRating(rating, maxRating, BorderColor)} ${getColorRating(rating, maxRating, TextColor)} rounded-md h-[26px] pl-[5px] pr-[6px]`">
    {{ rating }}
  </span>
</template>

<script lang="ts" setup>
import { getColorRating, BorderColor, TextColor } from '~/utils/ratingColor'

// * PROPS
defineProps({
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  maxRating: {
    type: Number,
    required: true,
    default: 0
  },
})
</script>
