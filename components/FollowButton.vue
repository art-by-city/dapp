<template>
  <v-btn
    v-if="!alreadyFollowing"
    color="primary"
    prepend-icon="mdi-plus"
    variant="outlined"
    density="compact"
    elevation="2"
    @click="onFollowClick"
  >
    Follow
  </v-btn>

  <v-btn
    v-else="alreadyFollowing"
    color="primary"
    prepend-icon="mdi-minus"
    variant="outlined"
    density="compact"
    elevation="2"
    @click="onFollowClick"
  >
    Unfollow
  </v-btn>
</template>

<script setup lang="ts">
const props = defineProps<{ address: string, owner: string }>()
const abc = useArtByCity()

const onFollowClick = debounce(async () => {
  try {
    const txid = await abc.connect().following.getOrCreate()
    console.log("txID from getOrCreate", txid)
  }catch(error){
    console.log("Error on getOrCreate follow:", error)
  }

  if (!alreadyFollowing) {
    try { // follow
      await abc.connect().following.follow(props.address)
    }catch(error){
      console.log(error)
    }
  }else{ // unfollow
    console.log("Already following user?", await alreadyFollowing.value)
  } 
})

const alreadyFollowing = computed( async () => {
  const following = await abc.following.following(props.owner)

  return following.includes(props.address)
})
</script>
