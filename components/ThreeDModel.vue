<template>
  <model-viewer
    class="model-viewer"
    ref="modelViewer"
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
import { ModelViewerElement } from '@google/model-viewer'
import { $renderer } from '@google/model-viewer/lib/model-viewer-base'

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

const modelViewer = ref<ModelViewerElement>()

const getModelPreview = async () => {
  if (!modelViewer.value) {
    throw new Error('Could not get modelViewer ref!')
  }

  return new Promise<Blob | null>(
    resolve => modelViewer.value?.[$renderer].canvas3D.toBlob(
      blob => resolve(blob),
      'image/jpeg'
    )
  )  
}

defineExpose({
  getModelPreview
})
</script>