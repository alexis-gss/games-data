<template>
  <footer class="py-12">
    <Separator label="test" />
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
      <div>
        <h3 class="text-xl font-bold mb-4">{{ config.public.appName }}</h3>
        <p class="text-gray-400 mb-2">Designed and built by Alexis Gousseau, Games Data is a library of informations about all games released and future on all platforms.</p>
        <p class="text-gray-400">Currently v1.0.0</p>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-4">Quick links</h3>
        <ul class="space-y-2">
          <li>
            <NuxtLink
              to="/"
              class="font-medium hover:text-primary focus:text-primary underline underline-offset-4"
            >
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/advanced-search"
              class="font-medium hover:text-primary focus:text-primary underline underline-offset-4"
            >
              Advanced search
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/trend/popular"
              class="font-medium hover:text-primary focus:text-primary underline underline-offset-4"
            >
              Popular
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/planning/most-anticipated"
              class="font-medium hover:text-primary focus:text-primary underline underline-offset-4"
            >
              Most anticipated
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/browse/publishers"
              class="font-medium hover:text-primary focus:text-primary underline underline-offset-4"
            >
              Publishers
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-4">About</h3>
        <ul class="space-y-2">
          <li>
            <a href="#" class="font-medium hover:text-primary focus:text-primary underline underline-offset-4">
              Documentation
            </a>
          </li>
          <li>
            <a href="#" class="font-medium hover:text-primary focus:text-primary underline underline-offset-4">
              Github repository
            </a>
          </li>
        </ul>
      </div>
    </div>
    <Separator />
    <div class="pt-8 text-center">
      <p class="text-gray-400">&copy; {{ new Date().getFullYear() }} Games Data. All rights reserved.</p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig()
</script>

<style lang="css">
.separator {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
