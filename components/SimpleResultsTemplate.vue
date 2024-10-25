<template>
  <div class="relative">
    <h2 class="flex items-center justify-start mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-4">
      <component :is="icon" class="mr-[5px]" />
      {{ title }}
    </h2>
    <ul class="grid grid-cols-1 gap-2">
      <li v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</li>
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
          <li v-for="(game, gameIndex) in games" :key="gameIndex">
            <CardGame :game="game" :loading="loading" />
          </li>
          <li class="text-center mb-4">
            <Button @click="getResultsFromApi(true)">
              <template v-if="paginationLoading">
                <LoaderCircle class="animate-spin" />
                Loading...
              </template>
              <template v-else>
                Load more
              </template>
            </Button>
          </li>
        </template>
      </template>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { LoaderCircle } from 'lucide-vue-next'
import { Card, CardContent } from "@/components/ui/card"
import errors from '~/utils/errors'

// * PROPS
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  icon: {
    type: Function,
    default: null
  },
  query: {
    type: String,
    default: ''
  },
})

// * DATA
const title = ref<string>(props.title)
const icon = ref<Function|null>(props.icon)
const query = ref<string>(props.query)
const games = ref<Array<Game>>([])
const limit = ref<number>(10)
const offset = ref<number>(0)
const loading = ref<boolean>(true)
const paginationLoading = ref<boolean>(false)
const errorMessage = ref<string|null>(null)

getResultsFromApi()

// * METHODS

/**
 * Get games from ids.
 * @return Promise<void>
 */
async function getResultsFromApi(concat: boolean = false): Promise<void> {
  try {
    (concat) ? paginationLoading.value = true : loading.value = true
    if (concat) {
      offset.value = offset.value + limit.value
    }
    const { data } = await useFetch('/api/igdb-api', {
      method: 'POST',
      body: { endpoint: 'games', query: query.value + `limit ${limit.value}; offset ${offset.value};` }
    })
    games.value = (concat) ? games.value.concat(data.value) : data.value
  } catch (error) {
    errorMessage.value = errors.methods.handleAjaxError(error)
  } finally {
    (concat) ? paginationLoading.value = false : loading.value = false
  }
}
</script>
