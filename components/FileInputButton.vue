<template>
  <v-file-input
    multiple
    class="file-input-button"
    prepend-icon="mdi-plus"
    @update:model-value="onFilesUpdated"
  >
  </v-file-input>
</template>

<style scoped>
.file-input-button {
  width: 50px;
  margin: 0 auto;
  display: inline-block;
}
.file-input-button:deep(.v-input__control) {
  display: none;
}
.file-input-button:deep(.v-input__details) {
  display: none;
}
</style>

<script setup lang="ts">
const emit = defineEmits({
  update(files: { file: File, url: string }[]) {
    return files
  }
})

const onFilesUpdated = (files: File[]) => {
  console.log('got file(s)', files.length, files)
  emit('update', files.map(file => ({ file, url: URL.createObjectURL(file) })))
}
</script>
