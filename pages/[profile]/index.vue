<template>
  <v-container>
    <template v-if="pending">
      <v-progress-linear indeterminate />
    </template>
    <template v-if="!pending && data && data.address">
      <v-row>
        <v-col cols="3">
          <v-row class="mt-4" justify="center">
            <Avatar :address="data.address" />
          </v-row>
          <v-row class="mt-4 mb-1 mx-auto" justify="center">
            <template v-if="data.isProfileOfCurrentUser">
              <ProfileEditButton />
            </template>
            <template v-else>
              <!-- <TipButton :address="data.address" /> -->
              <CollaborateMenu :address="data.address" class="mb-4" />
              <!-- <CurateMenu :item="data.address" label="Follow" /> -->
              <FollowButton />
            </template>
          </v-row>
        </v-col>
        <v-col cols="9">
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
            <LikesFeed :address="data.address" />
          </template>
          <template v-else-if="tab === 'tips'">
            <TipsFeed :address="data.address" />
          </template>
          <template v-else>
            <PortfolioFeed :address="data.address" />
          </template>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const abc = useArtByCity()
const route = useRoute()
const tab = ref<null | string>(null)
const usernameOrAddress = route.params.profile as string

const { data, pending } = useLazyAsyncData(usernameOrAddress, async () => {
  const resolved = await abc.usernames.resolve(usernameOrAddress)

  return {
    ...resolved,
    isProfileOfCurrentUser: auth.address === resolved.address
  }
})
</script>
