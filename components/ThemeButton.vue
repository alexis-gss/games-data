<template>
  <Drawer>
    <DrawerTrigger as-child>
      <Button variant="outline" class="md:hidden h-9">
        <Paintbrush class="w-4 h-4" />
        Customize
      </Button>
    </DrawerTrigger>
    <DrawerContent class="p-6 pt-0">
      <ThemeCustomizer />
    </DrawerContent>
  </Drawer>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline" class="hidden md:flex h-9">
        <Paintbrush class="w-4 h-4" />
        Customize
      </Button>
    </PopoverTrigger>
    <PopoverContent :side-offset="8" align="end" class="w-96">
      <ThemeCustomizer />
    </PopoverContent>
  </Popover>
</template>

<script lang="ts" setup>
import { Paintbrush } from 'lucide-vue-next'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
</script>
