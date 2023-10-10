<template>
  <v-container v-if="curation">
    <v-row>
      <v-col cols="12">
        <h1>{{ curation.title }}</h1>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <nuxt-link
          class="font-italic text-black text-decoration-underline"
          :to="`/${curation.state.owner}`"
        >
          {{ curation.state.owner }}
        </nuxt-link>
      </v-col>
    </v-row>
    <v-row v-if="curation.desc" dense>
      <v-col cols="12">
        <span>{{ curation.desc }}</span>
      </v-col>
    </v-row>
    <v-row v-if="curation.state.items.length > 0">
      <v-col v-for="id in curation.state.items" :key="id" cols="4">
        <FeedItemCard :id="id" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">This curation is empty!</v-col>
    </v-row>
  </v-container>
  <template v-else>
    <h1>404 Curation not found :(</h1>
  </template>
</template>

<script setup lang="ts">
const abc = useArtByCity()
const route = useRoute()
const curationId = route.params.curationId as string

const {
  data: curation
} = useLazyAsyncData(`curation-${curationId}`, async () => {
  const contract = abc.curations.get(curationId)
  const tx = await abc.arweave.transactions.get(curationId)
  const tags = tx.tags.map(tag => {
    return {
      name: tag.get('name', { decode: true, string: true }),
      value: tag.get('value', { decode: true, string: true })
    }
  })
  const title = tags.find(tag => tag.name === 'Title')?.value || 'Untitled'
  const desc = tags.find(tag => tag.name === 'Description')?.value
  const { cachedValue: { state } } = await contract.readState()

  return { contract, title, desc, state }
})
</script>
