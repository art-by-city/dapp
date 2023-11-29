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
  let txid = await abc.connect().following.getOrCreate()

  console.log("txId from getOrCreate", txid)

  // try {
  //   await abc.connect().following.follow(props.address)
  // } catch(error){
  //   console.log(error)
  // }
  // try {
  //   console.log("following", await abc.following.following(props.owner))
  // } catch(error){
  //   console.log(error)
  // }
  
  
}
</script>
