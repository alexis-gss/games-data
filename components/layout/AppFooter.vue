<template>
  <footer class="py-12">
    <Separator label="test" />
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
      <div>
        <h3 class="text-xl font-bold mb-4">À propos</h3>
        <p class="text-gray-400 mb-2">Designed and built by Alexis Gousseau, Games Data is a library of informations about all games released and future on all platforms.</p>
        <p class="text-gray-400">Currently v1.0.0</p>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-4">Quick links</h3>
        <ul class="space-y-2">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/advanced-search">Advanced search</NuxtLink></li>
          <li><NuxtLink to="/popular">Popular</NuxtLink></li>
          <li><NuxtLink to="/most-anticipated">Most anticipated</NuxtLink></li>
          <li><NuxtLink to="/publishers">Publishers</NuxtLink></li>
        </ul>
      </div>
      <div>
        <h3 class="text-xl font-bold mb-4">About</h3>
        <ul class="space-y-2">
          <li><a href="#" class="hover:text-gray-300">Documentation</a></li>
          <li><a href="#" class="hover:text-gray-300">Github repository</a></li>
        </ul>
      </div>
    </div>
    <Separator />
    <div class="pt-8 text-center">
      <p class="text-gray-400">&copy; {{ new Date().getFullYear() }} Games Data. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
</script>

<style lang="css">
.separator {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
