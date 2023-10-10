<template>
  <div>
    <v-hover>
      <template #default="{ isHovering, props: hoverProps }">
        <v-card v-bind="hoverProps" :to="props.to" class="feed-item-card">
          <v-img ref="img" :src="src" aspect-ratio="1">
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
                <div v-if="isPlayable" class="play-icon ml-n6">
                  <v-icon>{{ 'mdi-play' }}</v-icon>
                </div>
                <v-row align="end" class="fill-height pa-1 pl-4">
                  <v-col>
                    <a class="text-white font-weight-bold">
                      {{ data?.title }}
                    </a>
                    <br>
                    <a class="text-white font-italic">
                      {{ data?.creator }} 
                    </a>
                  </v-col>
                </v-row>
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

const { data, pending } = useLazyAsyncData(props.id, async () => {
  const publication = await abc.legacy.fetchPublication(props.id)

  console.log('pub', props.id, publication)

  return publication
})

const src = computed(() => {
  if (data.value) {
    if ('images' in data.value && data.value.images.length > 0) {
      return `${gatewayBase}/${data.value.images[0].preview}`
    }
  }

  return ''
})

const isPlayable = computed(() => {
  if (data.value) {
    if ('images' in data.value) {
      return !!data.value.images[0].animated
    } else if (
      'audio' in data.value || 'model' in data.value
    ) { return true }
  }

  return false
})

</script>
