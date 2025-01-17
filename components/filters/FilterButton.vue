<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        class="justify-between rounded-none border-s-0"
        @click="(ajaxCall) ? getResultsFromApi() : ''"
      >
        {{ selectedFilter
          ? models.find((model) => getModelSelected(model) === selectedFilter)?.name
          : title }}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-full sm:w-[200px] p-0">
      <Command>
        <CommandInput class="h-9" :placeholder="placeholder" />
        <CommandEmpty>
          <template v-if="loading">
            Loading...
          </template>
          <template v-else>
            No results found.
          </template>
        </CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="(model, modelIndex) in models"
              :key="modelIndex"
              :value="getModelSelected(model)"
              @select="(ev) => {
                if (typeof ev.detail.value === 'string' || typeof ev.detail.value === 'number') {
                  selectedFilter = ev.detail.value
                }
                open = false
              }"
            >
              {{ model.name }}
              <Check
                :class="[
                  'ml-auto h-4 w-4',
                  selectedFilter === getModelSelected(model) ? 'opacity-100' : 'opacity-0',
                ]"
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script lang="ts" setup>
import { Check, ChevronsUpDown } from 'lucide-vue-next'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'

// * EVENTS
const emit = defineEmits(['updateQueryFilter'])

// * PROPS
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  queryKey: {
    type: String,
    default: '',
  },
  indexBySlug: {
    type: Boolean,
    default: true,
  },
  models: {
    type: Object as PropType<Array<Genre|Tag|Platform|Store|Developer|Publisher|{name: string, ordering: string}>>,
    default: () => { return []; }
  },
})

// * DATA
const models = ref<typeof props.models>(props.models)
const ajaxCall = ref<boolean>((props.models.length) ? false : true)
const open = ref<boolean>(false)
const title = ref<string>(props.title)
const placeholder = ref<string>((props.models.length) ? getRandomValue() : title.value)
const query = ref<{ [key: string]: string }>({})
const queryKey = ref<string>(props.queryKey)
const selectedFilter = ref<string|number>("")
const indexBySlug = ref<boolean>(props.indexBySlug)
const loading = ref<boolean>(false)
const errorMessage = ref<string>("")

// * WATCHERS

watch(selectedFilter, (newValue) => {
  query.value[queryKey.value] = newValue
  emit('updateQueryFilter', query.value)
})

// * METHODS

/**
 * Get games from ids.
 * @return Promise<void>
 */
async function getResultsFromApi(): Promise<void> {
  if (!models.value.length) {
    try {
      loading.value = true
      const { data } = await useFetch('/api/rawg-api', {
        method: 'POST',
        body: {
          endpoint: queryKey.value,
          query: {
            ordering: "slug",
            page: 1,
            page_size: 100,
          }
        }
      })
      models.value = data.value.results
    } catch (error) {
      errorMessage.value = errors.methods.handleAjaxError(error)
    } finally {
      loading.value = false
      placeholder.value = getRandomValue()
    }
  }
}

function getModelSelected(model: Genre|Tag|Platform|Store|Developer|Publisher|{name: string, ordering: string}): string|number {
  return (indexBySlug.value) ? model.slug : model.id
}

/**
 * Get a random value from the models array.
 * @return string
 */
function getRandomValue(): string {
  return `ex: ${models.value[Math.floor(Math.random() * models.value.length)].name}`
}
</script>
