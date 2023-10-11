<template>
  <model-viewer
    :src="props.src"
    camera-controls
    touch-action="pan-y"
    class="model-viewer"
  />
</template>

<style scoped>
.model-viewer {
  min-width: 400px;
  min-height: 400px;
}
</style>

<script setup lang="ts">
import '@google/model-viewer'

const props = defineProps<{ src: string }>()
</script>