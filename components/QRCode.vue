<template>
  <canvas
    ref="qrCanvas"
    class="qr-canvas"
    :height="props.height"
    :width="props.width"
  />
</template>

<style scoped>
.qr-canvas {
  max-width: 100% !important;
  max-height: 100% !important;
}
</style>

<script setup lang="ts">
import QRCode from 'qrcode'

const props = withDefaults(
  defineProps<{ text: string, height?: string, width?: string }>(),
  { height: '100%', width: '100%' }
)
const qrCanvas = ref<HTMLCanvasElement | null>(null)
const draw = async () => {
  if (qrCanvas.value && props.text) {
    await QRCode.toCanvas(qrCanvas.value, props.text, {
      errorCorrectionLevel: 'high',
      margin: 1
    })
  }
}

onBeforeUpdate(draw)
onMounted(draw)
</script>
