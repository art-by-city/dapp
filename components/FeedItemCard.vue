<template>
  <v-hover>
    <template v-slot="{ isHovering, props }">
      <v-card v-bind="props">
        <v-img :src="src()" aspect-ratio="1">
          <template #placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-container fluid class="fill-height">
                <v-row class="ma-0">
                  <v-col
                    cols="12"
                    class="pending font-weight-md-thin scale-text text-center"
                  >
                    {{ id }}
                  </v-col>
                  <v-col cols="12">
                    <v-progress-linear
                      indeterminate
                      color="black"
                      background-color="transparent"
                      height="1"
                      bottom
                    />
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </template>
          <template #error>
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
          <template #default>
            <v-fade-transition>
              <div v-if="isHovering" class="hover fill-height pa-1 pl-4">
                <div v-if="isPlayable()" id="playIcon">
                  <v-icon>{{ 'mdi-play' }}</v-icon>
                </div>
                <v-row align="end" class="fill-height pa-1 pl-4">
                  <v-col>
                    <a class="white--text font-weight-bold">
                      {{ data?.title || "Cool Artwork Piece" }}
                    </a>
                    <br>
                    <a class="white--text font-italic">
                      {{ data?.creator || "Cool Artist" }} 
                    </a>
                  </v-col>
                </v-row>
              </div>
            </v-fade-transition>
          </template>
        </v-img>
      </v-card>
    </template>
  </v-hover>
</template>


<script setup lang="ts">

const hover = ref(false)
const { id } = defineProps<{ id: string }>()
const abc = useArtByCity()

const { data, pending } = useLazyAsyncData(id, async () => {
  const publication = await abc.legacy.fetchPublication(id)
  console.log(publication)
  return publication
})

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

.pending, .error404{
  color: rgb(38, 38, 38);
  font-size: 36px;
}
.hover {
  background-color: rgba(0, 0, 0, 0.5);
}

#playIcon {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -24px;
}
</style>
