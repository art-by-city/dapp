<template>
  <v-container v-if="tipsFeed" dense>
    <v-timeline density="compact" side="end" truncate-line="start">
      <v-timeline-item v-for="tip in tipsFeed" :key="tip.id" cols="12">
        <template #icon>
          <Avatar :address="tip.from" small />
        </template>
        <Tip :tx-id="tip.id" :from="tip.from" :amount="tip.amount" />
      </v-timeline-item>
    </v-timeline>
    <v-row v-if="!hasReachedEnd">
      <v-col>
        <v-btn @click="onLoadMore">
          Load More
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { LegacyTip } from '@artbycity/sdk/dist/web/legacy'

const props = defineProps<{ address: string }>()
const abc = useArtByCity()
const pageSize = 5
const tipsFeed = ref<LegacyTip[]>([])
const cursor = ref<string | undefined>()
const hasReachedEnd = ref(false)

const onLoadMore = debounce(async () => {
  if (hasReachedEnd.value) { return }
  const { tips, cursor: nextCursor } = await abc
    .legacy
    .queryTips(props.address, "received", pageSize, cursor.value)

  tipsFeed.value.push(...tips)
  cursor.value = nextCursor

  if (!nextCursor) {
    hasReachedEnd.value = true
  }
})

await onLoadMore()
</script>
