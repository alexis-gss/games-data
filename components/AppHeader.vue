<template>
  <header class="bg-white shadow-md">
    <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
      <div class="flex items-center">
        <NuxtLink to="/" class="text-xl font-bold text-blue-600">Logo</NuxtLink>
      </div>
      <div class="hidden md:flex space-x-4">
        <NavigationLinks />
      </div>
      <button class="md:hidden text-gray-700" @click="toggleMenu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </nav>
    <div v-if="isMenuOpen" class="md:hidden">
      <NavigationLinks />
    </div>
  </header>
</template>

<script setup>
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>
