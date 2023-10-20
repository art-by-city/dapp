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
            :loading="pending"
            @click="onCurationActionClicked"
          >
            <v-icon size="x-small">{{ curationActionIcon(isHovering) }}</v-icon>
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

const props = defineProps<{
  publicationId: string,
  curation: ArdbTransaction
}>()

const abc = useArtByCity()
const hasError = ref(false)
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
  const title = props.curation.tags.find(tag => tag.name === 'Title')?.value

  return title || props.curation.id
})

const isInCuration = computed(() => {
  if (!state.value) { return false }

  return state.value.items.includes(props.publicationId)
})

const curationActionIcon = (isHovering?: boolean) => {
  return isInCuration.value
    ? isHovering
      ? 'mdi-minus' 
      : 'mdi-check'
    : 'mdi-plus'
}

const onCurationActionClicked = debounce(async () => {
  const addOrRemove = isInCuration.value ? 'removeItem' : 'addItem'

  try {
    const curation = abc
    .curations
    .get<CurationContractStates>(props.curation.id)
    await curation.connect('use_wallet').writeInteraction({
      function: addOrRemove,
      item: props.publicationId
    })
    await refresh()
  } catch (error) {
    hasError.value = true
    console.error(
      `Error adding ${props.publicationId} to curation ${props.curation.id}`
    )
  }
})
</script>
