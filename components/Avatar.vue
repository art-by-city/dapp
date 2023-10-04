<template>
  <v-avatar color="transparent" :size="size">
    <v-img v-if="avatar" :src="avatar.src" aspect-ratio="1" :width="size" />
    <v-img
      v-else
      src="\logo\art-by-city\art-by-city-x.png"
      contained
      aspect-ratio="1"
      :width="size"
    />
  </v-avatar>
</template>

<script setup lang="ts">
const props = defineProps<{
  address: string,
  small?: boolean
}>()

const abc = useArtByCity()
const size = props.small ? 32 : 128
const {
  data: avatar
} = useLazyAsyncData(`avatar-${props.address}`, async () => {
  return await abc.legacy.fetchAvatar(props.address)
})
</script>
