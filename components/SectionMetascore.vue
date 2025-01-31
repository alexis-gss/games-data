<template>
  <Card v-if="model.metacritic">
    <CardHeader class="flex flex-row justify-start items-center">
      <CardTitle>
        Metascore
      </CardTitle>
      <RatingMin :rating="model.metacritic" :maxRating="100" class="mx-2" />
    </CardHeader>
    <CardContent v-if="model.metacritic_platforms.length" class="flex flex-wrap justify-around items-center">
      <Carousel class="lg:hidden w-full mx-auto">
        <CarouselContent class="-ml-2">
          <CarouselItem
            v-for="(metacriticPlatform, metacriticPlatformIndex) in model.metacritic_platforms.sort((a, b) => a.platform.name.localeCompare(b.platform.name))"
            :key="metacriticPlatformIndex"
            class="sm:basis-1/2 md:basis-full lg:basis-1/2 xl:basis-1/4 pl-2"
          >
          <div>
            <a
              :href="metacriticPlatform.url"
              target="_blank"
              class="group rounded-md p-2"
            >
              <RatingDonut
                :rating="metacriticPlatform.metascore"
                :max-rating="100"
              />
              <p class="flex justify-center items-center underline underline-offset-4 mt-2">
                {{ metacriticPlatform.platform.name }}<SquareArrowOutUpRight class="text-muted-foreground w-[1rem] pt-[0.2rem] ml-1" />
              </p>
            </a>
          </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious class="left-0" />
        <CarouselNext class="right-0" />
      </Carousel>
      <a
        v-for="(metacriticPlatform, metacriticPlatformIndex) in model.metacritic_platforms.sort((a, b) => a.platform.name.localeCompare(b.platform.name))"
        :key="metacriticPlatformIndex"
        :href="metacriticPlatform.url"
        target="_blank"
        class="hidden lg:block group hover:bg-secondary focus:bg-secondary rounded-md p-2"
      >
        <RatingDonut
          :rating="metacriticPlatform.metascore"
          :max-rating="100"
        />
        <p class="flex justify-center items-center underline underline-offset-4 group-hover:text-primary group-focus:text-primary mt-2">
          {{ metacriticPlatform.platform.name }}<SquareArrowOutUpRight class="text-muted-foreground w-[1rem] pt-[0.2rem] ml-1" />
        </p>
      </a>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { SquareArrowOutUpRight } from 'lucide-vue-next'
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card"
import RatingDonut from '~/components/RatingDonut.vue'
import RatingMin from '~/components/RatingMin.vue'

// * PROPS
defineProps({
  model: {
    type: Object as PropType<Game>,
    default: () => { return []; }
  },
})
</script>
