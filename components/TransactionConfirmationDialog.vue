<template>
  <v-dialog v-model="props.open" width="auto">
    <v-card>
      <v-card-title>Confirm Transaction</v-card-title>
      <v-card-text v-if="props.tx">
        <v-table density="compact">
          <tbody>
            <tr>
              <td>Size</td>
              <td align="right"><code>{{ dataSizeInMB }} MB</code></td>
            </tr>
            <tr>
              <td>Cost</td>
              <td align="right"><code>{{ costInAR }} AR</code></td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
      <v-card-text v-else>
        No transaction!
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="error"
          variant="outlined"
          elevation="2"
          density="compact"
          @click="onCancelClicked"
        >CANCEL</v-btn>
        <v-spacer />
        <v-btn
          color="primary"
          variant="outlined"
          elevation="2"
          density="compact"
          @click="onConfirmClicked"
          :disabled="!props.tx"
        >{{ props.confirmText || 'CONFIRM' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import Arweave from 'arweave'
import Transaction from 'arweave/web/lib/transaction'

const config = useRuntimeConfig()
const arweave = Arweave.init(config.public.arweave)
const props = defineProps<{
  open?: boolean,
  confirmText?: string,
  tx?: Transaction
}>()
const emits = defineEmits(['cancel', 'confirm'])
const onCancelClicked = () => emits('cancel')
const onConfirmClicked = () => emits('confirm')
const dataSizeInMB = computed(() => {
  if (!props.tx) { return }
  return (Number.parseInt(props.tx.data_size) / 1048576).toPrecision(5)
})
const costInAR = computed(() => {
  if (!props.tx) { return }
  
  return arweave.ar.winstonToAr(props.tx.reward, { decimals: 4 })
})
</script>
