<template>
  <div class="relative">
    <div class="flex items-center justify-start mt-10 scroll-m-20 border-b pb-2 text-2xl md:text-3xl font-bold tracking-tight transition-colors first:mt-0 mb-4">
      <component
        :is="icon"
        class="mr-[5px]"
      />
      <h1>{{ title }}</h1>
    </div>
    <slot></slot>
    <ul :class="wrapperClass">
      <li
        v-if="errorMessage"
        class="text-red-500 mt-4"
      >
        {{ errorMessage }}
      </li>
      <template v-else>
        <template v-if="loading">
          <li
            v-for="skeleton in paginationParameters.pageSize"
            :key="skeleton"
          >
            <component :is="cardPlaceholder" />
          </li>
        </template>
        <template v-else>
          <li
            v-for="(game, gameIndex) in games"
            :key="gameIndex"
          >
            <component :is="card" :model="game" />
          </li>
          <li
            v-if="paginationParameters.loading"
            v-for="skeleton in paginationParameters.pageSize"
            :key="skeleton"
          >
            <component :is="cardPlaceholder" />
          </li>
          <li
            v-if="paginationParameters.total * paginationParameters.page > games.length"
            class="text-center mb-4"
          >
            <Button
              @click="getResultsFromApi(true)"
              :disabled="loading||paginationParameters.loading"
            >
              <template v-if="paginationParameters.loading">
                <LoaderCircle class="animate-spin" />
                Loading...
              </template>
              <template v-else>
                Load more
              </template>
            </Button>
          </li>
          <li v-else>all data are loaded</li>
        </template>
      </template>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { LoaderCircle } from 'lucide-vue-next'
import CardGameMedium from "@/components/cards/games/CardGameMedium.vue"
import CardGamePlaceholderMedium from "@/components/cards/games/CardGamePlaceholderMedium.vue"
import errors from '@/utils/errors'

// * EVENTS
const emit = defineEmits(['successfullCall'])

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
  endpoint: {
    type: String,
    default: 'games'
  },
  query: {
    type: String,
    default: '{"ordering":"slug"}'
  },
  pageSize: {
    type: Number,
    default: 20
  },
  card: {
    type: Object,
    default: CardGameMedium
  },
  cardPlaceholder: {
    type: Object,
    default: CardGamePlaceholderMedium
  },
  wrapperClass: {
    type: String,
    default: 'grid grid-cols-1 gap-2'
  },
})

// * DATA
const title = ref<string>(props.title)
const icon = ref<Function|null>(props.icon)
const endpoint = ref<string>(props.endpoint)
const query = ref<string>(props.query)
const games = ref<Array<Game>>([])
const card = markRaw<object>(props.card)
const cardPlaceholder = markRaw<object>(props.cardPlaceholder)
const wrapperClass = ref<string>(props.wrapperClass)
const loading = ref<boolean>(true)
const errorMessage = ref<string|null>(null)
const paginationParameters = reactive<{
  total: number,
  page: number,
  pageSize: number,
  loading: boolean,
  lastPage: boolean,
}>({
  total: 1,
  page: 1,
  pageSize: props.pageSize,
  loading: false,
  lastPage: false
})

// * LIFECYCLE
getResultsFromApi()

// * WATCHERS

watch(() => props.query, (newValue) => {
  query.value = newValue
  paginationParameters.page = 1
  getResultsFromApi()
})

// * METHODS

/**
 * Get games from ids.
 * @return Promise<void>
 */
async function getResultsFromApi(concat: boolean = false): Promise<void> {
  try {
    if (concat) {
      paginationParameters.page = paginationParameters.page + 1
      paginationParameters.loading = true
    } else {
      loading.value = true
    }
    const { data } = await useFetch('/api/rawg-api', {
      method: 'POST',
      body: {
        endpoint: endpoint.value,
        query: setParams(query.value)
      }
    })
    paginationParameters.total = data.value.count
    games.value = (concat) ? games.value.concat(data.value.results) : data.value.results
  } catch (error) {
    errorMessage.value = errors.methods.handleAjaxError(error)
  } finally {
    (concat) ? paginationParameters.loading = false : loading.value = false
    emit('successfullCall', paginationParameters.total)
  }
}

/**
 * Set params pagination.
 * @param string query
 * @return Object
 */
function setParams(query: string): Object {
  let params = JSON.parse(query)
  params['page'] = paginationParameters.page
  params['page_size'] = paginationParameters.pageSize
  return params
}
</script>
