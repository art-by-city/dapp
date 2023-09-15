<template>
  <v-app-bar flat>
    <template #prepend>
      <router-link v-slot="{navigate}" to="/" custom>
        <div class="logo-container" @click="navigate">
          <img
            class="logo pa-2"
            src="/logo/art-by-city/art-by-city-logo.png"
            alt="Art x By x City"
          >
        </div>
      </router-link>
    </template>

    <template #append>
      <TopNavButtons />
    </template>
  </v-app-bar>
</template>

<style>
.logo-container {
  height: 100%;
}

.logo {
  height: 100%;
  width: auto;
  cursor: pointer;
}
</style>
