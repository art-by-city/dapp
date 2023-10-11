<template>
  <model-viewer
    :src="props.src"
    camera-controls
    auto-rotate
    auto-rotate-delay="1000"
    rotation-per-second="0.5rad"
    interaction-prompt-style="basic"
    touch-action="pan-y"
    class="model-viewer"
  />
</template>

<style scoped>
.model-viewer {
  height: 100%;
  width: 100%;
}
</style>

<script setup lang="ts">
import '@google/model-viewer'

const props = defineProps<{ src: string }>()
</script>