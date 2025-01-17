<template>
  <AppHeader breadcrumb="Advanced search" />
  <ResultsTemplate
    title="Advanced games search"
    :icon="Search"
    :query="JSON.stringify(query)"
    @successfullCall="setLoaderValue"
  >
    <!-- FILTERS -->
    <Collapsible v-model:open="collapseOpen" class="sticky top-[66px] bg-white pb-4 z-10">
      <div class="relative w-full items-center mb-4">
        <Input id="search" type="text" placeholder="Search..." class="pl-10" />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
          <Search class="size-6 text-muted-foreground" />
        </span>
      </div>
      <div class="flex justify-between items-center w-full">
        <CollapsibleTrigger :disabled="loading" asChild>
          <Button variant="outline" :disabled="loading">
            Need some filters ?
            <ChevronUp :class="['duration-300 ease-in-out', {'transform rotate-180': collapseOpen}]" />
          </Button>
        </CollapsibleTrigger>
        <Skeleton v-if="loading" class="h-6 w-[95px]" />
        <p v-else class="text-sm italic text-muted-foreground ms-3">
          {{ totalResults.toLocaleString('en-US') }} results
        </p>
      </div>
      <CollapsibleContent>
        <Card>
          <CardContent class="p-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
              <FilterYear @updateQueryYear="updateQuery" />
              <FilterButton
                v-for="(filter, filterIndex) in filters"
                :key="filterIndex"
                :title="filter.title"
                :queryKey="filter.queryKey"
                :indexBySlug="filter.indexBySlug"
                :models="filter.models"
                @updateQueryFilter="updateQuery"
              />
            </div>
          </CardContent>
          <CardFooter class="text-center">
            <Button
              @click="resetQuery"
              :disabled="loading"
            >
              Reset filter
            </Button>
          </CardFooter>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  </ResultsTemplate>
</template>

<script lang="ts" setup>
import { Search, ChevronUp } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import AppHeader from "@/components/layout/AppHeader.vue"
import ResultsTemplate from "@/components/ResultsTemplate.vue"
import FilterYear from "@/components/filters/FilterYear.vue"
import FilterButton from "@/components/filters/FilterButton.vue"

definePageMeta({
  layout: 'default'
})

// * INTERFACES
interface filterItem {
  title: string;
  queryKey: string;
  indexBySlug?: boolean;
  models?: Array<{name: string, ordering: string}>;
}

// * DATA
const filters: filterItem[] = []
const collapseOpen = ref<boolean>(false)
const query = ref<Object>({})
const totalResults = ref<number>(0)
const loading = ref<boolean>(true)

// * LIFECYCLE
filters.push({title: 'Select genre...', queryKey: 'genres'})
filters.push({title: 'Select tag...', queryKey: 'tags'})
filters.push({title: 'Select platform...', queryKey: 'platforms', indexBySlug: false})
filters.push({title: 'Select store...', queryKey: 'stores', indexBySlug: false})
filters.push({title: 'Select developer...', queryKey: 'developers'})
filters.push({title: 'Select publisher...', queryKey: 'publishers'})
filters.push({title: 'Order by...', queryKey: 'ordering', models: [
  {name: 'Name', ordering: 'slug'},
  {name: 'Popularity', ordering: '-popularity'},
  {name: 'Metacritic', ordering: '-metacritic'},
]})

// * METHODS

function updateQuery(newQuery: string): void {
  loading.value = true
  query.value = Object.assign(query.value, newQuery)
}

function resetQuery(): void {
  loading.value = true
  query.value = {}
}

/**
 * Set loader value to false et update results total counter
 * when the ajax call is successfull.
 * @param number queryTotalResults
 */
function setLoaderValue(queryTotalResults: number): void {
  totalResults.value = queryTotalResults
  loading.value = false
}
</script>
