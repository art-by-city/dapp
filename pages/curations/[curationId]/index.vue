<template>
  <v-container v-if="curation">
    <v-row>
      <v-col cols="9">
        <span class="text-h3 text-md-h2 text-sm-h3 font-weight-medium">
          {{ curation.title }}
        </span>
      </v-col>
      <v-col cols="3">
        <v-btn
          variant="outlined"
          color="primary"
          elevation="2"
          density="compact"
          :to="`/curations/${curationId}/edit`"
        >
          Edit
        </v-btn>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <nuxt-link
          class="font-italic text-primary"
          :to="`/${curation.state.owner}`"
        >
          <code>{{ curation.state.owner }}</code>
        </nuxt-link>
      </v-col>
    </v-row>
    <v-row v-if="curation.desc" dense>
      <v-col cols="12">
        <span>{{ curation.desc }}</span>
      </v-col>
    </v-row>
    <v-row class="my-2">
      <v-col cols="12">
        <v-tabs v-model="tab">
          <v-tab value="items">
            Items
          </v-tab>
          <v-tab value="curators">
            Curators
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-window v-model="tab">
      <v-window-item value="items">
        <v-row v-if="curation.state.items.length > 0">
          <v-col v-for="id in curation.state.items" :key="id" cols="4">
            <FeedItemCard :id="id" />
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <h3 class="ma-2">
              This curation is empty!
            </h3>
          </v-col>
        </v-row>
      </v-window-item>
      <v-window-item value="curators">
        <v-row>
          <v-col cols="2" class="text-truncate">
            <nuxt-link class="text-primary" :to="`/${curation.state.owner}`">
              <Avatar :address="curation.state.owner" />
              <br>
              <code>{{ curation.state.owner }}</code>
            </nuxt-link>
          </v-col>
          <v-col
            v-for="address in curation.state.roles.curator"
            :key="address"
            cols="2"
            class="text-truncate text-center"
          >
            <nuxt-link class="text-primary" :to="`/${address}`">
              <Avatar :address="address" />
              <br>
              <code>{{ address }}</code>
            </nuxt-link>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
  </v-container>
  <template v-else-if="pending">
    <h1>{{ curationId }}</h1>
    <v-progress-linear indeterminate />
  </template>
  <template v-else>
    <h1>404 Curation not found :(</h1>
  </template>
</template>

<script setup lang="ts">
import {
  CollaborativeWhitelistCurationState
} from '@artbycity/sdk/dist/web/curation'
import Ardb from 'ardb'
import ArdbTransaction from 'ardb/lib/models/transaction'

const abc = useArtByCity()
const ardb = new Ardb(abc.arweave)
const route = useRoute()
const curationId = route.params.curationId as string
const tab = ref('items')

const {
  data: curation,
  pending
} = useLazyAsyncData(`curation-${curationId}`, async () => {
  try {
    const contract = abc
      .curations
      .get<CollaborativeWhitelistCurationState>(curationId)
    
    const txs = await ardb
      .search('transactions')
      .id(curationId)
      .find() as ArdbTransaction[]

    const title = txs[0].tags.find(tag => tag.name === 'Title')?.value
      || 'Untitled'
    const desc = txs[0].tags.find(tag => tag.name === 'Description')?.value
    const { cachedValue: { state } } = await contract.readState()

    return { contract, title, desc, state }
  } catch (error) {
    console.error('Error fetching curation', curationId, error)
  }
})
</script>