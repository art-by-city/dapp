<template>
  <v-container v-if="portfolioFeed">
    <v-row>
      <v-col v-for="item in portfolioFeed" :key="item.id" cols="4">
        <FeedItemCard :id="item.id" />
      </v-col>
    </v-row>
    <v-row v-if="!hasReachedEnd">
      <v-col>
        <v-btn
          elevation="2"
          color="primary"
          variant="outlined"
          @click="onLoadMore"
        >
          Load More
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { LegacyPublicationManifestBase } from '@artbycity/sdk/dist/web/legacy'

const props = defineProps<{ address: string }>()
const abc = useArtByCity()
const pageSize = 15
const portfolioFeed = ref<LegacyPublicationManifestBase[]>([])
const cursor = ref<string | undefined>()
const hasReachedEnd = ref(false)

const onLoadMore = debounce(async () => {
  if (hasReachedEnd.value) { return }
  const { publications, cursor: nextCursor } = await abc
    .legacy
    .queryPublications(pageSize, props.address, cursor.value)

  portfolioFeed.value.push(...publications)
  cursor.value = nextCursor

  if (!nextCursor) {
    hasReachedEnd.value = true
  }
})

onLoadMore()
</script>
