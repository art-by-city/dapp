<template>
  <v-container
    class="pa-0 ma-0 portal-container no-select"
    :style="`background-color: ${backgroundColor}`"
  >
    <v-row class="ma-0 pa-0">
      <v-col cols="12" class="pa-0 ma-0">
        <template v-if="currentPublication?.model">
          <div class="model-container">
            <ThreeDModel
              :src="getSrcUrl(currentPublication?.model)"
              autoplay
              auto-rotate
              auto-rotate-delay="0"
              rotation-per-second="0.5rad"
              interaction-prompt="none"
            />
          </div>
        </template>
        <template v-else>
          <v-img
            :src="getSrcUrl(currentPublication?.image.image)"
            max-height="100vh"
          >
            <template #placeholder>
              <div class="placeholder">
                imageSrc
              </div>
            </template>
          </v-img>
        </template>
      </v-col>
    </v-row>
  </v-container>
  <v-card
    class="controls-container text-middle"
    color="transparent"
    elevation="0"
  >
    <v-container class="pa-0 ma-0">
      <v-row class="pa-0 ma-0">
        <v-col cols="12">
          <v-btn
            icon
            variant="outlined"
            density="compact"
            elevation="2"
            class="ma-1"
            @click="router.back()"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <v-btn
            icon
            variant="outlined"
            density="compact"
            elevation="2"
            class="ma-1"
            @click="controlsExpanded = !controlsExpanded"
          >
            <v-icon>
              mdi-chevron-double-{{ controlsExpanded ? 'down' : 'up' }}
            </v-icon>
          </v-btn>
          <v-btn
            icon
            variant="outlined"
            density="compact"
            elevation="2"
            class="ma-1"
            @click="toggleFullscreen"
          >
            <v-icon>
              mdi-fullscreen
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-if="controlsExpanded" class="pa-0 ma-0">
        <v-col cols="12">
          <v-btn
            icon
            variant="outlined"
            density="compact"
            elevation="2"
            class="ma-1"
            @click="prev"
          >
            <v-icon>mdi-skip-backward</v-icon>
          </v-btn>
          <v-btn
            icon
            variant="outlined"
            density="compact"
            elevation="2"
            class="ma-1"
            @click="toggleRotate"
          >
            <v-icon>{{ rotateEnabled ? 'mdi-pause' : 'mdi-play' }}</v-icon>
          </v-btn>
          <v-btn
            icon
            variant="outlined"
            density="compact"
            elevation="2"
            class="ma-1"
            @click="next"
          >
            <v-icon>mdi-skip-forward</v-icon>
          </v-btn>
        </v-col>

        <v-col cols="12">
          <v-slider
            v-model="rotateTimeout"
            min="1000"
            max="60000"
            step="1000"
            @end="onRotateTimeoutChanged"
          >
            <template #append>
              {{ rotateTimeout }}ms
            </template>
          </v-slider>
        </v-col>

        <v-col cols="12">
          <v-switch v-model="qrCodeEnabled">
            <template #label>
              <v-icon>mdi-qrcode</v-icon>
            </template>
          </v-switch>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="backgroundColor"  
            label="Background"
            variant="outlined"
            density="compact"
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="playlistId"  
            label="Playlist ID"
            variant="outlined"
            density="compact"
          >
            <template #append>
              <v-btn
                icon
                variant="outlined"
                density="compact"
                elevation="2"
                :loading="isPlaylistLoading"
                @click="loadPlaylist"
              >
                <v-icon>mdi-play</v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

      <v-row v-show="controlsExpanded" class="pa-0 ma-0 playlist-container">
        <template v-if="playlist">
          <v-col
            v-for="track in playlist.tracks"
            :key="track.id"
            cols="12"
          >
            <audio
              ref="player"
              controls
              :src="getSrcUrl(track.audio)"
              @play="onAudioPlay"
              @ended="onAudioEnded"
            />
          </v-col>
        </template>
      </v-row>
    </v-container>
  </v-card>
  <div class="pa-0 ma-0 qr-container" :class="{ qrCodeEnabled }">
    <QRCode v-if="qrCodeEnabled" :text="qrText" />
    <div class="timeout-container" :class="{ qrCodeEnabled }">
      <v-progress-circular
        :model-value="(timeLeft / rotateTimeout) * 100"
        class="timeout"
        bg-color="transparent"
        size="x-small"
        :color="qrCodeEnabled ? 'black' : '#888888'"
      />
    </div>
  </div>
</template>

<style scoped>
.playlist-container {
  overflow-y: scroll;
}

.portal-container {
  min-width: 100%;
  min-height: 100%;
  height: 100%;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  background-color: black;
}

.placeholder {
  width: 100%;
  height: 100%;
  background-color: black;
}

.controls-container {
  position: fixed;
  bottom: 0;
  left: 0;
  max-width: 25vw;
}
.qr-container {
  background-color: transparent;
  position: fixed;
  height: 24px;
  width: 24px;
  bottom: 0;
  right: 0;
}

.qr-container.qrCodeEnabled {
  background-color: white;
  height: 200px;
  width: 200px;
}

.timeout-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 24px;
  width: 24px;
}

.timeout-container.qrCodeEnabled {
  background-color: white;
}

