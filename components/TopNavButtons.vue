<template>
  <div class="nav-buttons-container">
    <v-container>
      <v-row>
        <v-col>
          <v-btn color="white" variant="text" to="/discover">
            DISCOVER
          </v-btn>
        </v-col>
        <v-col v-if="auth.isLoggedIn" cols="1" class="mt-2">
          <Avatar :address="(auth.address as string)" :small="true" /> 
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
