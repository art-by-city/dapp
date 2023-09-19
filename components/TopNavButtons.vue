<template>
  <div class="nav-buttons-container">
    <v-container>
      <v-row>
        <v-col>
          <v-btn color="white" variant="text" to="/discover">
            DISCOVER
          </v-btn>
        </v-col>
        <v-col>
          <ConnectButton />
        </v-col>
      </v-row>
    </v-container>    
  </div>
</template>

<style>
.nav-buttons-container {
  display: flex;
  flex-direction: row;
}
</style>
