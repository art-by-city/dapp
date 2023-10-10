<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="4">
        <h1>My Curations</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-table>
          <thead>
            <tr>
              <td colspan="4">
                <v-btn
                  color="black"
                  variant="text"
                  to="/curations/create"
                  elevation="2"
                >Create New</v-btn>
              </td>
            </tr>
            <tr>
              <td>ID</td>
              <td>Title</td>
              <td>Description</td>
              <td>Edit</td>
            </tr>
          </thead>
          <tbody v-if="curations">
            <tr v-for="curation in curations" :key="curation.id">
              <td>
                <nuxt-link :to="`/curations/${curation.id}`">
                  {{ curation.id }}
                </nuxt-link>
              </td>
              <td>{{ curation.title }}</td>
              <td>{{ curation.desc }}</td>
              <td>
                <v-btn
                  color="black"
                  variant="text"
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
  if (!auth.address) { return [] }

  const { curations } = await abc.curations.createdBy(auth.address)

  return curations.map(tx => {
    const title = tx.tags.find(tag => tag.name === 'Title')?.value || ''
    const desc = tx.tags.find(tag => tag.name === 'Description')?.value || ''

    return { id: tx.id, title, desc }
  })
})

const onEditClicked = debounce(async (curationId: string) => {
  const router = useRouter()
  router.push(`/curations/${curationId}/edit`)
})
</script>
