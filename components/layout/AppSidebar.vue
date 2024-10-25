<template>
  <Sidebar class="bg-slate-100">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <NuxtLink to="/" class="text-gray-700 hover:text-blue-600">
            <h1 class="scroll-m-20 font-extrabold text-center tracking-tight text-2xl">
              Games data
            </h1>
          </NuxtLink>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <!-- SEARCH -->
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SearchDialog />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <!-- TREND -->
      <SidebarGroup>
        <SidebarGroupLabel>Pages</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NuxtLink to="/" class="text-gray-700 hover:text-blue-600"><House />Home</NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NuxtLink to="/advanced-search" class="text-gray-700 hover:text-blue-600"><Search />Advanced search</NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <!-- TREND -->
      <SidebarGroup>
        <SidebarGroupLabel>Trend</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NuxtLink to="/" class="text-gray-700 hover:text-blue-600">
                  <Flame />Popular
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NuxtLink to="/" class="text-gray-700 hover:text-blue-600">
                  <Trophy />Top 100
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NuxtLink to="/" class="text-gray-700 hover:text-blue-600">
                  <Star />Wishlist
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NuxtLink to="/" class="text-gray-700 hover:text-blue-600">
                  <CircleCheckBig />Played
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <!-- PLANING -->
      <SidebarGroup>
        <SidebarGroupLabel>Planing</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NuxtLink to="/" class="text-gray-700 hover:text-blue-600">
                  <History />Recently released
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NuxtLink to="/" class="text-gray-700 hover:text-blue-600">
                  <Hourglass />Coming soon
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NuxtLink to="/" class="text-gray-700 hover:text-blue-600">
                  <CalendarCheck />Most anticipated
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>

<script lang="ts" setup>
import { House, Search, Flame, Hourglass, History, CalendarCheck, Star, CircleCheckBig, Trophy } from 'lucide-vue-next'
</script>
