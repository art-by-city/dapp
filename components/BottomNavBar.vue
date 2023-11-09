<template>
  <v-bottom-navigation>
    <v-btn
      density="comfortable"
      variant="text"
      to="/"
      style="max-width: 20%; min-width: 64px;"
    >
      <v-icon>mdi-home</v-icon>

      <span>Home</span>
    </v-btn>
    <v-btn
      density="comfortable"
      variant="text"
      to="/discover"
      style="max-width: 20%; min-width: 64px;"
    >
      <v-icon>mdi-magnify</v-icon>

      <span>Discover</span>
    </v-btn>
    <v-btn
      density="comfortable"
      variant="text"
      to="/curations"
      style="max-width: 20%; min-width: 64px;"
    >
      <v-icon>mdi-book-heart</v-icon>

      <span>Curate</span>
    </v-btn>
    <v-btn
      density="comfortable"
      variant="text"
      to="/publish"
      style="max-width: 20%; min-width: 64px;"
    >
      <v-icon>mdi-brush</v-icon>

      <span>Publish</span>
    </v-btn>
    <div class="mt-3 ml-3 ml-sm-2">
      <ConnectButton xs-mobile theme="light" />
    </div>
  </v-bottom-navigation>
</template>
