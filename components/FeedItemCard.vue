<template>

  <v-img
    :src="'https://arweave.net/' + data?.images[0].preview"
    aspect-ratio="1"
  >
    
  </v-img>

</template>


<script setup lang="ts">

const { id } = defineProps<{ id: string }>()
const abc = useArtByCity()

const { data, refresh, pending } = useLazyAsyncData(id, async () => {
  const publication = await abc.legacy.fetchPublication(id)
  console.log(publication)
  return publication
})

</script>


<style scoped>

</style>