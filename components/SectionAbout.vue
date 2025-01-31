<template>
  <Card>
    <CardHeader>
      <CardTitle class="font-bold">About</CardTitle>
    </CardHeader>
    <CardContent>
      <Collapsible v-model:open="isOpen" class="mb-4">
        <div
          ref="collapsibleContent"
          class="relative overflow-hidden transition-all duration-500 ease-in-out"
          :style="{ maxHeight: isOpen ? `${contentHeight}px` : '6rem' }"
        >
          <div v-if="!isOpen" class="absolute bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-[hsl(var(--card))] h-full"></div>
          <div ref="content" v-html="model.description.split('Español')[0]" />
        </div>
        <CollapsibleTrigger class="rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground capitalize w-full h-9 px-4 py-2 mt-2">
          {{ isOpen ? 'Show less' : 'Read more' }}
        </CollapsibleTrigger>
      </Collapsible>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div v-if="model.platforms && model.platforms.length" class="flex flex-col">
          <p class="flex items-center text-muted-foreground"><Gamepad2 class="w-[1rem] mr-[5px]" />Plateforms</p>
          <div class="flex flex-wrap">
            <template
              v-for="(platform, platformIndex) in model.platforms"
              :key="platformIndex"
            >
              <NuxtLink
                to="/"
                class="font-medium hover:text-primary focus:text-primary underline underline-offset-4 w-fit"
              >
                {{ platform.platform.name }}
              </NuxtLink>
              <span v-if="platformIndex !== model.platforms.length - 1" class="w-fit">,&nbsp</span>
            </template>
          </div>
        </div>
        <div v-if="model.genres && model.genres.length" class="flex flex-col">
          <p class="flex items-center text-muted-foreground"><Ghost class="w-[1rem] mr-[5px]" />Genres</p>
          <div class="flex flex-wrap">
            <template
              v-for="(genre, genreIndex) in model.genres"
              :key="genreIndex"
            >
              <NuxtLink
                to="/"
                class="font-medium hover:text-primary focus:text-primary underline underline-offset-4 w-fit"
              >
                {{ genre.name }}
              </NuxtLink>
              <span>{{ (genreIndex !== model.genres.length - 1) ? ',' : '' }}&nbsp</span>
            </template>
          </div>
        </div>
        <div v-if="model.developers && model.developers.length" class="flex flex-col">
          <p class="flex items-center text-muted-foreground"><CodeXml class="w-[1rem] mr-[5px]" />Developpers</p>
          <div class="flex flex-wrap">
            <template
              v-for="(developer, developerIndex) in model.developers"
              :key="developerIndex"
            >
              <NuxtLink
                to="/"
                class="font-medium hover:text-primary focus:text-primary underline underline-offset-4 w-fit"
              >
                {{ developer.name }}
              </NuxtLink>
              <span>{{ (developerIndex !== model.developers.length - 1) ? ',' : '' }}&nbsp</span>
            </template>
          </div>
        </div>
        <div v-if="model.publishers && model.publishers.length" class="flex flex-col">
          <p class="flex items-center text-muted-foreground"><DollarSign class="w-[1rem] mr-[5px]" />Publishers</p>
          <div class="flex flex-wrap">
            <template
              v-for="(publisher, publisherIndex) in model.publishers"
              :key="publisherIndex"
            >
              <NuxtLink
                to="/"
                class="font-medium hover:text-primary focus:text-primary underline underline-offset-4 w-fit"
              >
                {{ publisher.name }}
              </NuxtLink>
              <span v-if="publisherIndex !== model.publishers.length - 1" class="w-fit">,&nbsp</span>
            </template>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 gap-4 mb-4">
        <div v-if="model.tags && model.tags.length" class="flex flex-col">
          <p class="flex items-center text-muted-foreground"><Hash class="w-[1rem] mr-[5px]" />Tags</p>
          <div class="flex flex-wrap">
            <template
              v-for="(tag, tagIndex) in model.tags"
              :key="tagIndex"
            >
              <NuxtLink
                to="/"
                class="font-medium hover:text-primary focus:text-primary underline underline-offset-4 w-fit"
              >
                {{ tag.name }}
              </NuxtLink>
              <span v-if="tagIndex !== model.tags.length - 1" class="w-fit">,&nbsp</span>
            </template>
          </div>
        </div>
        <div v-if="model.stores && model.stores.length" class="flex flex-col">
          <p class="flex items-center text-muted-foreground"><Download class="w-[1rem] mr-[5px]" />Stores</p>
          <div class="flex flex-wrap">
            <template
              v-for="(store, storeIndex) in model.stores"
              :key="storeIndex"
            >
              <NuxtLink
                to="/"
                class="font-medium hover:text-primary focus:text-primary underline underline-offset-4 w-fit"
              >
                {{ store.store.name }}
              </NuxtLink>
              <span v-if="storeIndex !== model.stores.length - 1" class="w-fit">,&nbsp</span>
            </template>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div v-if="model.esrb_rating" class="flex flex-col">
          <p class="flex items-center text-muted-foreground"><ArrowUp10 class="w-[1rem] mr-[5px]" />Age rating</p>
          <p>{{ model.esrb_rating.name }}</p>
        </div>
        <div v-if="model.playtime > 0" class="flex flex-col">
          <p class="flex items-center text-muted-foreground"><Timer class="w-[1rem] mr-[5px]" />Average playtime</p>
          <p>{{ model.playtime }}h</p>
        </div>
      </div>
      <div v-if="model.website" class="grid grid-cols-1 gap-4">
        <div class="flex flex-col">
          <p class="flex items-center text-muted-foreground"><Globe class="w-[1rem] mr-[5px]" />Website</p>
          <a
            :href="model.website"
            class="flex justify-start items-center font-medium hover:text-primary focus:text-primary underline underline-offset-4 w-fit"
            target="_blank"
          >
            {{ model.website }}<SquareArrowOutUpRight class="text-muted-foreground w-[1rem] pt-[0.2rem] ml-1" />
          </a>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { SquareArrowOutUpRight, Gamepad2, Ghost, CodeXml, DollarSign, Hash, Download, ArrowUp10, Timer, Globe } from 'lucide-vue-next'
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card"
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';

// * PROPS
defineProps({
  model: {
    type: Object as PropType<Game>,
    default: () => { return []; }
  },
})

const isOpen = ref(false);
const collapsibleContent = ref<HTMLDivElement | null>(null);
const content = ref<HTMLDivElement | null>(null);
const contentHeight = ref(0);

const updateContentHeight = async () => {
  await nextTick();
  if (content.value) {
    contentHeight.value = content.value.scrollHeight;
  }
};

onMounted(() => {
  updateContentHeight();
});
</script>
