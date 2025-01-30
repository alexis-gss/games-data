<template>
  <NuxtLink :to="{
    name: 'game-slug',
    params: { slug: slugify(model.name, {lower: true, strict: true}) },
  }">
    <Card class="card-custom relative inline-flex flex-row-reverse justify-end rounded-md overflow-hidden w-full h-full">
      <AspectRatio
        :ratio="16/9"
      >
        <img
          :src="model.background_image !== null ? model.background_image : 'https://placehold.co/90x90/jpg'"
          class="w-full h-full object-cover"
          :alt="`Cover of the game ${model.name}`"
        >
      </AspectRatio>
      <div class="absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-black h-64"></div>
      <CardHeader class="absolute bottom-0 start-0 flex flex-col justify-center items-start p-6 z-10">
        <CardTitle class="text-white">{{ model.name }}</CardTitle>
      </CardHeader>
    </Card>
  </NuxtLink>
</template>

<script lang="ts" setup>
import slugify from 'slugify';

// * PROPS
defineProps({
  model: {
    type: Object as PropType<Game>,
    default: () => { return []; }
  },
})
</script>

<style lang="css" scoped>
.card-custom {
  height: 15rem;
}
</style>
