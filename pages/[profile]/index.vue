<template>
  <v-container>
    <v-row>
      <v-col lg="2" offset-lg="1">
        <v-row class="mt-4" justify="center">
          <Avatar :address="(data?.address as string)"/>
        </v-row>
        <v-row class="mt-4 mb-1 mx-auto" justify="center">
          <template v-if=address>
            <ProfileEditButton />
          </template>
          <template v-else>
            <TipButton :address="(data?.address as string)" />
          </template>
        </v-row>
      </v-col>
      <v-col lg="4" offset-lg="1">
        <ProfileBio :address="(data?.address as string)"/>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col lg="6">
        <v-tabs v-model="tab" color="black">
          <v-tab value="art">Art</v-tab>
          <v-tab value="liked">Likes</v-tab>
          <v-tab value="tips">Tips</v-tab>
        </v-tabs>
        <v-divider/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <template v-if="tab === 'liked'">
          Likes
          <ProfileLikesFeed :address="(data?.address as string)"/>
        </template>
        <template v-else-if="tab === 'tips'">
          Tips
          <ProfileTipsFeed :address="(data?.address as string)"/>
        </template>
        <template v-else>
          Art
          <PortfolioFeed :address="(data?.address as string)"/>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>


<style scoped>


</style>


<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const address = auth.address // will be null if not logged in

const abc = useArtByCity()
const route = useRoute()

const tab = ref<null | string>(null)
const usernameOrAddress = route.params.profile as string

const { data, pending } = useLazyAsyncData(usernameOrAddress, async () => {

  return await abc.legacy.usernames.resolve(usernameOrAddress)
})


</script>