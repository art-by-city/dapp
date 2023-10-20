<template>
  <v-container>
    <v-row v-if="!hasClickedOnOverlay" justify="center">
      <v-col>
        <v-img
          :src="src"
          aspect-ratio="1"
          class="publication-image"
          max-height="75vh"
          max-width="75vw"
          @click="onImageClicked"
        >
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
          <template #default>
            <v-overlay
              :model-value="isPlayable && !pending && !hasError"
              scrim="#000000"
              persistent
              contained
              :close-on-back="false"
              width="100%"
              height="100%"
              @click.stop="onOverlayClicked"
            >
              <div class="play-icon ml-n6">
                <v-icon color="white">
                  {{ is3DModel ? 'mdi-rotate-3d' : 'mdi-play' }}
                </v-icon>
              </div>
            </v-overlay>
          </template>
        </v-img>
      </v-col>
    </v-row>
    <v-row v-else justify="center">
      <v-col cols="auto" class="model-viewer-container pa-0">
        <ThreeDModel :src="modelSrc" />
      </v-col>
    </v-row>
    <v-row v-if="audioSrc">
      <v-col>
        <div class="audio-container">
          <audio controls :src="audioSrc" controlsList="nodownload" />
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-divider color="black" class="ma-0 pa-0" />
    </v-row>
    <template v-if="artwork">
      <v-row>
        <v-col cols="8" md="9" lg="10" class="pa-0">
          <span class="text-h3 text-md-h2 text-sm-h3 font-weight-medium">
            {{ artwork.title }}
          </span>
        </v-col>
        <v-col cols="4" md="3" lg="2">
          <CurateMenu :publication-id="artwork.id" />
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          class="
            pa-0
            text-decoration-none
            text-truncate
          "
        >
          <a
            class="
              text-decoration-underline
              font-italic
              text-black
            "
            :href="`/${ artwork.creator }`"
          >
            {{ artwork.creator }}
          </a>
        </v-col>
      </v-row>
      <v-row v-if="artwork.description" dense>
        <v-col cols="12">
          <p class="pt-5">
            {{ artwork.description }}
          </p>
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
                <td class="text-truncate">
                  <a
                    :href="`https://viewblock.io/arweave/tx/${artwork.id}`"
                    target="_blank"
                    class="text-black"
                  >
                    {{ artwork.id }}
                  </a>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<style scoped>
.play-icon {
  position: absolute;
  left: 50%;
  top: 50%;
}
.audio-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.model-viewer-container {
  min-width: 75vw;
  min-height: 75vh;
}
.publication-image {
  margin: 0 auto;
  cursor: pointer;
}
</style>

<script setup lang="ts">
const abc = useArtByCity()
const route = useRoute()
const { protocol, host, port } = abc.arweave.api.config
const gatewayBase = `${protocol}://${host}:${port}`
const slugOrId = route.params['slugOrId'] as string
const tab = ref<null | string>(null)

const { data: artwork, pending } = useLazyAsyncData(slugOrId, async () => {
  const publication = await abc.legacy.fetchPublicationBySlugOrId(slugOrId)

  return publication
})

const hasError = computed(() => {
  if (pending.value) { return false }

  return artwork.value === null
})

const src = computed(() => {
  if (!artwork.value) { return '' }

  return artwork.value.image.preview4k.startsWith('data:image')
    ? artwork.value.image.preview4k
    : `${gatewayBase}/${artwork.value.image.preview4k}`
})

const audioSrc = computed(() => {
  if (artwork.value) {
    if ('audio' in artwork.value) {
      /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
      return `${gatewayBase}/${artwork.value.audio}`
    }
  }

  return false
})

const modelSrc = computed(() => {
  if (artwork.value) {
    if ('model' in artwork.value) {
      /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
      return `${gatewayBase}/${artwork.value.model}`
    }
  }

  return ''
})

const isPlayable = computed(() => {
  if (artwork.value) {
    if (artwork.value.model) { return true }
    if ('images' in artwork.value) {
      return !!artwork.value.images[0].animated
    }
  }

  return false
})

const is3DModel = computed(() => {
  if (artwork.value) {
    if ('model' in artwork.value) { return true }
  }

  return false
})

const hasClickedOnOverlay = ref<boolean>(false)

const onOverlayClicked = debounce(() => {
  hasClickedOnOverlay.value = true
})

const onImageClicked = debounce(() => {
  if (!artwork.value) { return }

  if (!artwork.value.image.image.startsWith('data:image')) {
    return `${gatewayBase}/${artwork.value.image.image}`
  }

  const image = new Image()
  image.src = artwork.value.image.image
  const w = window.open('', '_blank')
  w?.document.write(image.outerHTML)
})
</script>
