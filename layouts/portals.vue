<template>
  <v-app class="surface-bg">
    <NuxtLoadingIndicator :height="5" color="white" :throttle="0" />
    <v-main class="page-container pt-0 portal-layout">
      <v-container fluid class="pa-0">
        <v-row justify="center" dense no-gutters>
          <v-col cols="12">
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
html:has(.portal-container) {
  overflow-y: hidden !important;
}
.portal-layout {
  background-color: black;
}
</style>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

await useAsyncData('auth-bootstrap', async () => {
  await useAuthStore().bootstrap()
})
</script>
