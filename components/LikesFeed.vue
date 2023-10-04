<template>
  <v-container v-if="likesFeed">
    <v-row>
      <v-col v-for="like in likesFeed.likes" :key="like.id" cols="4">
        <FeedItemCard :id="like.liked" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const props = defineProps<{ address: string }>()
const abc = useArtByCity()

const {
  data: likesFeed
} = useLazyAsyncData(`likes-feed-${props.address}`, async () => {
  return await abc.legacy.queryLikes(props.address, 'sent')
})
</script>
