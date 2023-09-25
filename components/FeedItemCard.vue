<template>
  <v-container fluid class="fill-height" v-if="pending">
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
  <v-img
    v-show="!pending"
    :src="'https://arweave.net/' + data?.images[0].preview"
    aspect-ratio="1"
    @click="goToArt"
    @click.middle="newTabArt"
    @mouseover="hover = true"
    @mouseleave="hover = false"
  >
    <Transition name="fade">
      <div v-if="hover" class="hover">
        <v-container>
          <v-row >
            <v-col>
              <a class="white--text font-weight-bold">{{ data?.title }}</a>
              <br />
              <a class="white--text font-italic">
                {{ data?.creator }}
              </a>
            </v-col>
          </v-row>
        </v-container>
        
      </div>
    </Transition>
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

.pending{
  color: rgb(38, 38, 38);
  font-size: large;
}

.hover {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
}
</style>