<template>
  <v-container>
    <v-row>
      <v-col lg="2" offset-lg="1">
        <v-row class="mt-4" justify="center">
          <v-avatar color="black" size="200"/>
        </v-row>
        <v-row class="mt-4 mb-1 mx-auto" justify="center">
          <v-btn justify="center">Tip / Edit</v-btn>
        </v-row>
      </v-col>
      <v-col lg="4" offset-lg="1">
        <v-card elevation="0">
          <v-card-title>Artist Name</v-card-title>
          <v-card-subtitle class="pb-0">
            <p class="mb-0">Second Name</p>
            <p class="mb-0">Third Name</p>
            <p class="mb-0">Socials</p>
          </v-card-subtitle>
          <v-card-text class="pb-0">
            Artist bio goes here please.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col lg="6">
        <v-tabs color="black">
          <v-tab value="one">Art</v-tab>
          <v-tab value="two">Likes</v-tab>
          <v-tab value="three">Tips</v-tab>
        </v-tabs>
        <v-divider/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <template>

        </template>
        <template>

        </template>
        <template>
          
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>


<style scoped>


</style>


<script setup lang="ts">


</script>