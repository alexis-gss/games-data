<template>
  <div>
    <h2 class="flex items-center justify-start mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-4">
      <component :is="gameCategory.icon" class="mr-[5px]" />
      {{ gameCategory.title }}
    </h2>
    <ul class="grid grid-cols-1 gap-4">
      <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
      <template v-else>
        <template v-if="loading">
          <li v-for="skeleton in 5" :key="skeleton">
            <Card>
              <CardContent class="space-y-2 p-4">
                <Skeleton class="h-6 w-full" />
                <Skeleton class="h-4 w-1/2 pb-[18px]" />
              </CardContent>
            </Card>
          </li>
        </template>
        <template v-else>
          <li v-for="(game, gameIndex) in gameCategory.games" :key="gameIndex">
            <CardGame :game="game" :loading="loading" />
          </li>
        </template>
      </template>
    </ul>
  </div>
</template>

<script lang="ts" setup>
// * PROPS
const props = defineProps({
  gameCategory: {
    type: Object as PropType<String|null>,
    default: null
  },
  error: {
    type: Object as PropType<String|null>,
    default: null,
  },
  loading: {
    type: Boolean,
    default: true,
  },
})

// * DATA
const gameCategory = ref<Game>(props.gameCategory)
const error = ref<boolean>(props.error)
const loading = ref<boolean>(props.loading)

// * WATCHERS

/**
  * Watch props value changes.
  * @return void
  */
watch(props, (newProps: typeof props): void => {
  gameCategory.value = newProps.gameCategory
  error.value = newProps.error
  loading.value = newProps.loading
});
</script>
