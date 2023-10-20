<template>
  <v-container>
    <v-row>
      <v-col cols="9">
        <h1>My Curations</h1>
      </v-col>
      <v-col cols="3">
        <v-btn
          color="primary"
          variant="outlined"
          to="/curations/create"
          elevation="2"
        >Create New</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-table>
          <thead>
            <tr class="font-weight-bold">
              <td>ID</td>
              <td>Title</td>
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
                  <code>{{ curation.id }}</code>
                </nuxt-link>
              </td>
              <td>{{ curation.title }}</td>
              <td>
                <v-btn
                  color="primary"
                  variant="outlined"
                  elevation="2"
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

const {
  data: curations,
  pending
} = useLazyAsyncData('my-curations', async () => {
  console.log('curations1', 1)
  if (!auth.address) { return [] }
  console.log('curations2', 2)
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
  router.push(`/curations/${curationId}/edit`)
})
</script>
