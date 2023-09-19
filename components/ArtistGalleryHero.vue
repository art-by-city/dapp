<template>
  <v-img
    class="hero-splash"
    content-class="hero-splash-content"
    :src="heroImage.src"
    :cover="true"
    height="1000"
  >
    <v-container fluid>
      <v-row justify="center" class="my-16">
        <v-col cols="12">
          <SplashLogo />
        </v-col>
      </v-row>
      <v-row class="my-16">
        <v-spacer />
        <v-col cols="auto">
          <div class="ml-16 pa-12">
            <router-link
              :to="heroImage.link || '/discover'"
              class="text-decoration-none white--text no-select"
            >
              <div class="text-h5 font-weight-bold">
                {{ heroImage.title }}
              </div>
              <div class="font-weight-thin font-italic">
                {{ heroImage.artist }}
              </div>
              <div>{{ heroImage.year }}</div>
            </router-link>
          </div>
        </v-col>
      </v-row>
      <v-row justify="center" class="my-16">
        <v-col cols="auto">
          <v-btn
            class="white--border"
            icon
            color="transparent"
            @click="debouncedScrollDownClicked"
          >
            <v-icon>mdi-chevron-double-down</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-img>
  <div ref="scrollContainer" />
</template>

<style scoped>
.hero-splash:deep(.hero-splash-content) {
  background-color: rgba(0, 0, 0, 0.333);
}

.hero-splash:deep(.v-img__img.v-img__img--cover) {
  animation: slowlyzoom 60s linear infinite;
}
@-moz-keyframes slowlyzoom {
  50%  { -moz-transform: scale(1.1) }
  100% { -moz-transform: scale(1)   }
}
@-webkit-keyframes slowlyzoom {
  50%  { -webkit-transform: scale(1.1) }
  100% { -webkit-transform: scale(1)   }
}
@keyframes slowlyzoom {
  50%  { transform: scale(1.1) }
  100% { transform: scale(1)   }
}
.white--text {
  color: white;
}
.white--border {
  border: 1px solid white;
}

.no-select {
  -webkit-touch-callout: none;
    -webkit-user-select: none;
     -khtml-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
}
</style>

<script setup lang="ts">
import _ from 'lodash'
import debounce from '../utils/debounce'

