<template>
  <div class="nav-buttons-container">
    <v-container class="px-0">
      <v-row dense>
        <v-col class="mx-sm-5">
          <v-btn
            color="white"
            density="comfortable"
            variant="text"
            to="/discover"
          >
            DISCOVER
          </v-btn>
        </v-col>
        <!-- <v-col v-if="auth.isLoggedIn">
          <v-btn
            color="white"
            density="comfortable"
            variant="text"
            to="/curations"
          >
            CURATE
          </v-btn>
        </v-col> -->
        <v-col class="mx-2">
          <ConnectButton />
        </v-col>
      </v-row>
    </v-container>    
  </div>
</template>

<style>
.nav-buttons-container {
  display: flex;
  flex-direction: row;
}
</style>

<!-- <script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
</script> -->
