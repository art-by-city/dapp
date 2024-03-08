<template>
  <v-hover #="{ isHovering, props: hoverProps }">
    <v-img ref="image" v-bind="hoverProps" :src="props.src">
      <v-overlay
        :model-value="isHovering"
        contained
        class="align-center justify-center"
      >
        <v-btn
          variant="text"
          color="white"
          size="x-large"
          :ripple="false"
          icon="mdi-file-remove"
          @click="onRemoveClicked"
        />
      </v-overlay>
    </v-img>
  </v-hover>
</template>

<script setup lang="ts">
import { VImg } from 'vuetify/components'

const props = defineProps<{ src: string }>()
const emits = defineEmits({
  remove() { return true }
})
const onRemoveClicked = debounce(() => emits('remove'))
const image = ref<VImg>()

defineExpose({ image })
</script>
