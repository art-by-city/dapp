<template>
  <v-menu v-if="auth.address" theme="dark">
    <template #activator="{ props: menuProps }">
      <Avatar
        :address="auth.address"
        small
        v-bind="menuProps"
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
      :color="props.xsMobile ? 'primary' : 'white'"
      variant="text"
      density="comfortable"
      :size="props.xsMobile ? 'small' : 'default'"
      :class="props.xsMobile ? 'pb-4' : ''"
      @click="onConnectClicked"
    >
      Connect
    </v-btn>
  </template>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const props = defineProps<{ xsMobile?: boolean }>()
const auth = useAuthStore()
const router = useRouter()
const onConnectClicked = debounce(async () => await auth.connect())
const onDisconnectClicked = debounce(async () => await auth.disconnect())
const onMyProfileClicked = debounce(async () => {
  return router.push(`/${ auth.address }`)
})
// const truncatedAddress = computed(
//   () => auth.address?.slice(0, 6)
//     + '...'
//     + auth.address?.slice(auth.address?.length - 6)
// )
</script>
