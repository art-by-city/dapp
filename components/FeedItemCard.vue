<template>
  <v-img
    :src="'https://arweave.net/' + data?.images[0].preview"
    aspect-ratio="1"
    @click="goToArt"
    @click.middle="newTabArt"
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

function goToArt() {
  alert('You clicked on da art :)')
}

function newTabArt() {
  alert('Imagine this is a new tab with da art ;o')
}

</script>


<style scoped>


</style>