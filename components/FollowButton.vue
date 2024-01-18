<template>
  <v-hover #="{ isHovering, props }">
    <v-btn
      v-bind="props"
      variant="outlined"
      density="compact"
      elevation="2"
      :color="textColor"
      :disabled="pending"
      :loading="pending"
      @click="onFollowClick"
    >
      <template v-if="errorFlag" #prepend>
        <v-icon color="#FF5252">
          {{ followActionIcon(isHovering) }}
        </v-icon>
      </template>
      <v-icon class="mr-1">
        {{ followActionIcon(isHovering) }}
      </v-icon>
      {{ followActionText(isHovering) }}
    </v-btn>
  </v-hover>
</template>

<script setup lang="ts">
const props = defineProps<{ address: string, owner: string }>()
const abc = useArtByCity()
const errorFlag = ref(false)

const errorFlip = () => {
  errorFlag.value = !errorFlag.value
}

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
      errorFlag.value = true
      console.log("Error on creating follow contract: ", createContractError)
      setTimeout(errorFlip, 2000)
    }
  }

  const following = await abc.following.following(props.owner)

  return following
})

const isFollowing = computed(() => {
  if (!following.value) { return false }

  return following.value.includes(props.address)
})

const followActionIcon = (isHovering?: boolean) => {
  if (errorFlag.value) { return 'mdi-alert' }
  if (isHovering && isFollowing.value) { return 'mdi-account-minus'}

  return isFollowing.value
    ? 'mdi-account-check' : 'mdi-account-plus'
}

const followActionText = (isHovering?: boolean) => {
  if (errorFlag.value) { return 'ERROR' }
  if (isHovering && isFollowing.value) { return 'Unfollow'}

  return isFollowing.value
    ? 'Following' : 'Follow'
}

const textColor = computed( () => {
  return errorFlag.value
    ? '#FF5252' : ''
})

const onFollowClick = debounce(async () => {
  
  if (!isFollowing.value) {
    try { // follow      
      await abc.connect().following.follow(props.address)
      await refresh()
    }catch(error){
      errorFlag.value = true
      console.log('Error when attempting to follow.', error)
      setTimeout(errorFlip, 2000)
    }
  }else{ // unfollow
    try {
      await abc.connect().following.unfollow(props.address)
      await refresh()
    }catch(error){
      errorFlag.value = true
      console.log('Error when attempting to unfollow.', error)
      setTimeout(errorFlip, 2000)
    }
  }
})
</script>
