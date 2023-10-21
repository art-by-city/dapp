<template>
  <v-list-item v-if="!pending && !hasError" :disabled="pending">
    <template #prepend>
      <v-list-item-action start>
        <v-hover #="{ isHovering, props }">
          <v-btn
            v-bind="props"
            icon
            variant="plain"
            density="compact"
            :loading="loading"
            @click="onCurationActionClicked"
          >
            <v-icon size="x-small">
              {{ curationActionIcon(isHovering) }}
            </v-icon>
          </v-btn>
        </v-hover>
      </v-list-item-action>
    </template>

    <v-list-item-title>
      {{ curationTitle }}
    </v-list-item-title>

    <template #append>
      <v-list-item-action end>
        <v-btn
          icon
          variant="plain"
          density="compact"
          :to="`/curations/${props.curation.id}`"
        >
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-list-item-action>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { CurationContractStates } from '@artbycity/sdk/dist/web/curation'
import ArdbTransaction from 'ardb/lib/models/transaction'
import { InjectedArweaveSigner } from 'warp-contracts-plugin-deploy'

const props = defineProps<{
  item: string,
  curation: ArdbTransaction
}>()

const abc = useArtByCity()
const hasError = ref(false)
const loading = ref(false)
const {
  data: state,
  pending,
  refresh
} = useLazyAsyncData(`curation-state-${props.curation.id}`, async () => {
  try {
    const contract = abc
      .curations
      .get<CurationContractStates>(props.curation.id)
    const { cachedValue: { state } } = await contract.readState()

    return state
  } catch (error) {
    hasError.value = true
    console.error(
      `Error reading curation state for ${props.curation.id}`,
      error
    )
  }
})

const curationTitle = computed(() => {
  if (state.value) {
    return state.value.title
  }

  const title = props.curation.tags.find(tag => tag.name === 'Title')?.value

  return title || props.curation.id
})

const isInCuration = computed(() => {
  if (!state.value) { return false }

  return state.value.items.includes(props.item)
})

const curationActionIcon = (isHovering?: boolean) => {
  return isInCuration.value
    ? isHovering
      ? 'mdi-minus' 
      : 'mdi-check'
    : 'mdi-plus'
}

const onCurationActionClicked = debounce(async () => {
  loading.value = true
  const addOrRemove = isInCuration.value ? 'removeItem' : 'addItem'

  try {
    const curation = abc
      .curations
      .get<CurationContractStates>(props.curation.id)
    const signer = new InjectedArweaveSigner(window.arweaveWallet)
    await signer.setPublicKey()
    /* @ts-expect-error warp spaghetti */
    await curation.connect(signer).writeInteraction({
      function: addOrRemove,
      item: props.item
    })
    await refresh()
  } catch (error) {
    hasError.value = true
    console.error(
      `Error ${addOrRemove} ${props.item} for curation ${props.curation.id}`,
      error
    )
  }

  loading.value = false
})
</script>
