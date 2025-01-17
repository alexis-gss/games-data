<template>
  <AppHeader breadcrumb="Game" />
  <Tabs default-value="default" class="w-[400px]">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="default">
        Default
      </TabsTrigger>
      <TabsTrigger value="second">
        Second
      </TabsTrigger>
    </TabsList>
    <TabsContent value="default">
      <Card>
        <CardHeader>
          <CardTitle>Default tab</CardTitle>
          <CardDescription>
            Here the description of the first part.
          </CardDescription>
        </CardHeader>
      </Card>
    </TabsContent>
    <TabsContent value="second">
      <Card>
        <CardHeader>
          <CardTitle>Second tab</CardTitle>
          <CardDescription>
            Some text for the second part of the tab.
          </CardDescription>
        </CardHeader>
      </Card>
    </TabsContent>
  </Tabs>
</template>

<script setup lang="ts">
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import AppHeader from "@/components/layout/AppHeader.vue"

definePageMeta({
  layout: 'default'
})
</script>
