<template>
  <v-container>
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

const likesFeed = await abc.legacy.queryLikes(props.address, 'sent')
</script>
