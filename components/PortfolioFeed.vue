<template>
  <v-container v-if="portfolioFeed">
    <v-row>
      <v-col v-for="item in portfolioFeed.publications" :key="item.id" cols="4">
        <FeedItemCard :id="item.id" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const props = defineProps<{ address: string }>()
const abc = useArtByCity()

const {
  data: portfolioFeed
} = useLazyAsyncData(`portfolio-feed-${props.address}`, async () => {
  return await abc.legacy.queryPublications(10, props.address)
})
</script>
