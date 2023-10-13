<template>
  <div>
    <v-expand-transition>
      <p class="text-container" :class="{ collapsed }">
        {{ text }}
      </p>
    </v-expand-transition>
    <div class="text-center button-container" :class="{ collapsed }">
      <v-btn
        icon
        size="x-small"
        variant="plain"
        @click="collapsed = !collapsed"
      >
        <v-icon>mdi-chevron-double-{{ collapsed ? 'down' : 'up' }}</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.text-container.collapsed {
  height: 3em;
  overflow: hidden;
}
.button-container.collapsed::before {
  content: "\00a0";
  display: block;
  margin-top: -15px;
  position: relative;
  bottom: 0;
  width: 100%;
  background:
    linear-gradient(
      to bottom,
      rgba(255,255,255,0) 0%,
      rgba(255,255,255,1) 50%,
      rgba(255,255,255,1) 100%
    )
    left 
    bottom
    no-repeat;
}
</style>

<script setup lang="ts">
defineProps<{ text: string }>()

const collapsed = ref<boolean>(true)
</script>
