<template>
  <v-btn
    color="primary"
    v-bind="props"
    prepend-icon="mdi-plus"
    variant="outlined"
    elevation="2"
  >
    {{ label }}
    <v-menu
      location="bottom"
      :close-on-content-click="false"
      activator="parent"
    >
      <v-list
        density="compact"
        max-height="200px"
        variant="outlined"
        class="py-0"
      >
        <template v-if="pending">
          <v-progress-circular />
        </template>
        <template v-else-if="data">
          <template v-if="data.curations.length > 0">
            <template v-for="curation in data.curations" :key="curation.id">
              <CurateMenuItem
                :item="props.item"
                :curation="curation"
              />
            </template>
          </template>
          <template v-else>
            <p class="pa-2 text-caption">
              You don't have any curations yet!
              <nuxt-link class="text-primary" to="/curations/create">
                Create one
              </nuxt-link>
            </p>
          </template>
        </template>
      </v-list>
    </v-menu>
  </v-btn>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const props = withDefaults(
  defineProps<{ item: string, mode?: string, label?: string }>(),
  { label: 'Curate', mode: '' }
)
const abc = useArtByCity()
const auth = useAuthStore()

const {
  data,
  pending
} = useLazyAsyncData(`curations-from-${auth.address}`, async () => {
  if (!auth.address) { return { curations: [] } }

  return await abc.curations.createdBy(auth.address)
})
</script>
