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
      <SidebarGroup>
        <SidebarGroupLabel>Pages</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NuxtLink to="/" class="text-gray-700 hover:text-blue-600"><House />Accueil</NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NuxtLink to="/search" class="text-gray-700 hover:text-blue-600"><Search />Search</NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Games</SidebarGroupLabel>
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
                  <Star />Top 100
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
      <SidebarGroup>
        <SidebarGroupLabel>Account</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NuxtLink to="/" class="text-gray-700 hover:text-blue-600"><House />Want</NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NuxtLink to="/" class="text-gray-700 hover:text-blue-600"><House />Played</NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>

<script lang="ts" setup>
import { House, Search, Flame, Hourglass, History, CalendarCheck, Star } from 'lucide-vue-next'
</script>
