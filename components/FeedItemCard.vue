<template>
  <div>
    <v-hover>
      <template #default="{ isHovering, props: hoverProps }">
        <v-card v-bind="hoverProps" class="feed-item-card">
          <v-img ref="img" :src="src" aspect-ratio="1" cover>
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-container v-if="!hasError" fluid class="fill-height">
                  <v-row class="ma-0">
                    <v-col
                      cols="12"
                      class="text-h5 font-weight-md-thin scale-text text-center"
                    >
                      {{ id }}
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
                :model-value="isHovering && !pending && !hasError"
                scrim="#000000"
                contained
                width="100%"
                height="100%"
              >
                <v-card
                  height="100%"
                  flat
                  color="transparent"
                  :ripple="false"
                  :to="to"
                >
                  <div v-if="isPlayable" class="play-icon ml-n6">
                    <v-icon>{{ 'mdi-play' }}</v-icon>
                  </div>
                  <v-row align="end" class="fill-height pa-1 pl-4">
                    <v-col>
                      <a class="text-white font-weight-bold">
                        {{ artwork?.title }}
                      </a>
                      <br>
                      <a class="text-white font-italic">
                        {{ primaryName }} 
                      </a>
                      <ResolveUsername :address="artwork ? artwork.creator : ''" />
                    </v-col>
                  </v-row>
                </v-card>
              </v-overlay>
            </template>
          </v-img>
        </v-card>
      </template>
    </v-hover>
  </div>
</template>


<style scoped>
.feed-item-card {
  width: 100%;
  cursor: pointer;
}

.play-icon {
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>


<script setup lang="ts">
import { RouteLocationRaw } from '.nuxt/vue-router'
import { VImg } from 'vuetify/lib/components/index.mjs'

const img = ref<VImg>()

const hasError = computed(() => {
  if (pending.value) { return false }

  return data.value === null
})

const props = defineProps<{ id: string, to?: RouteLocationRaw }>()
const abc = useArtByCity()
const { protocol, host, port } = abc.arweave.api.config
const gatewayBase = `${protocol}://${host}:${port}`

const { data: artwork, pending } = useLazyAsyncData(props.id, async () => {
  return await abc.legacy.fetchPublication(props.id)
})

const src = computed(() => {
  if (!data.value) { return '' }

  return data.value.publication.image.preview.startsWith('data:image')
    ? data.value.publication.image.preview
    : `${gatewayBase}/${data.value.publication.image.preview}`
})

const isPlayable = computed(() => {
  if (!data.value) { return false }

  return data.value.publication.image.animated ||
    !!data.value.publication.audio || !!data.value.publication.model
})

const to = computed(() => {
  return `/${
    artwork.value?.username || data.value?.publication.creator
  }/${artwork.value?.slug || artwork.value?.id}` || props.to
})
</script>
