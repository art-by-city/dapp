<template>
  <model-viewer
    class="model-viewer"
    :src="props.src"
    :camera-controls="props.cameraControls"
    :auto-rotate="props.autoRotate"
    :auto-rotate-delay="props.autoRotateDelay"
    :rotation-per-second="props.rotationPerSecond"
    :interaction-prompt="props.interactionPrompt"
    :interaction-prompt-style="props.interactionPromptStyle"
    :touch-action="props.touchAction"
    :autoplay="props.autoplay"
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

const props = defineProps<{
  src: string,
  interactionPromptStyle?: string,
  autoRotateDelay?: string,
  rotationPerSecond?: string,
  autoRotate?: boolean,
  cameraControls?: boolean,
  touchAction?: string,
  autoplay?: boolean,
  interactionPrompt?: string
}>()
</script>