<template>
  <AspectRatio
    :ratio="(isMobile) ? 4/3 : 25/9"
    class="relative rounded-md overflow-hidden mb-6"
  >
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-bold w-full z-10">
      <div class="flex justify-center items-center px-8">
        <h1 class="h-14 text-2xl md:text-5xl pe-2">
          {{ model.name }}
        </h1>
        <Popover v-if="model.alternative_names.length">
          <PopoverTrigger asChild>
            <Button variant="ghost" class="[&_svg]:size-5 p-2">
              <Info />
            </Button>
          </PopoverTrigger>
          <PopoverContent class="flex flex-col justify-center items-center w-fit">
            <p class="font-semibold leading-none tracking-tight mb-2">Alternative names</p>
            <p>{{ model.alternative_names.join(', ') }}</p>
          </PopoverContent>
        </Popover>
      </div>
      <Badge variant="secondary">{{ getFormatDate(model!.released) }}</Badge>
    </div>
    <div class="absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-[hsl(var(--card))] h-full"></div>
    <img
      :src="model.background_image ?? ''"
      :alt="model.name"
      class="w-full h-full object-cover"
    />
  </AspectRatio>
</template>

<script lang="ts" setup>
import { Info } from 'lucide-vue-next'
import { AspectRatio } from "~/components/ui/aspect-ratio"
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { getFormatDate } from '~/utils/dates'

// * PROPS
defineProps({
  model: {
    type: Object as PropType<Game>,
    default: () => { return []; }
  },
})

const { isMobile } = useDevice();
</script>
