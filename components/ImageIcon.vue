<template>
  <img
    :src="props.src"
    class="image-icon"
  >
</template>

<style scoped>
.image-icon {
  height: 16px;
  width: 16px;
  vertical-align: middle;
}
</style>

<script setup lang="ts">
const props = defineProps<{ src: string }>()
</script>
