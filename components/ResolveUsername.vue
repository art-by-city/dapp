<!-- <template>
  <nuxt-link
    v-if="!noLink"
    class="text-primary"
    :to="`/${user?.username || props.address}`"
  >
    <span v-if="user?.profile?.displayName || user?.username">
      {{ user?.profile?.displayName || user?.username }}
    </span>
    <code v-else>
      {{ props.address }}
    </code>
  </nuxt-link>
  <template v-else>
    <span v-if="user?.profile?.displayName || user?.username">
      {{ user?.profile?.displayName || user?.username }}
    </span>
    <code v-else>
      {{ props.address }}
    </code>
  </template>
</template> -->

<template>
  <nuxt-link
    v-if="!noLink"
    class="text-primary"
    :to="`/${state?.usernames[props.address as string] || props.address}`"
  >
    <span v-if="state?.usernames[props.address as string]">
      {{ state?.usernames[props.address as string] }}
    </span>
    <code v-else>
      {{ props.address }}
    </code>
  </nuxt-link>
  <template v-else>
    <span v-if="state?.usernames[props.address as string]">
      {{ state?.usernames[props.address as string] }}
    </span>
    <code v-else>
      {{ props.address }}
    </code>
  </template>
</template>

<script setup lang="ts">
const props = defineProps<{ address?: string, noLink?: boolean}>()
const abc = useArtByCity()

// const {
//   data: user
// } = useLazyAsyncData(`resolve-username-${props.address}`, async () => {
//   if (!props.address) {
//     return { profile: null, username: null }
//   }

//   const profile = await abc.legacy.fetchProfile(props.address)
//   const username =
//     await abc.usernames.resolveUsernameFromAddress(props.address)
  
//   return { profile, username }
// })

const {
  data: state
} = useLazyAsyncData(`resolve-username-${props.address}`, async () => {
  try {
    const { cachedValue: { state } } = await abc.usernames.contract.readState()

    return state
  } catch (error) {
    console.error(
      `Error reading curation state for ${props.address}`,
      error
    )
  }
})
</script>
