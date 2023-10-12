<template>
  <v-menu v-if="auth.address" theme="dark">
    <template #activator="{ props }">
      <Avatar
        :address="auth.address"
        :small="true"
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
      v-if="xsDisplay"
      color="white"
      variant="tonal"
      density="comfortable"
      size="small"
      @click="onConnectClicked"
    >
      Connect
    </v-btn>
    <v-btn
      v-else
      color="white"
      variant="tonal"
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
const xsDisplay = display.xs

const onMyProfileClicked = debounce(async () => {
  return router.push({ path: `/${ auth.address }` })
})
// const truncatedAddress = computed(
//   () => auth.address?.slice(0, 6)
//     + '...'
//     + auth.address?.slice(auth.address?.length - 6)
// )
</script>
