<template>
  <div class="nav-buttons-container">
    <v-container class="px-0">
      <v-row dense>
        <v-col class="px-sm-5">
          <v-btn
            v-if="xsDisplay"
            color="white"
            size="small"
            density="comfortable"
            variant="text"
            to="/discover"
          >
            DISCOVER
          </v-btn>
          <v-btn
            v-else
            color="white"
            variant="text"
            to="/discover"
          >
            DISCOVER
          </v-btn>
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
import { useDisplay } from 'vuetify/lib/framework.mjs'

const display = useDisplay()
const xsDisplay = display.xs
</script>
