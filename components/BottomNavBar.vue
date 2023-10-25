<template>
  <v-bottom-navigation>
    <span><v-btn
      density="comfortable"
      variant="text"
      to="/"
    >
      HOME
    </v-btn></span>
    <v-btn
      density="comfortable"
      variant="text"
      to="/discover"
    >
      DISCOVER
    </v-btn>
    <v-btn
      density="comfortable"
      variant="text"
      to="/curations"
    >
      CURATE
    </v-btn>
    <div class="mt-3 ml-3 ml-sm-2">
      <ConnectButton xs-mobile theme="light" />
    </div>
  </v-bottom-navigation>
</template>
