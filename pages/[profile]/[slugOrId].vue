<template>
  <v-card>
    <v-img :src="src" aspect-ratio="1">
      <template #placeholder>
        <div class="d-flex align-center justify-center fill-height">
          <v-container v-if="!hasError" fluid class="fill-height">
            <v-row class="ma-0">
              <v-col
                cols="12"
                class="text-h5 font-weight-md-thin scale-text text-center"
              >
                {{ slugOrId }}
              </v-col>
              <v-col cols="12">
                <v-progress-linear
                  indeterminate
                  color="artby-gray"
                  background-color="transparent"
                  height="1"
                  bottom
                />
              </v-col>
            </v-row>
          </v-container>
          <v-container v-else fluid class="fill-height">
            <v-row class="ma-0">
              <v-col cols="12">
                <div class="text-h3 scale-text text-center">
                  404 image not found
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </template>
      <template #error>
        <v-container fluid class="fill-height">
          <v-row class="ma-0">
            <v-col cols="12">
              <div class="text-h3 scale-text text-center">
                404 image not found
              </div>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-img>
  </v-card>
</template>

<script setup lang="ts">
const abc = useArtByCity()
const route = useRoute()
const { protocol, host, port } = abc.arweave.api.config
const gatewayBase = `${protocol}://${host}:${port}`
const slugOrId = route.params['slugOrId'] as string

const { data, pending } = useLazyAsyncData(slugOrId, async () => {
  const publication = await abc.legacy.fetchPublication(slugOrId)

  console.log('pub', route.path, publication)

  return publication
})

const hasError = computed(() => {
  if (pending.value) { return false }

  return data.value === null
})

const src = computed(() => {
  if (data.value) {
    if ('images' in data.value && data.value.images.length > 0) {
      /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
      return `${gatewayBase}/${data.value.images[0].preview4k}`
    }
  }

  return ''
})
</script>
