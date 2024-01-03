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
                      {{ props.id }}
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
                        error
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
                        {{
                          isCuration ? data?.title : data?.publication?.title
                        }}
                      </a>
                      <br>
                      <a class="text-white font-italic">
                        <ResolveUsername :address="itemAddress" no-link />
                      </a>
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
import { VImg } from 'vuetify/lib/components/index.mjs'
import {
  type CollaborativeWhitelistCurationState
} from '@artbycity/sdk/dist/web/curations'

const img = ref<VImg>()

const hasError = computed(() => {
  if (pending.value) { return false }

  return data.value === null
})

const props = defineProps<{ id: string }>()
const abc = useArtByCity()
const { protocol, host, port } = abc.arweave.api.config
const gatewayBase = `${protocol}://${host}:${port}`
const isCuration = ref<boolean>(false)

const { data, pending } = useLazyAsyncData(props.id, async () => {
  const checkId = abc.curations.get(props.id)
  
  if (checkId) {
    if (
      checkId
    // .tags
    // .find(o => o.name === 'Entity-Type')?
    // .value === 'curation'
    ) {
      
      isCuration.value = true
      
      try {
        const curation = abc
          .curations
          .get<CollaborativeWhitelistCurationState>(props.id)

        const { cachedValue: { state } } = await curation.contract.readState()
        const curatedPublications = []
        
        let count = 0
        for (let i of state.items) {
          curatedPublications.push(
            await abc.legacy.fetchPublication(i)
          )
          count += 1
          if (count === 3){ break }
        }

        return {
          contract: curation,
          title: state.title,
          desc: state.metadata.description as string,
          state,
          curatedPublications,
          username: await abc.usernames.resolveUsernameFromAddress(state.owner)
        }
      } catch (error) {
        console.error('Error fetching curation', props.id, error)
      }
    } else {
      const publication = await abc.legacy.fetchPublication(props.id)
      const username = 
        await abc.usernames.resolveUsernameFromAddress(publication.creator)

      return { publication, username }
    }
  }

  return null
})

const src = computed(() => {
  if (!data.value) { return '' }

  if (data.value.publication) {
    return data.value.publication.image.preview.startsWith('data:image')
      ? data.value.publication.image.preview
      : `${gatewayBase}/${data.value.publication.image.preview}`
  } else if (data.value.curatedPublications) {
    return data.value.curatedPublications[0]?.image.preview
      .startsWith('data:image')
      ? data.value.curatedPublications[0]?.image.preview
      : `${gatewayBase}/${data.value.curatedPublications[0]?.image.preview}`
  }
  
})

const isPlayable = computed(() => {
  if (!data.value) { return false }

  if (!isCuration.value) {
    return data.value.publication?.image.animated
      || !!data.value.publication?.audio
      || !!data.value.publication?.model
  }
})

const to = computed(() => {
  if (!isCuration.value) {
    return `/${data.value?.username || data.value?.publication?.creator}/${
      data.value?.publication?.slug || data.value?.publication?.id
    }`
  } else {
    return `/curations/${data.value?.contract?.contractId}`
  }
})

const itemAddress = computed(() => {
  return isCuration.value
    ? data?.value?.state?.owner
    : data?.value?.publication?.creator
})
</script>
