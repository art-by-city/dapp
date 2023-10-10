<template>
  <v-container id="discover-page">
    <v-row>
      <v-col>
        <span class="text-h2">Verified Artists</span>
      </v-col>
      <v-spacer />
      <v-col align-self="end" cols="2">
        <v-btn class="ma-2" variant="text" align-center @click="refresh">
          refresh
        </v-btn>
      </v-col>
    </v-row>
    <template v-if="data">
      <v-row v-for="pub in data" :key="pub.id">
        <v-col>
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
const router = useRouter()

const clickedOnArt = async (slugOrId: string) => {
  const publication = await abc.legacy.fetchPublication(slugOrId)
  
  return router.push({ path: `${publication.creator}` + '/' + `${slugOrId}` })
}

const { data, refresh } = useLazyAsyncData('publications', async () => {
  const { publications } = await abc.legacy.queryPublications(10)

  console.log('publications', publications)

  return publications
})
</script>
