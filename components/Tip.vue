<template>
  <v-container flat>
    <v-row>
      <v-col cols="auto">
        <span>{{ props.amount }}</span>
      </v-col>
      <v-col cols="auto" class="pr-0 pt-2">
        <Avatar :address="props.from" small />
      </v-col>
      <v-col cols="3">
        <a
          :href="`/${ props.from }`"
          target="_blank"
          class="text-black from-user">{{ props.from }}</a>
      </v-col>
      <v-col cols="3">
        <a
          :href="`https://viewblock.io/arweave/tx/${props.txId}`"
          target="_blank"
          class="text-blue"
        >
          {{ props.txId }}
        </a>
      </v-col>
    </v-row>
    
  </v-container>
</template>

<style scoped>
.from-user {
  font-size: 14px;
}
</style>

<script setup lang="ts">
const props = defineProps<{ txId: string, from: string, amount: string }>()
</script>
