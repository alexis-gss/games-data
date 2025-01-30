<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button
        class="justify-start md:rounded-e-none"
        variant="outline"
        :disabled="loading"
      >
        Select a year...
        <Badge
          v-if="specificYear"
          class="font-bold"
          variant="secondary"
        >
          {{ selectedYear }}
        </Badge>
      </Button>
    </DrawerTrigger>
    <DrawerContent>
      <div class="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle class="text-center">Select a year</DrawerTitle>
          <DrawerDescription class="text-center italic">
            between 1954 and {{ currentYear }}
          </DrawerDescription>
        </DrawerHeader>
        <div class="p-4">
          <div class="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              class="h-8 w-8 shrink-0 rounded-full"
              :disabled="selectedYear <= 1954"
              @click="selectedYear -= 1"
            >
              <Minus class="h-4 w-4" />
              <span class="sr-only">Decrease</span>
            </Button>
            <div class="flex-1 text-center">
              <div class="text-7xl font-bold tracking-tighter">
                {{ selectedYear }}
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              class="h-8 w-8 shrink-0 rounded-full"
              :disabled="selectedYear >= currentYear"
              @click="selectedYear += 1"
            >
              <Plus class="h-4 w-4" />
              <span class="sr-only">Increase</span>
            </Button>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose as-child>
            <Button @click="selectYear">Select</Button>
          </DrawerClose>
          <DrawerClose as-child>
            <Button
              variant="outline"
              v-if="specificYear"
              @click="resetYear"
            >
              Reset filter
            </Button>
          </DrawerClose>
          <DrawerClose as-child>
            <Button variant="outline">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
</template>

<script lang="ts" setup>
import { Minus, Plus } from 'lucide-vue-next'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer'

// * EVENTS
const emit = defineEmits(['updateQueryYear'])

// * DATA
const currentYear = ref<number>((new Date()).getFullYear())
const selectedYear = ref<number>(currentYear.value)
const startYear = ref<Date>(new Date(1954, 0, 1))
const endYear = ref<Date>(new Date(2025, 11, 31))
const specificYear = ref<boolean>(false)
const loading = ref<boolean>(false)
const query = ref<{dates: string}>({
  dates: '',
})

// * METHODS

/**
 * Select a new year.
 * @return void
 */
function selectYear(): void {
  specificYear.value = true
  setDates(selectedYear.value, selectedYear.value)
}

/**
 * Reset selected year to the default settings.
 * @return
 */
function resetYear(): void {
  selectedYear.value = currentYear.value
  specificYear.value = false
  setDates(1954, 2025)
}

/**
 * Set new dates.
 * @param newStartYear number
 * @param newEndYear number
 * @return void
 */
function setDates(newStartYear: number, newEndYear: number): void {
  startYear.value.setFullYear(newStartYear)
  endYear.value.setFullYear(newEndYear)
  query.value.dates = `${startYear.value.toISOString().slice(0, 10)},${endYear.value.toISOString().slice(0, 10)}`
  emit('updateQueryYear', query.value)
}
</script>