.timeout {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  -webkit-transform: scale(-1, 1);
      -moz-transform: scale(-1, 1);
        -o-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.no-select {
  -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
      -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
}

.model-container {
  height: 100vh;
  aspect-ratio: 1;
  margin: auto;
}
</style>

<script setup lang="ts">
import _ from 'lodash'
import {
  CollaborativeWhitelistCurationState
} from '@artbycity/sdk/dist/web/curations'
import Curation from '@artbycity/sdk/dist/web/curations/curation'
import { LegacyPublicationManifest } from '@artbycity/sdk/dist/web/legacy'

definePageMeta({ layout: 'portals' })

const abc = useArtByCity()
const { protocol, host, port } = abc.arweave.api.config
const gatewayBase = `${protocol}://${host}:${port}`
const route = useRoute()
const router = useRouter()
const curationId = route.params.curationId as string
const currentImageIndex = ref(0)

const {
  data: curation,
  pending
} = useLazyAsyncData(`portal-${curationId}`, async () => {
  try {
    const curation = abc
      .curations
      .get<CollaborativeWhitelistCurationState>(curationId)

    const { cachedValue: { state } } = await curation.contract.readState()

    const items = _.shuffle(
      await Promise.all(
        state.items.map(async item => abc.legacy.fetchPublication(item))
      )
    )

    return {
      contract: curation,
      title: state.title,
      desc: state.metadata.description as string,
      state,
      items
    }
  } catch (error) {
    console.error('Error fetching curation', curationId, error)
  }
})

const qrCodeEnabled = ref(true)
const backgroundColor = ref('black')
const controlsExpanded = ref(false)
const rotateTimeout = ref(10000)
const rotateEnabled = ref(false)
const rotateInterval = ref(0)
const timeLeft = ref(rotateTimeout.value)
const playlistId = ref('h0OenCajxnT7BAmkCR7TRFTkKdBmklZZD4qtm2gbHD0')
const player = ref<HTMLAudioElement[]>()
const playlist = ref<{
  curation: Curation<CollaborativeWhitelistCurationState>,
  state: CollaborativeWhitelistCurationState,
  tracks: LegacyPublicationManifest[]
} | null>(null)
const isPlaylistLoading = ref(false)
watch(pending, () => {
  if (rotateEnabled.value) {
    startRotation()
  }
})
const onRotateTimeoutChanged = () => {
  if (rotateEnabled.value) {
    stopRotation()
    startRotation()
  }
}
const toggleRotate = debounce(() => {
  if (rotateEnabled.value) {
    stopRotation()
  } else {
    startRotation()
  }
})
const startRotation = debounce(() => {
  if (rotateInterval.value) { return }
  const speed = 100
  rotateEnabled.value = true
  rotateInterval.value = window.setInterval(
    checkProgressAndRotate(speed),
    speed
  )
})
const stopRotation = debounce(() => {
  rotateEnabled.value = false
  window.clearInterval(rotateInterval.value)
  rotateInterval.value = 0
})
const next = debounce(() => {
  if (!curation.value) { return }

  const nextIndex = currentImageIndex.value + 1
  if (nextIndex < curation.value.items.length) {
    currentImageIndex.value = nextIndex
  } else {
    currentImageIndex.value = 0
  }
  timeLeft.value = rotateTimeout.value
})
const prev = debounce(() => {
  if (!curation.value) { return }

  const prevIndex = currentImageIndex.value - 1
  if (prevIndex >= 0) {
    currentImageIndex.value = prevIndex
  } else {
    currentImageIndex.value = curation.value.items.length - 1
  }
  timeLeft.value = rotateTimeout.value
})
const checkProgressAndRotate = (delta: number) => () => {
  if (!curation.value || !rotateEnabled.value) { return }

  const newTimeLeft = timeLeft.value - delta
  if (newTimeLeft >= 0) {
    timeLeft.value = newTimeLeft
  } else {
    timeLeft.value = 0
  }

  if (timeLeft.value <= 0) {
    const nextIndex = currentImageIndex.value + 1
    if (nextIndex < curation.value.items.length) {
      currentImageIndex.value = nextIndex
    } else {
      currentImageIndex.value = 0
    }
    timeLeft.value = rotateTimeout.value
  }
}
const toggleFullscreen = debounce(async () => {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen()
  } else if (document.exitFullscreen) {
    await document.exitFullscreen()
  }
})
const loadPlaylist = debounce(async () => {
  isPlaylistLoading.value = true
  try {
    const curation = abc.curations.get<CollaborativeWhitelistCurationState>(
      playlistId.value
    )
    const { cachedValue: { state } } = await curation.contract.readState()
    const tracks = await Promise.all(
      state.items
        .map((item) => abc.legacy.fetchPublication(item))
        .filter(async publication => !!(await publication)?.audio)
    )
    playlist.value = { curation, state, tracks }
  } catch (error) {
    console.error('error fetching playlist curation', error)
  }
  isPlaylistLoading.value = false
})
const onAudioEnded = () => {
  if (!player.value) { return }


}
const onAudioPlay = () => {
  if (!player.value) { return }
}
const currentPublication = computed(() => {
  if (pending.value || !curation.value) { return null }

  return curation.value.items[currentImageIndex.value]
})
const qrText = computed(() => {
  if (!currentPublication.value) { return '' }

  const { host, protocol } = window.location
  const { creator, id } = currentPublication.value

  // return `https://artby.city/${creator}/${id}`
  return `${protocol}//${host}/${creator}/${id}`
})
const getSrcUrl = (idOrDataUrl?: string) => {
  if (!idOrDataUrl) { return '' }

  return idOrDataUrl.startsWith('data:')
    ? idOrDataUrl
    : `${gatewayBase}/${idOrDataUrl}`
}
</script>
