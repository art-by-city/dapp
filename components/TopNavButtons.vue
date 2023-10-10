<template>
  <div class="nav-buttons-container">
    <v-container>
      <v-row>
        <v-col cols="2">
          <v-btn color="white" variant="text" to="/discover">
            DISCOVER
          </v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn
            v-if="auth.address"
            color="white"
            variant="text"
            to="/curations"
          >
            CURATE
          </v-btn>
        </v-col>
        <v-col v-if="auth.address" cols="1">
          <Avatar :address="auth.address" :small="true" />
        </v-col>
        <v-col>
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

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
</script>
