<template>
  <v-container v-if="curation">
    <v-row>
      <v-col cols="12">
        <h1>Edit Curation {{ curationId }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn
          color="black"
          elevation="2"
          variant="text"
          :to="`/curations/${curationId}`"
        >View</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-tabs v-model="tab">
          <v-tab value="items">Items</v-tab>
          <v-tab value="hidden">Hidden</v-tab>
          <v-tab value="whitelist">Whitelist</v-tab>
          <v-tab value="curators">Curators</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item value="items">
            <v-table>
              <thead>
                <tr>
                  <th>
                    <v-text-field
                      v-model="itemToAdd"
                      placeholder="Arweave Transaction ID"
                      :rules="[rules.required, rules.length(43)]"
                      :disabled="pending"
                    ></v-text-field>
                  </th>
                  <th>
                    <v-btn
                      color="black"
                      elevation="2"
                      variant="text"
                      :disabled="pending"
                      @click="addItem"
                    >
                      Add Item
                    </v-btn>
                  </th>
                </tr>
                <tr>
                  <th>ID</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in curation.state.items" :key="item">
                  <td>{{ item }}</td>
                  <td>
                    <v-btn
                      color="red"
                      elevation="2"
                      variant="text"
                      :disabled="pending"
                      @click="removeItem(item)"
                    >
                      Remove
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-window-item>
          <v-window-item value="hidden">
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
          </v-window-item>
          <v-window-item value="curators">
            <v-table>
              <thead>
                <tr>
                  <th>
                    <v-text-field
                      v-model="curatorToAdd"
                      placeholder="Address"
                      :rules="[rules.required, rules.length(43)]"
                      :disabled="pending"
                    ></v-text-field>
                  </th>
                  <th>
                    <v-btn
                      color="black"
                      elevation="2"
                      variant="text"
                      :disabled="pending"
                      @click="addCurator"
                    >
                      Add Curator
                    </v-btn>
                  </th>
                </tr>
                <tr>
                  <th>Address</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="address in curation.state.roles.curator"
                  :key="address"
                >
                  <td>{{ address }}</td>
                  <td>
                    <v-btn
                      color="red"
                      elevation="2"
                      variant="text"
                      :disabled="pending"
                      @click="removeCurator(address)"
                    >
                      Remove
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
  <template v-else>
    <h1>404 Curation not found :(</h1>
  </template>
</template>

<script setup lang="ts">
import {
  CollaborativeWhitelistCurationState
} from '@artbycity/sdk/dist/web/curation'

const abc = useArtByCity()
const route = useRoute()
const curationId = route.params.curationId as string
const tab = ref('items')
const itemToAdd = ref('')
const curatorToAdd = ref('')
const pending = ref(false)

const rules = {
  required: (value: string) => !!value || 'Required',
  length: (length: number) => (value: string) => value.length === length || `Must be ${length} chars`
}

const {
  data: curation,
  refresh
} = useLazyAsyncData(`curation-${curationId}`, async () => {
  const contract = abc
    .curations
    .get<CollaborativeWhitelistCurationState>(curationId)
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

const addItem = debounce(async () => {
  if (!curation.value) { return }
  if (!itemToAdd.value || itemToAdd.value.length !== 43) { return }

  pending.value = true

  try {
    const res = await curation.value
      .contract
      .connect('use_wallet')
      .writeInteraction({
        function: 'addItem',
        item: itemToAdd.value
      })

    console.log('addItem res', res)

    await refresh()
    itemToAdd.value = ''
  } catch (error) {
    console.error('Error adding item to curation contract', error)
  }

  pending.value = false
})

const removeItem = debounce(async (item: string) => {
  if (!curation.value) { return }
  if (!item || item.length !== 43) { return }

  pending.value = true

  try {
    const res = await curation.value
      .contract
      .connect('use_wallet')
      .writeInteraction({
        function: 'removeItem',
        item
      })

    console.log('removeItem res', res)

    await refresh()
  } catch (error) {
    console.error('Error removing item from curation contract', error)
  }
  
  pending.value = false
})

const addCurator = debounce(async () => {
  if (!curation.value) { return }
  if (!curatorToAdd.value || curatorToAdd.value.length !== 43) { return }

  pending.value = true

  try {
    const res = await curation.value
      .contract
      .connect('use_wallet')
      .writeInteraction({
        function: 'addCurator',
        address: curatorToAdd.value
      })

    console.log('addCurator res', res)

    await refresh()
    curatorToAdd.value = ''
  } catch (error) {
    console.error('Error adding curator to curation contract', error)
  }

  pending.value = false
})

const removeCurator = debounce(async (address: string) => {
  if (!curation.value) { return }
  if (!address || address.length !== 43) { return }

  pending.value = true

  try {
    const res = await curation.value
      .contract
      .connect('use_wallet')
      .writeInteraction({
        function: 'removeCurator',
        address
      })

    console.log('removeCurator res', res)

    await refresh()
  } catch (error) {
    console.error('Error removing curator from curation contract', error)
  }

  pending.value = false
})
</script>
