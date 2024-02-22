<template>
  <v-file-input
    :multiple="props.multiple"
    class="file-input-button"
    prepend-icon="mdi-plus"
    @update:model-value="onFilesUpdated"
  />
</template>

<style scoped>
.file-input-button {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: inline-block;
}
.file-input-button:deep(.v-icon) {
  width: 100%;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}
.file-input-button:deep(.mdi:before) {
  margin-top: 138px; /*NB: hacky */
}
.file-input-button:deep(.v-input__prepend) {
  width: 100%;
  height: 100%;
  margin: 0;
}
.file-input-button:deep(.v-input__control) {
  display: none;
}
.file-input-button:deep(.v-input__details) {
  display: none;
}
</style>

<script setup lang="ts">
const props = defineProps<{ type?: string, multiple?: boolean }>()
const emits = defineEmits({
  update(files: { file: File, url: string }[]) {
    return files
  }
})

const onFilesUpdated = (files: File[]) => {
  emits('update', files.map(file => ({ file, url: URL.createObjectURL(file) })))
}
</script>
