<template>
  <v-btn
    color="primary"
    v-bind="props"
    prepend-icon="mdi-plus"
    variant="outlined"
    elevation="2"
  >
    Curate
    <v-menu
      location="bottom"
      :close-on-content-click="false"
      activator="parent"
    >
      <v-list density="compact" height="200px">
        <template v-if="data">
          <template v-for="curation in data.curations" :key="curation.id">
            <CurateMenuItem
              :publication-id="props.publicationId"
              :curation="curation"
            />
          </template>
        </template>
      </v-list>
    </v-menu>
  </v-btn>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const props = defineProps<{ publicationId: string }>()
const abc = useArtByCity()
const auth = useAuthStore()

const {
  data
} = useLazyAsyncData(`curations-from-${auth.address}`, async () => {
  if (!auth.address) { return { curations: [] } }

  return await abc.curations.createdBy(auth.address)
})
</script>
