<script setup lang="ts">
import { onMounted } from 'vue'

import TheHeader from '@/components/layout/TheHeader.vue'
import { useAuthStore } from '@/stores'

onMounted(() => {
  const authStore = useAuthStore()

  authStore.autoLogin()
})
</script>

<template>
  <TheHeader></TheHeader>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.route-leave-active {
  transition: all 0.3s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
