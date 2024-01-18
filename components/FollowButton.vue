<template>
  <v-btn
    variant="outlined"
    density="compact"
    elevation="2"
    :disabled="pending"
    :loading="pending"
    @click="onFollowClick"
  >
    <v-icon size="x-small">
      {{ followActionIcon }}
    </v-icon>
    {{ followActionText }}
  </v-btn>
</template>

<script setup lang="ts">
const props = defineProps<{ address: string, owner: string }>()
const abc = useArtByCity()

const {
  data: following,
  pending,
  refresh
} = useLazyAsyncData(`follows-for-${props.owner}`, async () => {
  const contract = await abc.connect().following.getContract(props.owner)
    
  if (!contract) {
    try {
      await abc.connect().following.create({ following: [] })
    } catch(createContractError){
      console.log("Error on creating follow contract: ", createContractError)
    }
  }

  const following = await abc.following.following(props.owner)

  return following
})

const isFollowing = computed(() => {
  if (!following.value) { return false }

  return following.value.includes(props.address)
})

const followActionIcon = computed( () => {
  return isFollowing.value
    ? 'mdi-minus' : 'mdi-plus'
})

const followActionText = computed( () => {
  return isFollowing.value
    ? 'Unfollow' : 'Follow'
})

const onFollowClick = debounce(async () => {
  
  if (!isFollowing.value) {
    try { // follow      
      await abc.connect().following.follow(props.address)
      await refresh()
    }catch(error){
      console.log('Error when attempting to follow.', error)
    }
  }else{ // unfollow
    try {
      await abc.connect().following.unfollow(props.address)
      await refresh()
    }catch(error){
      console.log('Error when attempting to unfollow.', error)
    }
  }
})
</script>
