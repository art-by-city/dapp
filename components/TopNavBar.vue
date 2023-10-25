<template>
  <v-app-bar
    flat
    class="app-bar"
    :class="{ 'is-home-page': isHomePage }"
    :color="color"
  >
    <template #prepend>
      <router-link v-slot="{navigate}" to="/" custom>
        <div class="logo-container" @click="navigate">
          <img
            class="logo pa-2"
            src="/logo/art-by-city/art-by-city-logo.png"
            alt="Art x By x City"
          >
        </div>
      </router-link>
    </template>

    <template v-if="!isXsMobile" #append>
      <TopNavButtons />
    </template>
  </v-app-bar>
</template>

<style scoped>
.app-bar {
  margin-bottom: 0px;
}
.app-bar.is-home-page {
  margin-bottom: -64px;
}

.logo-container {
  height: 100%;
}

.logo {
  height: 100%;
  width: auto;
  cursor: pointer;
}

.is-home-page:deep(.logo-container) {
  display: none !important;
}
</style>

<script setup lang="ts">
import { useDisplay } from 'vuetify/lib/framework.mjs';

const display = useDisplay()
const isXsMobile = computed(() => { return display.xs.value })
const color = computed(() => isHomePage.value ? 'transparent' : 'primary')
const isHomePage = computed(() => useRoute().path === '/')
</script>
