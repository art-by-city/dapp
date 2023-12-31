<template>
  <v-container v-if="curation">
    <v-row>
      <v-col cols="9">
        <h1>Edit Curation</h1>
      </v-col>
      <v-col cols="3">
        <v-btn
          color="primary"
          elevation="2"
          variant="outlined"
          density="compact"
          :to="`/curations/${curationId}`"
        >
          View
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-table>
          <tbody>
            <tr>
              <td class="font-weight-bold">
                ID
              </td>
              <td>
                {{ curationId }}
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold">
                Title
              </td>
              <td>
                {{ curation.state.title }}
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold">
                Owner
              </td>
              <td>
                <nuxt-link
                  class="text-primary"
                  :to="`/${curation.state.owner}`"
                >
                  <code>{{ curation.state.owner }}</code>
                </nuxt-link>
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold">
                Description
              </td>
              <td>
                {{ curation.state.metadata.description }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-tabs v-model="tab">
          <v-tab value="items">
            Items
          </v-tab>
          <!-- <v-tab value="hidden">Hidden</v-tab>
          <v-tab value="whitelist">Whitelist</v-tab> -->
          <v-tab value="curators">
            Curators
          </v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item value="items">
            <v-table>
              <tbody>
                <template v-if="curation.state.items.length > 0">
                  <tr v-for="item in curation.state.items" :key="item">
                    <td style="width: 100px;">
                      <FeedItemCard :id="item" />
                    </td>
                    <td>
                      <code>{{ item }}</code>
                    </td>
                    <td>
                      <v-btn
                        color="primary"
                        elevation="2"
                        variant="outlined"
                        density="compact"
                        :loading="loading"
                        @click="removeItem(item)"
                      >
                        Remove
                      </v-btn>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <h3 class="ma-2">
                    Nothing curated yet!
                  </h3>
                </template>
              </tbody>
            </v-table>
          </v-window-item>
          <!-- <v-window-item value="hidden">
            <v-table>
              <thead></thead>
              <tbody></tbody>
            </v-table>
          </v-window-item>
          <v-window-item value="whitelist">
            <v-table>
              <thead></thead>
              <tbody></tbody>
            </v-table>
          </v-window-item> -->
          <v-window-item value="curators">
            <v-table>
              <tbody>
                <template v-if="curation.state.roles.curator.length > 0">
                  <tr
                    v-for="address in curation.state.roles.curator"
                    :key="address"
                  >
                    <td style="width: 100px;" class="py-2">
                      <Avatar :address="address" />
                    </td>
                    <td>
                      <nuxt-link class="text-primary" :to="`/${address}`">
                        <code>{{ address }}</code>
                      </nuxt-link>
                    </td>
                    <td>
                      <v-btn
                        color="primary"
                        elevation="2"
                        variant="outlined"
                        density="compact"
                        :loading="loading"
                        @click="removeCurator(address)"
                      >
                        Remove
                      </v-btn>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <h3 class="ma-2">
                    No collaborators yet!
                  </h3>
                </template>
              </tbody>
            </v-table>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
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
} from '@artbycity/sdk/dist/web/curations'
import { InjectedArweaveSigner } from 'warp-contracts-plugin-deploy'

const abc = useArtByCity()
const route = useRoute()
const curationId = route.params.curationId as string
const tab = ref('items')
const loading = ref(false)

const {
  data: curation,
  pending,
  refresh
} = useLazyAsyncData(`curation-${curationId}`, async () => {
  try {
    const curation = abc
      .curations
      .get<CollaborativeWhitelistCurationState>(curationId)

    const { cachedValue: { state } } = await curation.contract.readState()
    const title = state.title
      || 'Untitled'
    const desc = 'description' in state.metadata
      ? state.metadata.description as string
      : ''

    return { contract: curation.contract, title, desc, state }
  } catch (error) {
    console.error('Error fetching curation', curationId, error)
  }
})

const removeItem = debounce(async (item: string) => {
  if (!curation.value) { return }
  if (!item || item.length !== 43) { return }

  loading.value = true

  try {
    const signer = new InjectedArweaveSigner(window.arweaveWallet)
    await signer.setPublicKey()

    const res = await curation.value
      .contract
      /* @ts-expect-error warp spaghetti */
      .connect(signer)
      .writeInteraction({
        function: 'removeItem',
        item
      })

    console.log('removeItem res', res)

    await refresh()
  } catch (error) {
    console.error('Error removing item from curation contract', error)
  }
  
  loading.value = false
})

const removeCurator = debounce(async (address: string) => {
  if (!curation.value) { return }
  if (!address || address.length !== 43) { return }

  loading.value = true

  try {
    const signer = new InjectedArweaveSigner(window.arweaveWallet)
    await signer.setPublicKey()

    const res = await curation.value
      .contract
      /* @ts-expect-error warp spaghetti */
      .connect(signer)
      .writeInteraction({
        function: 'removeCurator',
        address
      })

    console.log('removeCurator res', res)

    await refresh()
  } catch (error) {
    console.error('Error removing curator from curation contract', error)
  }

  loading.value = false
})
</script>
