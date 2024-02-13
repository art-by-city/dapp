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
    :poster="props.poster"
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
  interactionPrompt?: string,
  poster?: boolean
}>()

const modelViewer = ref<ModelViewerElement>()

const getBlob = async () => {
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

const getDataURL = () => {
  return modelViewer.value?.toDataURL('image/jpeg')
}

const showPoster = () => {
  return modelViewer.value?.showPoster()
}

defineExpose({
  getBlob,
  getDataURL,
  showPoster
})
</script>