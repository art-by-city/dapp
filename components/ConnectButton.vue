<template>
  <v-menu v-if="auth.address">
    <template #activator="{ props }">
      <code style="cursor: pointer;" v-bind="props">{{ auth.address }}</code>
    </template>
    <v-list>
      <v-list-item @click="onDisconnectClicked">
        <v-list-item-title>Disconnect</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
  <v-btn
    v-else
    color="white"
    variant="tonal"
    @click="onConnectClicked"
  >
    Connect
  </v-btn>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const onConnectClicked = debounce(async () => await auth.connect())
const onDisconnectClicked = debounce(async () => await auth.disconnect())
// const truncatedAddress = computed(
//   () => auth.address?.slice(0, 6)
//     + '...'
//     + auth.address?.slice(auth.address?.length - 6)
// )
</script>
