<template>
  <v-avatar color="transparent" :size="size">
    <v-img :src="avatar ? avatar.src : ''" aspect-ratio="1" :width="size">
      <template v-slot:error>
        <v-img
          src="\logo\art-by-city\art-by-city-x.png"
          contained
          aspect-ratio="1"
          :width="size"
        />
      </template>
      <template v-slot:placeholder>
        <v-img
          src="\logo\art-by-city\art-by-city-x.png"
          contained
          aspect-ratio="1"
          :width="size"
        />
      </template>
    </v-img>

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
  data: avatar,
  refresh
} = useLazyAsyncData(`avatar-${props.address}`, async () => {
  const avatar = await abc.legacy.fetchAvatar(props.address)

  // CORS error with data url i guess
  if (avatar && !avatar.src.startsWith('data')) {
    return avatar
  }

  return null
})

watch(() => props.address, async () => { await refresh() })
</script>
