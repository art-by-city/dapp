<template>
  <v-app class="background-bg">
    <TopNavBar />
    <v-main :class="{ 'no-padding-top': isHomePage }">
      <slot />
    </v-main>
    <Footer />
  </v-app>
</template>

<style>
@import "@/assets/styles/main.css";
</style>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

await useAsyncData('auth-bootstrap', async () => {
  await useAuthStore().bootstrap()
})

const isHomePage = computed(() => useRoute().path === '/')
</script>
