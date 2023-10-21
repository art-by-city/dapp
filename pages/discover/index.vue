<template>
  <v-container id="discover-page">
    <v-row>
      <v-col>
        <span class="text-h4">Verified Artists</span>
      </v-col>
    </v-row>
    <v-row
      v-for="pub in publicationsStore.verified.publications"
      :key="pub.id"
      justify="center"
    >
      <v-col cols="12" md="6" lg="9" xl="10" xxl="12">
        <FeedItemCard
          :id="pub.id"
          :to="`/${pub.creator}/${pub.slug || pub.id}`"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-btn
          v-if="!publicationsStore.verified._hasReachedEnd"
          elevation="2"
          color="primary"
          variant="outlined"
          @click="onLoadMoreClicked"
        >
          Load More
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { usePublicationsStore } from '~/stores/publications'

const publicationsStore = usePublicationsStore()

await publicationsStore.bootstrapVerified()

const onLoadMoreClicked = debounce(async () => {
  await publicationsStore.queryVerified()
})
</script>
