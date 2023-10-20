<template>
  <v-container v-if="tipsFeed" dense>
    <v-row>
      <v-col v-for="tip in tipsFeed" :key="tip.id" cols="12">
        <Tip :tx-id="tip.id" :from="tip.from" :amount="tip.amount" />
      </v-col>
    </v-row>
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

  //   const nextCursor = ''
  //   const tips: LegacyTip[] = [
  //   { id: 'MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y',
  //     amount: '0.1000',
  //     from: 'god',
  //     to: props.address,
  //     timestamp: 1697669931
  //   },
  //   { id: 'MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y',
  //     amount: '0.1000',
  //     from: 'silly billy',
  //     to: props.address,
  //     timestamp: 1697669932
  //   },
  //   { id: 'MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y',
  //     amount: '0.1000',
  //     from: 'alfred hitchcock',
  //     to: props.address,
  //     timestamp: 1697669933
  //   },
  //   { id: 'MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y',
  //     amount: '0.1000',
  //     from: '$lug',
  //     to: props.address,
  //     timestamp: 1697669934
  //   },
  //   { id: 'MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y',
  //     amount: '0.1000',
  //     from: 'mmmmmmmmmmmmmmmmmmmmmmmm',
  //     to: props.address,
  //     timestamp: 1697669935
  //   },
  //   { id: 'MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y',
  //     amount: '0.1000',
  //     from: '@%)(*@&#%)',
  //     to: props.address,
  //     timestamp: 1697669936
  //   },
  //   { id: 'MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y',
  //     amount: '0.1000',
  //     from: '',
  //     to: props.address,
  //     timestamp: 1697669937
  //   },
  //   { id: 'MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y',
  //     amount: '0.1000',
  //     from: ' ',
  //     to: props.address,
  //     timestamp: 1697669938
  //   },
  //   { id: 'MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y',
  //     amount: '0.1000',
  //     from: 'a',
  //     to: props.address,
  //     timestamp: 1697669939
  //   },
  //   { id: 'MlV6DeOtRmakDOf6vgOBlif795tcWimgyPsYYNQ8q1Y',
  //     amount: '0.1000',
  //     from: 'me',
  //     to: props.address,
  //     timestamp: 1697669940
  //   },
  // ]

  tipsFeed.value.push(...tips)
  cursor.value = nextCursor

  if (!nextCursor) {
    hasReachedEnd.value = true
  }
})

await onLoadMore()
</script>
