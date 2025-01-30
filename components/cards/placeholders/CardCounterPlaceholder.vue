<template>
  <Card>
    <CardContent class="space-y-2 p-6">
      <div class="pb-4">
        <Skeleton class="h-6 w-1/2 mx-auto" />
        <Skeleton class="w-[100px] h-[20px] mx-auto mt-2" />
      </div>
      <div class="margin-custom flex justify-center align-center">
        <Skeleton class="w-[64px] h-[76px] mx-2" />
        <Skeleton class="w-[64px] h-[76px] mx-2" />
        <Skeleton class="w-[64px] h-[76px] mx-2" />
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { Card, CardContent } from "~/components/ui/card"
import { Skeleton } from "~/components/ui/skeleton"
</script>

<style lang="css">
.margin-custom {
  margin-top: 0 !important;
}
</style>
