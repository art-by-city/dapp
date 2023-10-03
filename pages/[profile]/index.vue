<template>
  <v-container v-if="data && data.address">
    <v-row>
      <v-col lg="2" offset-lg="1">
        <v-row class="mt-4" justify="center">
          <Avatar :address="data.address" :small="false" />
        </v-row>
        <v-row class="mt-4 mb-1 mx-auto" justify="center">
          <template v-if="data.isProfileOfCurrentUser">
            <ProfileEditButton />
          </template>
          <template v-else>
            <TipButton :address="data.address" />
          </template>
        </v-row>
      </v-col>
      <v-col lg="4" offset-lg="1">
        <BioCard :address="data.address" />
      </v-col>
    </v-row>
    <v-row dense>
      <v-col lg="6">
        <v-tabs v-model="tab" color="black">
          <v-tab value="art">
            Art
          </v-tab>
          <v-tab value="liked">
            Likes
          </v-tab>
          <v-tab value="tips">
            Tips
          </v-tab>
        </v-tabs>
        <v-divider />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <template v-if="tab === 'liked'">
          Likes
          <LikesFeed :address="data.address" />
        </template>
        <template v-else-if="tab === 'tips'">
          Tips
          <TipsFeed :address="data.address" />
        </template>
        <template v-else>
          Art
          <PortfolioFeed :address="data.address" />
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()

const abc = useArtByCity()
const route = useRoute()

const tab = ref<null | string>(null)
const usernameOrAddress = route.params.profile as string

const { data } = useLazyAsyncData(usernameOrAddress, async () => {
  const resolved = await abc.legacy.usernames.resolve(usernameOrAddress)
  // const resolved = { address: usernameOrAddress, username: null }

  return {
    ...resolved,
    isProfileOfCurrentUser: auth.address === resolved.address
  }
})
</script>
