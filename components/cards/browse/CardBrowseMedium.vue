<template>
  <NuxtLink to="/advanced-search">
    <Card class="relative overflow-hidden flex flex-col justify-start items-center text-white w-full h-full">
      <img
        :src="model.image_background !== null ? model.image_background : 'https://placehold.co/90x90/jpg'"
        class="absolute inset-0 w-full h-full object-cover"
        :alt="`Cover of the card ${model.name}`"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-20" />
      <div class="absolute inset-0 bg-slate-900 bg-opacity-50 z-10" />
      <CardHeader class="flex flex-col justify-center items-center px-4 py-6 z-20">
        <CardTitle class="font-bold">
          {{ model.name }}
          <template v-if="model.year_start">
            ({{ model.year_start }})
          </template>
        </CardTitle>
        <CardDescription class="text-sm text-white italic mx-auto">
          ({{ model.games_count }} games)
        </CardDescription>
      </CardHeader>
      <CardContent class="w-full p-4 pt-0 z-20">
        <Table class="text-center no-hover">
          <TableBody>
            <TableRow
              v-for="(game, gameIndex) in model.games.slice(0, 3)"
              :key="gameIndex"
              class="border-0"
            >
              <TableCell class="p-0">
              {{ game.name }}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </NuxtLink>
</template>

<script lang="ts" setup>
import { CalendarIcon } from 'lucide-vue-next'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// * PROPS
const props = defineProps({
  model: {
    type: Object as PropType<Genre|Tag|Platform|Store|Developer|Publisher>,
    default: () => { return []; }
  },
})

// * DATA
const model = ref<Object>(props.model)

// * METHODS
</script>

<style lang="css">
.no-hover tr:hover {
  @apply bg-transparent;
}
</style>
