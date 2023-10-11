<template>
  <v-container id="discover-page">
    <v-row>
      <v-col>
        <span class="text-h4">Verified Artists</span>
      </v-col>
      <v-spacer />
      <v-col align-self="end" cols="2">
        <v-btn class="ma-2" variant="text" align-center @click="refresh">
          refresh
        </v-btn>
      </v-col>
    </v-row>
    <template v-if="data">
      <v-row v-for="pub in data" :key="pub.id" justify="center">
        <v-col cols="12" md="6" lg="9" xl="10" xxl="12">
          <FeedItemCard
            :id="pub.id"
            :to="`/${pub.creator}/${pub.slug || pub.id}`"
          />
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
