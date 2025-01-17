<template>
  <Button
    class="search-trigger justify-between align-center text-gray-700 hover:text-blue-600 w-full h-auto p-2 lg:px-4"
    variant="outline"
    @click="handleOpenChange"
  >
    <p class="inline-flex items-center">
      <Search class="sm:me-2 md:me-0 lg:me-2" />
      <span class="hidden sm:block md:hidden lg:block">
        Search a game name...
      </span>
    </p>
    <CommandShortcut class="hidden lg:flex pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 text-xs ms-2">
      <template v-if="$device.isApple">
        <Command />
      </template>
      <template v-else>
        Ctrl
      </template>
      K
    </CommandShortcut>
  </Button>
  <CommandDialog v-model:open="open">
    <div class="relative items-center w-full">
      <Input
      v-model="searchQuery"
      id="search"
      type="text"
      :placeholder="`ex: ${placeholders[placeholderIndex]}`"
      class="border-t-0 border-s-0 border-e-0 rounded-none px-10"
    />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <Search class="size-6 text-muted-foreground" />
      </span>
    </div>
    <CommandList>
      <CommandEmpty class="flex flex-col justify-center items-center">
        <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
        <template v-else>
          <template v-if="loading">
            Loading...
          </template>
          <template v-else-if="searchQuery.length > searchMinCharacters">
            <TriangleAlert class="mb-1" />
            No results found.
            <Button
              @click="resetSearch"
              class="w-fit mt-2"
            >
              Reset the search
            </Button>
          </template>
          <template v-else>
            Use the field above to search game name for some results
          </template>
        </template>
      </CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem
          v-for="(game, gameIndex) in games"
          :key="gameIndex"
          :value="game.name"
        >
          {{ game.name }}
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
</template>

<script lang="ts" setup>
import { Search, TriangleAlert, Command } from 'lucide-vue-next'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command'
import { Button } from '@/components/ui/button'
import { useMagicKeys } from '@vueuse/core'
import { ref, watch } from 'vue'
import errors from '@/utils/errors'

// * DATA
const searchQuery = ref<string>('')
const searchMinCharacters = ref<number>(2)
const games = ref<Array<Game>>([])
const loading = ref<boolean>(false)
const errorMessage = ref<string|null>(null)
const open = ref(false)
const placeholders = ref<Array<string>>([
  'Cyberpunk 2077', 'Mass Effect', 'Gears of War', 'The Witcher'
])
const placeholderIndex = ref<number>(0)
const { Meta_K, Ctrl_K } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.key === 'k' && (e.metaKey || e.ctrlKey))
      e.preventDefault()
  },
})

// * WATCH

/**
 * Add event on the K key.
 * @return void
 */
watch([Meta_K, Ctrl_K], (v) => {
  if (v[0] || v[1])
    handleOpenChange()
})

/**
 * Add event on the search field.
 * @return void
 */
watch(searchQuery, async (newQuery) => {
  if (newQuery && newQuery.length > searchMinCharacters.value) {
    loading.value = true
    try {
      const { data } = await useFetch('/api/rawg-api', {
        method: 'POST',
        body: { endpoint: 'games', query: `fields name, first_release_date; search "${newQuery}"; limit 5;` }
      })
      games.value = data.value ?? []
    } catch (error) {
      errorMessage.value = errors.methods.handleAjaxError(error)
    } finally {
      loading.value = false
    }
  } else {
    games.value = []
  }
})

// * METHODS

/**
 * Toggle command tab.
 * @return void
 */
function handleOpenChange(): void {
  open.value = !open.value
  setRandomPlaceholder()
}

/**
 * Reset the search.
 * @return void
 */
function resetSearch(): void {
  searchQuery.value = ''
}

/**
 * Set a new placeholder from the placeholders array.
 * @return void
 */
function setRandomPlaceholder(): void {
  placeholderIndex.value = (placeholderIndex.value + 1 > placeholders.value.length - 1) ? 0 : placeholderIndex.value + 1
}
</script>

<style lang="css" scoped>
#search {
  box-shadow: none;
}
.search-trigger {
  width: fit-content;
  height: 34px;
  @media (min-width: 640px) {
    width: 20rem;
  }
  @media (min-width: 768px) {
    width: fit-content;
  }
  @media (min-width: 1024px) {
    width: 20rem;
  }
  @media (min-width: 1280px) {
    width: 30rem;
  }
}
</style>
