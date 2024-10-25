<template>
  <Card>
    <CardContent v-if="loading" class="space-y-2 p-4">
      <Skeleton class="h-6 w-full" />
      <Skeleton class="h-4 w-1/2 pb-[18px]" />
    </CardContent>
    <CardHeader v-else class="p-4">
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
    default: null,
  },
  loading: {
    type: Boolean,
    default: true,
  },
})
const game = ref<Game>(props.game)
const loading = ref<boolean>(props.loading)

// * WATCHERS

/**
  * Watch props value changes.
  * @return void
  */
watch(props, (newProps: typeof props): void => {
  loading.value = newProps.loading
});

const formatDate = (timestamp: number) => {
  return timestamp ? new Date(timestamp * 1000).toLocaleDateString() : 'Date inconnue'
}
</script>
