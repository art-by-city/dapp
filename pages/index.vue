<template>
  <div style="height:200px">
    <h1>your art forever</h1>

    <v-btn @click="refresh">refresh</v-btn>

    <v-container v-if="data">
      <v-row v-for="publication in data.publications" :key="publication.id">
        {{ publication }}
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
const abc = useArtByCity()



const { data, refresh } = useLazyAsyncData('publications', async () => {
  const { publications } = await abc.legacy.queryPublications(10)

  console.log('got publications!', publications)

  return { publications }
})
</script>
