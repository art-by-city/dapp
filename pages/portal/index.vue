<template>
  <QRCode :text="qrText" />
  <v-text-field v-model="text" />
  <v-btn @click="onGenerateClicked">
    generate
  </v-btn>
</template>

<script setup lang="ts">
const text = ref('')
const qrText = ref('')
const onGenerateClicked = debounce(() => qrText.value = text.value)
</script>
