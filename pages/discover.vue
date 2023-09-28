<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col cols="auto">
        <v-btn class="ma-2" @click="refresh">
          refresh
        </v-btn>
      </v-col>
    </v-row>
    
    

    <v-container v-if="data">
      <FeedItemCard :id="data.publications[0].id" />
      <v-row v-for="publication in data.publications" :key="publication.id">
        <v-col>{{ publication }}</v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup lang="ts">
const abc = useArtByCity()

const { data, refresh } = useLazyAsyncData('publications', async () => {
  const { publications } = await abc.legacy.queryPublications(10)

  console.log('got publications!', publications)

  // const publication = await abc.legacy.fetchPublication(publications[0].id)

  // console.log('publicatio', publication)

  return { publications }
})
</script>
