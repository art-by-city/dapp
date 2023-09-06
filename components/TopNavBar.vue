<template>
    <v-app-bar>
        <template v-slot:prepend>
            <router-link to="/" custom v-slot="{navigate}">
                <div class="logo-container" @click="navigate">
                    <img
                        class="logo"
                        src="/logo/art-by-city/logo_by_daliah_ammar_dark_transparent.png"
                        alt="Art x By x City"
                    />
                </div>
            </router-link>
        </template>

        <template v-slot:append>
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
