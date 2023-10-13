<template>
  <v-menu v-if="auth.address" theme="dark">
    <template #activator="{ props }">
      <Avatar
        :address="auth.address"
        small
        v-bind="props"
        style="cursor: pointer;"
      />
    </template>
    <v-list>
      <v-list-item>
        <v-list-item-title>
          <code class="text-white">
            {{ auth.address }}
          </code>
        </v-list-item-title>
      </v-list-item>
      <v-list-item @click="onMyProfileClicked">
        <v-list-item-title>My Profile</v-list-item-title>
      </v-list-item>
      <v-list-item @click="onDisconnectClicked">
        <v-list-item-title>Disconnect</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
  <template v-else>
    <v-btn
      color="white"
      variant="text"
      density="comfortable"
      :size="display.xs ? 'small' : 'default'"
      @click="onConnectClicked"
    >
      Connect
    </v-btn>
  </template>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const onConnectClicked = debounce(async () => await auth.connect())
const onDisconnectClicked = debounce(async () => await auth.disconnect())
const display = useDisplay()
const onMyProfileClicked = debounce(async () => {
  return router.push(`/${ auth.address }`)
})
// const truncatedAddress = computed(
//   () => auth.address?.slice(0, 6)
//     + '...'
//     + auth.address?.slice(auth.address?.length - 6)
// )
</script>