const images = ref([
  {
    artist: 'Daliah Ammar',
    title: 'Edge of Town',
    year: 2020,
    src: '/images/gallery-images/dalia-1.jpg',
    link: '/hyL5aEp4K7fd7hYEjKxi6caxjyL2UANONOnnnFe7jwc/edge-of-town'
  },
  {
    artist: 'Daliah Ammar',
    title: 'Hanna',
    year: 2020,
    src: '/images/gallery-images/dalia-2.jpg',
    link: '/hyL5aEp4K7fd7hYEjKxi6caxjyL2UANONOnnnFe7jwc/hanna'
  },
  {
    artist: 'Harry Hukkinen',
    title: 'Earth Mother',
    year: 2020,
    src: '/images/gallery-images/harryhukkinen-1.jpg',
    link: '/aJIPwBoPqt1FGaa4pRoMotuDZr68PHRAoXe3lUerFTs/earth-mother'
  },
  {
    artist: 'Harry Hukkinen',
    title: 'Styrofoam Series #4',
    year: 2009,
    src: '/images/gallery-images/harryhukkinen-2.png',
    link: 'aJIPwBoPqt1FGaa4pRoMotuDZr68PHRAoXe3lUerFTs/styrofoam-series'
  },
  {
    artist: 'Harry Hukkinen',
    title: 'High Rust - Wheelbarrows',
    year: 2012,
    src: '/images/gallery-images/harryhukkinen-3.jpg',
    link: 'aJIPwBoPqt1FGaa4pRoMotuDZr68PHRAoXe3lUerFTs/high-rust'
  },
  {
    artist: 'Christian M',
    title: 'White Night',
    year: 2014,
    src: '/images/gallery-images/christian_m-1.jpg',
    link: '/mKRPxOSIe08BddCnrL9en8C3hUGqwA5l1sUZilGsjDg/white-night'
  },
  {
    artist: 'Christian M',
    title: 'Candy Flip',
    year: 2014,
    src: '/images/gallery-images/christian_m-2.jpg',
    link: '/mKRPxOSIe08BddCnrL9en8C3hUGqwA5l1sUZilGsjDg/candy-flip'
  },
  {
    artist: 'JP Hackett',
    title: 'Collage 1',
    year: 2020,
    src: '/images/gallery-images/jp-1.jpg',
    link: '/zIe2L7WAptLeDdDUcGPOFtBkItZuRE2wE2GQh2LfFqc/collage-1'
  },
  {
    artist: 'JP Hackett',
    title: 'Collage 2',
    year: 2020,
    src: '/images/gallery-images/jp-2.jpg',
    link: '/zIe2L7WAptLeDdDUcGPOFtBkItZuRE2wE2GQh2LfFqc/collage-2'
  },
  {
    artist: 'JP Hackett',
    title: 'Collage 3',
    year: 2020,
    src: '/images/gallery-images/jp-3.jpg',
    link: '/zIe2L7WAptLeDdDUcGPOFtBkItZuRE2wE2GQh2LfFqc/collage-3'
  },
  {
    artist: 'JP Hackett',
    title: 'Lips with Teeth',
    year: 2020,
    src: '/images/gallery-images/jp-4.jpg',
    link: '/zIe2L7WAptLeDdDUcGPOFtBkItZuRE2wE2GQh2LfFqc/lips-with-teeth'
  },
  {
    artist: 'JP Hackett',
    title: 'Ink 1',
    year: 2020,
    src: '/images/gallery-images/jp-5.jpg',
    link: '/zIe2L7WAptLeDdDUcGPOFtBkItZuRE2wE2GQh2LfFqc/ink-1'
  },
  {
    artist: 'JP Hackett',
    title: 'Ink 2',
    year: 2020,
    src: '/images/gallery-images/jp-6.jpg',
    link: '/zIe2L7WAptLeDdDUcGPOFtBkItZuRE2wE2GQh2LfFqc/ink-2'
  },
  {
    artist: 'Higgs Boson',
    title: 'Decoherence #1',
    year: 2018,
    src: '/images/gallery-images/Decoherence_1_scaled.jpg',
    link: '/1KZdIq1mkiTjb1gf6f5c__MUkheFyU6UK8-MMciSKnE/decoherence'
  },
  {
    artist: 'Higgs Boson',
    title: 'Rhizome #1',
    year: 2013,
    src: '/images/gallery-images/Rhizome_1_scaled.jpg',
    link: '/1KZdIq1mkiTjb1gf6f5c__MUkheFyU6UK8-MMciSKnE/rhizome'
  },
  {
    artist: 'Higgs Boson',
    title: 'Rhizome #4',
    year: 2013,
    src: '/images/gallery-images/Rhizome_4_scaled.jpg',
    link: '/1KZdIq1mkiTjb1gf6f5c__MUkheFyU6UK8-MMciSKnE/rhizome'
  }
])

const currentImageIndex = ref(0)
const heroImage = computed(() => images.value[currentImageIndex.value])

const rotateHeroImage = () => {
  setTimeout(() => {
    const nextIndex = currentImageIndex.value + 1
    if (nextIndex < images.value.length) {
      currentImageIndex.value = nextIndex
    } else {
      currentImageIndex.value = 0
    }
    rotateHeroImage()
  }, 10000)
}

onMounted(() => {
  images.value = _.shuffle(images.value)
  rotateHeroImage()
})

const scrollContainer: Ref<HTMLDivElement | null> = ref(null)

const onScrollDownClicked = () => {
  scrollContainer.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest'
  })
}

const debouncedScrollDownClicked = debounce(onScrollDownClicked)
</script>
