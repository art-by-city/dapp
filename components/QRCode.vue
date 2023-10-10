<template>
  <canvas ref="qrCanvas" class="qr-canvas" />
</template>

<style scoped>
.qr-canvas {
  width: 0;
  height: 0;
}
</style>

<script setup lang="ts">
import QRCode from 'qrcode'

const props = defineProps<{ text: string }>()
const qrCanvas = ref<HTMLCanvasElement | null>(null)
const draw = async () => {
  if (qrCanvas.value && props.text) {
    await QRCode.toCanvas(qrCanvas.value, props.text)
  }
}

onBeforeUpdate(draw)
onMounted(draw)
</script>
