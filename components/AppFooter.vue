<template>
  <footer class="bg-gray-800 text-gray-300">
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-lg font-semibold mb-4">À propos</h3>
          <p class="text-sm">
            Designé et créé par
            <a href="https://www.alexis-gousseau.com/" class="font-medium text-primary underline underline-offset-4" target="_blank">Alexis Gousseau</a>,
            {{ config.public.appUrl }} est une bibliothèque d'informations concernant les jeu-vidéos, réalisé sous Nuxt.js.
          </p>
          <p class="text-sm">Currently v1.0.0</p>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">Liens rapides</h3>
          <NavigationLinks />
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-4">En supplément</h3>
            <ul class="space-y-2">
              <li>
                <a href="/" class="text-gray-700 hover:text-blue-600" target="_blank">Documentation</a>
              </li>
              <li>
                <a href="https://github.com/alexis-gss/games-data" class="text-gray-700 hover:text-blue-600" target="_blank"> Github repository</a>
              </li>
            </ul>
        </div>
      </div>
      <div class="mt-8 pt-4 border-t border-gray-700 text-center text-sm">
        <p>&copy; {{ new Date().getFullYear() }} {{ config.public.appUrl }}. Tous droits réservés.</p>
      </div>
    </div>
  </footer>
</template>
<script lang="ts" setup>
const config = useRuntimeConfig()
</script>
