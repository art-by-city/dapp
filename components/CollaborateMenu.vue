<template>
  <v-btn
    elevation="2"
    variant="outlined"
    color="primary"
    density="compact"
    size="small"
  >
    Invite to Curate
    <v-menu
      location="bottom"
      :close-on-content-click="false"
      activator="parent"
    >
      <v-list density="compact" max-height="200px">
        <template v-if="data">
          <template v-for="curation in data.curations" :key="curation.id">
            <CollaborateMenuItem
              :address="props.address"
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

const props = defineProps<{ address: string }>()
const abc = useArtByCity()
const auth = useAuthStore()

const {
  data
} = useLazyAsyncData(`curations-from-${auth.address}`, async () => {
  if (!auth.address) { return { curations: [] } }

  return await abc.curations.createdBy(auth.address)
})
</script>
