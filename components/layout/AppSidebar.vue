<template>
  <Sidebar>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <NuxtLink to="/" class="text-gray-700 hover:text-blue-600">
            <h1 class="scroll-m-20 font-extrabold text-center tracking-tight text-2xl">
              {{ config.public.appName }}
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
              <SearchCommand />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <!-- NAV LINKS -->
      <SidebarGroup v-for="(navGroup, navGroupIndex) in navList" :key="navGroupIndex">
        <SidebarGroupLabel>{{ navGroup.title }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="(navLink, navLinkIndex) in navGroup.links" :key="navLinkIndex">
              <SidebarMenuButton asChild>
                <NuxtLink :to="setLink(navGroup, navLink.title)" :class="[
                  'hover:text-blue-600',
                  route.path === setLink(navGroup, navLink.title) ? 'text-blue-600' : 'text-gray-700'
                ]" @click="setRoute(setLink(navGroup, navLink.title))">
                  <component :is="navLink.icon" />{{ navLink.title }}
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
import { useRoute } from 'vue-router'
import { Home, Search, Flame, Hourglass, History, CalendarCheck, Star, CircleCheckBig, Trophy } from 'lucide-vue-next'
import slugify from 'slugify'
import SearchCommand from "@/components/SearchCommand.vue"

// * DATA
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const navList = ref<Array<NavGroup>>([
  {
    title: 'Pages',
    group: false,
    links: [
      {
        title: 'Home',
        icon: Home
      },
      {
        title: 'Advanced search',
        icon: Search
      }
    ]
  },
  {
    title: 'Trend',
    group: true,
    links: [
      {
        title: 'Popular',
        icon: Flame
      },
      {
        title: 'Best rated',
        icon: Trophy
      },
      {
        title: 'Wishlist',
        icon: Star
      },
      {
        title: 'Played',
        icon: CircleCheckBig
      }
    ]
  },
  {
    title: 'Planning',
    group: true,
    links: [
      {
        title: 'Recently released',
        icon: History
      },
      {
        title: 'Upcoming release',
        icon: Hourglass
      },
      {
        title: 'Most anticipated',
        icon: CalendarCheck
      }
    ]
  },
])

// * METHODS

/**
  * Assign data from pops.
  * @return string
  */
function setLink(navGroup: NavGroup, title: string): string {
  return (navGroup.group ? '/' + slugify(navGroup.title, { lower: true }) : '')
    + '/'
    + (title !== 'Home' ? slugify(title, { lower: true }) : '');
};

/**
  * Set the new route.
  * @return void
  */
function setRoute(newRoute: string): void {
  router.replace(newRoute);
};
</script>
