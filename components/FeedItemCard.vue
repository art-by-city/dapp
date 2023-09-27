<template>
  <v-img
    :src="src()"
    aspect-ratio="1"
    @click="goToArt"
    @click.middle="newTabArt"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <template v-slot:placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <v-container fluid class="fill-height">
          <v-row class="ma-0">
            <v-col
              cols="12"
              class="pending font-weight-md-thin scale-text text-center"
            >
              {{ data?.id }}
            </v-col>
            <v-col cols="12">
              <v-progress-linear
                indeterminate
                color="black"
                background-color="transparent"
                height="1"
                bottom
              ></v-progress-linear>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </template>
    <template v-slot:error>
      <v-container fluid class="fill-height">
        <v-row class="ma-0">
          <v-col cols="12">
            <div class="error404 scale-text text-center">
              404 image not found
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
    <template v-slot:default>
      <Transition name="fade">
        <div v-if="hover" class="hover fill-height pa-1 pl-4">
          <div v-if="isPlayable()" id="playIcon">
            <v-icon>
              {{ 'mdi-play' }}
            </v-icon>
          </div>
          <v-row align="end" class="fill-height pa-1 pl-4">
            <v-col>
              <a class="white--text font-weight-bold">
                {{ data?.title || "Cool Artwork Piece" }}
              </a>
              <br />
              <a class="white--text font-italic">
                {{ data?.creator || "Cool Artist" }} 
              </a>
            </v-col>
          </v-row>
        </div>
      </Transition>
    </template>
  </v-img>
</template>


<script setup lang="ts">

const hover = ref(false)
const { id } = defineProps<{ id: string }>()
const abc = useArtByCity()

const { data, refresh, pending } = useLazyAsyncData(id, async () => {
  const publication = await abc.legacy.fetchPublication(id)
  console.log(publication)
  return publication
})

function goToArt() {
  alert('You clicked on da art :)')
}

function newTabArt() {
  alert('Imagine this is a new tab with da art ;o')
}

function src() {
  if (data.value) {
    if ('images' in data.value && data.value.images.length > 0) {
      return 'https://arweave.net/' + data.value.images[0].preview
    }
  }

  return ''
}

function isPlayable():boolean {
  if (data.value) {
    if ('images' in data.value) {
      return !!data.value.images[0].animated
    } else if (
      'audio' in data.value || 'model' in data.value
    ) { return true }
  }

  return false
}
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pending, .error404{
  color: rgb(38, 38, 38);
  font-size: 36px;
}
.hover {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
}

#playIcon {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -24px;
}
</style>