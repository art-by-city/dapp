<template>
  <v-btn
    disabled
    elevation="2"
    variant="outlined"
    color="primary"
    density="compact"
    size="small"
  >
    Tip
  </v-btn>
</template>

<script setup lang="ts">
defineProps<{ address: string }>()
</script>
