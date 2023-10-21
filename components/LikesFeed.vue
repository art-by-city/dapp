<template>
  <v-container v-if="likesFeed">
    <v-row>
      <v-col v-for="like in likesFeed" :key="like.id" cols="4">
        <FeedItemCard :id="like.liked" />
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
import { LegacyLike } from '@artbycity/sdk/dist/web/legacy'

const props = defineProps<{ address: string }>()
const abc = useArtByCity()
const pageSize = 15
const likesFeed = ref<LegacyLike[]>([])
const cursor = ref<string | undefined>()
const hasReachedEnd = ref(false)

const onLoadMore = debounce(async () => {
  if (hasReachedEnd.value) { return }
  const { likes, cursor: nextCursor } = await abc
    .legacy
    .queryLikes(props.address, 'sent', pageSize, cursor.value)

  likesFeed.value.push(...likes)
  cursor.value = nextCursor

  if (!nextCursor) {
    hasReachedEnd.value = true
  }
})
onLoadMore()
</script>
