<template>
  <v-card elevation="0">
    <v-card-title>{{ props.address }}</v-card-title>
    <v-card-subtitle class="pb-0">
      <p class="mb-0">
        @{{ profile?.displayName }}
      </p>
      <p class="mb-0">
        <v-img src="" class="px-4" />{{ props.address }}
      </p>
      <p v-if="profile?.twitter" class="mb-0">
        <v-icon color="#1da1f2" class="px-4 pb-1">
          mdi-twitter
        </v-icon>
        <nuxt-link
          :to="`https://twitter.com/${profile?.twitter}`"
          target="_blank"
          class="text-decoration-none"
        >
          {{ profile?.twitter }}
        </nuxt-link>
      </p>
      <p v-if="profile?.instagram" class="mb-0">
        <v-icon color="#d300c5" class="px-4 pb-1">
          mdi-instagram
        </v-icon>
        <nuxt-link
          :to="`https://instagram.com/${profile?.instagram}`"
          target="_blank"
          class="text-decoration-none"
        >
          {{ profile?.instagram || 'blah blah' }}
        </nuxt-link>
      </p>
      <p v-if="profile?.soundcloud" class="mb-0">
        <v-icon color="black" class="px-4 pb-1">
          mdi-soundcloud
        </v-icon>
        <nuxt-link
          :to="`https://soundcloud.com/${profile?.soundcloud}`"
          target="_blank"
          class="text-decoration-none"
        >
          {{ profile?.soundcloud }}
        </nuxt-link>
      </p>
      <p v-if="profile?.twitch" class="mb-0">
        <v-icon color="#9146FF" class="px-4 pb-1">
          mdi-twitch
        </v-icon>
        <nuxt-link
          :to="`https://twitch.tv/${profile?.twitch}`"
          target="_blank"
          class="text-decoration-none"
        >
          {{ profile?.twitch }}
        </nuxt-link>
      </p>
      <p v-if="profile?.linkedin" class="mb-0">
        <v-icon color="#0077b5" class="px-4 pb-1">
          mdi-linkedin
        </v-icon>
        <nuxt-link
          :to="`https://linkedin.com/${profile?.linkedin}`"
          target="_blank"
          class="text-decoration-none"
        >
          {{ profile?.linkedin }}
        </nuxt-link>
      </p>
    </v-card-subtitle>
    <TextCollapsible :text="profile?.bio || ''" class="ma-4" />
  </v-card>
</template>

<style>


</style>

<script setup lang="ts">
const props = defineProps<{ address: string }>()
const abc = useArtByCity()

const { 
  data: profile 
} = useLazyAsyncData(`profile-${props.address}`, async () => {
  const profile = await abc.legacy.fetchProfile(props.address)

  return profile
})

</script>
