<template>
  <div>Dis be da art portfolio feed for: {{ address }}</div>

</template>


<style>


</style>


<script setup lang="ts">
const props = defineProps<{
  address: string
}>()

</script>