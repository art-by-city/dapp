<template>
  <v-btn
    color="primary"
    prepend-icon="mdi-plus"
    variant="outlined"
    density="compact"
    elevation="2"
    @click="onFollowClick"
  >
    Follow
  </v-btn>
</template>

<script setup lang="ts">
const props = defineProps<{ address: string, owner: string }>()
const abc = useArtByCity()

const onFollowClick = async () => {
  let txid
  try{
    txid = await abc.connect().following.getOrCreate()
  }catch(error){
    console.log("Error on getOrCreate follow:", error)
  }

  console.log("txId from getOrCreate", txid)

  try {
    await abc.connect().following.follow(props.address)
  } catch(error){
    console.log(error)
  }
  try {
    console.log("following", await abc.following.following(props.owner))
  } catch(error){
    console.log(error)
  }
}

// const alreadyFollowing = computed( async () => {
//   const following = await abc.following.following(props.owner)

//   return following.includes(props.address)
// })
</script>
