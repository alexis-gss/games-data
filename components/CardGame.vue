<template>
  <Card>
    <CardHeader class="p-4">
      <CardTitle>{{ game.name }}</CardTitle>
      <CardDescription class="flex justify-start items-center">
        <CalendarIcon class="mr-2 h-4 w-4 opacity-70" />
        <span>{{ formatDate(game.first_release_date) }}</span>
      </CardDescription>
    </CardHeader>
  </Card>
</template>

<script lang="ts" setup>
import { CalendarIcon } from 'lucide-vue-next'

// * PROPS
const props = defineProps({
  game: {
    type: Object as PropType<Game>,
    default: () => { return []; }
  },
})

// * DATA
const game = ref<Game>(props.game)

// * METHODS
const formatDate = (timestamp: number) => {
  return timestamp ? new Date(timestamp * 1000).toLocaleDateString() : 'Date inconnue'
}
</script>
