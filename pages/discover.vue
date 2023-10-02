<template>
  <v-container id="discover-page">
    <v-row>
      <v-col>
        <span class="text-h2">Verified Artists</span>
      </v-col>
      <v-spacer />
      <v-col align-self="end" cols="2">
        <v-btn class="ma-2" @click="refresh" variant="text" align-center>
          refresh
        </v-btn>
      </v-col>
    </v-row>
    <template v-if="data">
      <v-row v-for="publication in data" :key="publication.id">
        <v-col>
          <FeedItemCard :id="publication.id" />
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script setup lang="ts">
const abc = useArtByCity()

const { data, refresh } = useLazyAsyncData('publications', async () => {
  const { publications } = await abc.legacy.queryPublications(10)

  console.log('publications', publications)

  return publications
})
</script>
