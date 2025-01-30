<template>
  <Card class="card-custom relative inline-flex flex-row-reverse justify-end rounded-md overflow-hidden w-full h-full">
    <AspectRatio
      :ratio="16/9"
    >
      <Skeleton class="w-full h-full" />
    </AspectRatio>
    <CardHeader class="absolute bottom-0 start-0 w-full p-6 z-10">
      <Skeleton class="w-1/2 h-[24px]" />
    </CardHeader>
  </Card>
</template>

<style lang="css" scoped>
.card-custom {
  height: 15rem;
}
</style>
