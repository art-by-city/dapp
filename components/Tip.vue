<template>
  <v-container flat class="pa-0">
    <v-row dense>
      <v-col cols="auto" class="text-truncate">
        <code>
          <a
            :href="`/${ props.from }`"
            target="_blank"
            class="text-primary"
          >
            {{ props.from }}
          </a>
        </code>
      </v-col>  
      <v-col cols="auto">
        <span>tipped </span>
      </v-col>
      <v-col cols="auto" class="text-right">
        <span>{{ amount }}</span><strong> AR</strong>
      </v-col>
      <v-col cols="auto" class="text-subtitle-2">
        -
        <a
          :href="`https://viewblock.io/arweave/tx/${props.txId}`"
          target="_blank"
          class="text-primary"
        >
          Transaction
        </a>
        <v-icon class="text-subtitle-1">
          mdi-open-in-new
        </v-icon>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const props = defineProps<{ txId: string, from: string, amount: string }>()

const amount = computed(() => {
  const parsed = parseInt(props.amount)
  if (Number.isNaN(parsed)) { return '' }

  const amountAR = parsed / 1e12

  return new Intl
    .NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' })
    .format(amountAR)
})
</script>
