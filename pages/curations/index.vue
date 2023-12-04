<template>
  <v-container class="px-0 px-sm-4">
    <v-row>
      <v-col cols="auto" sm="9" class="pb-1 pb-sm-3">
        <h1>My Curations</h1>
      </v-col>
      <v-col cols="auto" sm="3">
        <v-btn
          color="primary"
          variant="outlined"
          to="/curations/create"
          elevation="2"
          density="compact"
        >
          Create New
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto" sm="12" class="px-0 px-sm-4">
        <v-table density="compact">
          <thead>
            <tr class="font-weight-bold">
              <td>Title</td>
              <td>Curation ID</td>
              <td>Edit</td>
            </tr>
          </thead>
          <tbody v-if="curations">
            <tr v-for="curation in curations" :key="curation.id">
              <td>
                <nuxt-link
                  class="text-primary"
                  :to="`/curations/${curation.id}`"
                >
                  {{ curation.title }}
                </nuxt-link>
              </td>
              <td>
                <nuxt-link
                  class="text-primary"
                  :to="`/curations/${curation.id}`"
                >
                  <code>{{ curation.id }}</code>
                </nuxt-link>
              </td>
              <td>
                <v-btn
                  color="primary"
                  variant="outlined"
                  elevation="2"
                  density="compact"
                  @click="onEditClicked(curation.id)"
                >
                  Edit
                </v-btn>
              </td>
            </tr>

            <tr v-if="curations.length < 1">
              <td colspan="4">
                You don't have any curations yet!
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const abc = useArtByCity()
const auth = useAuthStore()

const { data: curations } = useLazyAsyncData('my-curations', async () => {
  if (!auth.address) { return [] }
  
  try {
    const { curations } = await abc.curations.createdBy(auth.address)

    console.log('curations', curations)

    return curations.map(tx => {
      const title = tx.tags.find(tag => tag.name === 'Title')?.value || ''
      const desc = tx.tags.find(tag => tag.name === 'Description')?.value || ''

      return { id: tx.id, title, desc }
    })
  } catch (error) {
    console.error('error fetching curations', error)
  }
})

const onEditClicked = debounce(async (curationId: string) => {
  const router = useRouter()
  await router.push(`/curations/${curationId}/edit`)
})
</script>
