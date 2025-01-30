<template>
  <Sidebar>
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem class="text-center">
          <NuxtLink
            to="/"
            class="text-background-foreground hover:text-primary"
          >
            <span class="scroll-m-20 font-extrabold tracking-tight text-2xl">
              {{ config.public.appName }}
            </span>
          </NuxtLink>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
    <SidebarGroup>
      <ThemeButton />
    </SidebarGroup>
      <!-- NAV LINKS -->
      <SidebarGroup
        v-for="(navGroup, navGroupIndex) in navList"
        :key="navGroupIndex"
      >
        <SidebarGroupLabel>{{ navGroup.title }}</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="(navLink, navLinkIndex) in navGroup.links"
              :key="navLinkIndex"
            >
              <SidebarMenuButton asChild>
                <NuxtLink
                  :to="setLink(navGroup, navLink.title)"
                  :class="[
                    route.path === setLink(navGroup, navLink.title) ? 'text-primary-foreground bg-primary' : 'text-background-foreground hover:text-primary'
                  ]"
                  @click="setRoute(setLink(navGroup, navLink.title))"
                >
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
import { Home, Search, Flame, Hourglass, History, CalendarCheck, Trophy, Gamepad2, Download, Ghost, Hash, CodeXml, DollarSign } from 'lucide-vue-next'
import slugify from 'slugify'
import { useSidebar } from '~/components/ui/sidebar'
import ThemeButton from '~/components/ThemeButton.vue'

// * DATA
const { setOpenMobile, isMobile } = useSidebar()
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
  {
    title: 'Browse',
    group: true,
    links: [
      {
        title: 'Genres',
        icon: Ghost
      },
      {
        title: 'Tags',
        icon: Hash
      },
      {
        title: 'Platforms',
        icon: Gamepad2
      },
      {
        title: 'Stores',
        icon: Download
      },
      {
        title: 'Developers',
        icon: CodeXml
      },
      {
        title: 'Publishers',
        icon: DollarSign
      }
    ]
  }
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
  if (isMobile) {
    setOpenMobile(false)
  }
  router.replace(newRoute);
};
</script>
