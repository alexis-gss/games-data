<template>
  <NuxtLink :to="{
    name: 'game-id',
    params: { id: model.id },
  }">
    <Button
      class="whitespace-normal h-auto w-full"
      variant="outline"
    >
      {{ game.name }}
    </Button>
  </NuxtLink>
</template>

<script lang="ts" setup>
// * PROPS
const props = defineProps({
  model: {
    type: Object as PropType<Game>,
    default: () => { return []; }
  },
})

// * DATA
const game = ref<Game>(props.model)
</script>
