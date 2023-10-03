<template>
  <v-app class="background-bg">
    <TopNavBar />
    <v-main :class="{ 'pt-0': isHomePage }">
      <v-container fluid :class="{ 'pa-0': isHomePage }">
        <v-row justify="center" dense>
          <v-col cols="12" :md="isHomePage ? 12 : 6">
            <slot />
          </v-col>
        </v-row>
      </v-container>
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
