<template>
  <v-container v-if="curationFeed">
    <v-row>
      <v-col v-for="item in curationFeed" :key="item.id" cols="4">
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
import ArdbTransaction from 'ardb/lib/models/transaction'

const props = defineProps<{ address: string }>()
const abc = useArtByCity()
const curationFeed = ref<ArdbTransaction[]>([])
const cursor = ref<string | undefined>()
const hasReachedEnd = ref(false)

const onLoadMore = debounce(async () => {
  if (hasReachedEnd.value) { return }
  const { curations, cursor: nextCursor } = await abc
    .curations
    .createdBy(props.address, cursor.value)

  curationFeed.value.push(...curations)
  cursor.value = nextCursor

  if (!nextCursor) {
    hasReachedEnd.value = true
  }
})

onLoadMore()
</script>
