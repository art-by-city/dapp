<template>
  <v-card>
    <v-img :src="src" aspect-ratio="1" />
  </v-card>
</template>

<script setup lang="ts">
const abc = useArtByCity()
const route = useRoute()
const { protocol, host, port } = abc.arweave.api.config
const gatewayBase = `${protocol}://${host}:${port}`

const slugOrId = route.params['slugOrId'] as string

const { data } = useLazyAsyncData(slugOrId, async () => {
  const publication = await abc.legacy.fetchPublication(slugOrId)

  console.log('pub', route.path, publication)

  return publication
})

const src = computed(() => {
  if (data.value) {
    if ('images' in data.value && data.value.images.length > 0) {
      /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
      return `${gatewayBase}/${data.value.images[0].preview4k}`
    }
  }

  return ''
})
</script>
