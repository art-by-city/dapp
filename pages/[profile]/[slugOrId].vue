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

  <v-container>
    <v-row>
      <v-col>
        <v-divider color="black" />
      </v-col>
    </v-row>
  </v-container>

  <v-container v-if="artwork" fluid>
    <v-row dense>
      <v-col cols="8" md="9" lg="10" class="pa-0">
        <span class="text-h4 text-md-h2 text-sm-h3 font-weight-medium">
          {{ artwork.title }}
        </span>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col
        cols="12"
        class="
          pa-0 text-truncate text-decoration-underline font-italic black--text
        "
      >
        <a :href="`/${ artwork.creator }`">{{ artwork.creator }}</a>
      </v-col>
    </v-row>
    <v-row v-if="artwork.description" dense>
      <v-col cols="12">
        {{ artwork.description }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-tabs v-model="tab" color="black">
          <v-tab>Metadata</v-tab>
        </v-tabs>
        <v-table>
          <tbody>
            <tr v-if="artwork.year">
              <td class="font-weight-bold">
                Year
              </td>
              <td>
                {{ artwork.year }}
              </td>
            </tr>
            <tr v-if="artwork.medium">
              <td class="font-weight-bold">
                Medium
              </td>
              <td>
                {{ artwork.medium }}
              </td>
            </tr>
            <tr v-if="artwork.genre">
              <td class="font-weight-bold">
                Genre
              </td>
              <td>
                {{ artwork.genre }}
              </td>
            </tr>
            <tr v-if="artwork.city">
              <td class="font-weight-bold">
                City
              </td>
              <td class="text-uppercase">
                {{ artwork.city }}
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold">
                Published
              </td>
              <td>
                {{ (new Date(artwork.published)).toLocaleDateString() }}
              </td>
            </tr>
            <tr>
              <td class="font-weight-bold">
                Transaction
              </td>
              <td>
                <a
                  :href="`https://viewblock.io/arweave/tx/${artwork.id}`"
                  target="_blank"
                  class="black--text"
                >
                  {{ artwork.id }}
                  <v-icon
                    small
                    dense
                    class="adjust-icon text-decoration-none"
                  >
                    mdi-open-in-new
                  </v-icon>
                </a>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const abc = useArtByCity()
const route = useRoute()
const { protocol, host, port } = abc.arweave.api.config
const gatewayBase = `${protocol}://${host}:${port}`
const slugOrId = route.params['slugOrId'] as string
const tab = ref<null | string>(null)

const { data: artwork, pending } = useLazyAsyncData(slugOrId, async () => {
  const publication = await abc.legacy.fetchPublication(slugOrId)

  console.log('pub', route.path, publication)

  return publication
})

const hasError = computed(() => {
  if (pending.value) { return false }

  return artwork.value === null
})

const src = computed(() => {
  if (artwork.value) {
    if ('images' in artwork.value && artwork.value.images.length > 0) {
      /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
      return `${gatewayBase}/${artwork.value.images[0].preview4k}`
    }
  }

  return ''
})
</script>
