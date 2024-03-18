<template>
  <v-hover #="{ isHovering, props }">
    <v-btn
      v-bind="props"
      variant="outlined"
      density="compact"
      elevation="2"
      :color="textColor"
      :disabled="pending || loading"
      :loading="pending || loading"
      :prepend-icon="followActionIcon(isHovering)"
      @click="onFollowClick(isHovering)"
    >
      {{ followActionText(isHovering) }}
      <template #loader>
        <v-progress-circular
          width="3"
          size="15"
          indeterminate
        />
        {{ followActionText(isHovering) }}
      </template>      
    </v-btn>
  </v-hover>
</template>

<script setup lang="ts">
const props = defineProps<{ address: string, owner: string }>()
const abc = useArtByCity()
const errorFlag = ref(false)
const creatingContract = ref(false)
const loading = ref(false)

const resetErrorFlag = () => {
  errorFlag.value = false
}

const {
  data: following,
  pending,
  refresh
} = useLazyAsyncData(`follows-for-${props.owner}`, async () => {
  return await abc.following.following(props.owner)
})

const isFollowing = computed(() => {
  if (!following.value) { return false }
  if (!props.owner) { return false }

  return following.value.includes(props.address)
})

const followActionIcon = (isHovering?: boolean) => {
  if (errorFlag.value) { return 'mdi-alert' }
  if (isHovering && isFollowing.value) { return 'mdi-account-minus' }

  return isFollowing.value
    ? 'mdi-account-check' : 'mdi-account-plus'
}

const followActionText = (isHovering?: boolean) => {
  if (pending.value) { return '' }
  if (creatingContract.value) { return 'Creating Contract' }
  if (loading.value) { return 'Submitting' }
  if (errorFlag.value) { return 'ERROR' }
  if (isHovering && isFollowing.value) { return 'Unfollow' }

  return isFollowing.value
    ? 'Following' : 'Follow'
}

const textColor = computed(() => {
  return errorFlag.value
    ? '#FF5252' : ''
})

const onFollowClick = debounce(async (isHovering?: boolean) => {
  // NB: On mobile, the first click isHovering will be falsy, so we skip.
  if (!isHovering) {
    return
  }
  let contract
  loading.value = true
  try {
    contract = await abc.connect().following.getContract(props.owner)
    console.log("Getting follow contract", contract)
  }catch(error){
    errorFlag.value = true
    console.log("Error getting follow contract", error)
  }
    
  if (!contract) {
    try {
      console.log("Creating follow contract")
      creatingContract.value = true
      const createdContract = await abc.connect().following.create({ following: [] })
      creatingContract.value = false
      console.log(createdContract)
      await refresh()
    } catch (createContractError) {
      errorFlag.value = true
      console.log('Error on creating follow contract: ', createContractError)
    }
  }
  
  // Loop checking if contract exists, if not exist create it,
  // then once it confirms exists, exit loop and attempt to follow

  try {
    if (!isFollowing.value) {
      await abc.connect().following.follow(props.address)
    } else {
      await abc.connect().following.unfollow(props.address)
    }
    await refresh()
  } catch (error) {
    errorFlag.value = true
    console.log('Error when attempting to follow/unfollow.', error)
  }

  loading.value = false
  if (errorFlag.value) {
    setTimeout(resetErrorFlag, 2000)
  }
})
</script>
