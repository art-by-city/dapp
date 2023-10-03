<template>
  <v-card elevation="0">
    <v-card-title>{{ address }}</v-card-title>
    <v-card-subtitle class="pb-0">
      <p class="mb-0">
        Second Name
      </p>
      <p class="mb-0">
        Third Name
      </p>
      <p class="mb-0">
        Socials
      </p>
    </v-card-subtitle>
    <v-card-text class="pb-0">
      Artist bio goes here please.
    </v-card-text>
  </v-card>
</template>

<style>


</style>

<script setup lang="ts">
defineProps<{ address: string }>()

</script>
