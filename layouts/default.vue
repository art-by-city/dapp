<template>
  <v-app class="surface-bg">
    <TopNavBar />
    <NuxtLoadingIndicator :height="5" color="white" :throttle="0" />
    <v-main
      class="page-container"
      :class="{ 'pt-0': isHomePage, 'is-home-page': isHomePage }"
    >
      <v-container fluid :class="{ 'pa-0': isHomePage }">
        <v-row justify="center" dense no-gutters>
          <v-col cols="12" :xl="isHomePage ? 12 : 6">
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <BottomNavBar v-if="isMobile" />
    <Footer />
  </v-app>
</template>

<style>
@import "@/assets/styles/main.css";

.page-container {
  min-height: calc(100vh - 128px);
}
.page-container.is-home-page {
  min-height: calc(100vh);
}
</style>

<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { useAuthStore } from '~/stores/auth'

const display = useDisplay()
const isMobile = computed(() => { return display.xs.value })

await useAsyncData('auth-bootstrap', async () => {
  await useAuthStore().bootstrap()
})

const isHomePage = computed(() => useRoute().path === '/')
</script>
