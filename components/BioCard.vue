<template>
  <v-card elevation="0">
    <v-card-title>{{ primaryName }}</v-card-title>
    <v-card-subtitle class="pb-0">
      <p class="mb-0">
        <ImageIcon
          class="d-inline-block mx-2"
          src="/logo/arweave/arweave_logo.svg"
        />
        <code>{{ props.address }}</code>
      </p>
      <p v-if="data?.username" class="mb-0">
        <ImageIcon
          class="d-inline-block mx-2"
          src="/logo/art-by-city/art-by-city-x.png"
        />
        <span>@{{ data?.username }}</span>
      </p>
      <p v-if="data?.profile?.twitter" class="mb-0">
        <v-icon color="#1da1f2" class="px-4 pb-1">
          mdi-twitter
        </v-icon>
        <nuxt-link
          :to="`https://twitter.com/${data?.profile?.twitter}`"
          target="_blank"
          class="text-decoration-none"
        >
          {{ data?.profile?.twitter }}
        </nuxt-link>
      </p>
      <p v-if="data?.profile?.instagram" class="mb-0">
        <v-icon color="#d300c5" class="px-4 pb-1">
          mdi-instagram
        </v-icon>
        <nuxt-link
          :to="`https://instagram.com/${data?.profile?.instagram}`"
          target="_blank"
          class="text-decoration-none"
        >
          {{ data?.profile?.instagram || 'blah blah' }}
        </nuxt-link>
      </p>
      <p v-if="data?.profile?.soundcloud" class="mb-0">
        <v-icon color="rgb(255, 85, 0)" class="px-4 pb-1">
          mdi-soundcloud
        </v-icon>
        <nuxt-link
          :to="`https://soundcloud.com/${data?.profile?.soundcloud}`"
          target="_blank"
          class="text-decoration-none"
        >
          {{ data?.profile?.soundcloud }}
        </nuxt-link>
      </p>
      <p v-if="data?.profile?.twitch" class="mb-0">
        <v-icon color="#9146FF" class="px-4 pb-1">
          mdi-twitch
        </v-icon>
        <nuxt-link
          :to="`https://twitch.tv/${data?.profile?.twitch}`"
          target="_blank"
          class="text-decoration-none"
        >
          {{ data?.profile?.twitch }}
        </nuxt-link>
      </p>
      <p v-if="data?.profile?.linkedin" class="mb-0">
        <v-icon color="#0077b5" class="px-4 pb-1">
          mdi-linkedin
        </v-icon>
        <nuxt-link
          :to="`https://linkedin.com/${data?.profile?.linkedin}`"
          target="_blank"
          class="text-decoration-none"
        >
          {{ data?.profile?.linkedin }}
        </nuxt-link>
      </p>
    </v-card-subtitle>
    <TextCollapsible :text="data?.profile?.bio || ''" class="ma-4" />
  </v-card>
</template>

<style>


</style>

<script setup lang="ts">
const props = defineProps<{ address: string }>()
const abc = useArtByCity()

const { 
  data
} = useLazyAsyncData(`profile-${props.address}`, async () => {
  const profile = await abc.legacy.fetchProfile(props.address)
  const username =
    await abc.legacy.usernames.resolveUsernameFromAddress(props.address)

  return { profile, username }
})

const primaryName = computed(() => {
  const displayName = data.value?.profile?.displayName
  const username = data.value?.username

  return displayName || username || props.address
})

</script>
