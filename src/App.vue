<template>
  <v-app :theme="userStore.isDarkMode ? 'feastflowDark' : 'feastflowLight'">
    <AppNavbar @toggle-cart="cartDrawerOpen = true" />
    
    <v-main>
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </v-main>

    <CartDrawer v-model="cartDrawerOpen" />
    <AppFooter />

    <!-- Scroll to top button -->
    <v-fab
      v-show="showScrollTop"
      icon="mdi-chevron-up"
      color="primary"
      size="small"
      class="scroll-top-btn"
      position="fixed"
      location="bottom end"
      @click="scrollToTop"
      app
    />

    <!-- Snackbar for notifications -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="2000"
      location="top"
      rounded="lg"
    >
      <div class="d-flex align-center ga-2">
        <v-icon :icon="snackbar.icon" size="20" />
        <span class="font-weight-medium">{{ snackbar.text }}</span>
      </div>
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted, provide } from 'vue'
import { useUserStore } from '@/stores/user'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CartDrawer from '@/components/cart/CartDrawer.vue'

const userStore = useUserStore()
const cartDrawerOpen = ref(false)
const showScrollTop = ref(false)

// Snackbar system
const snackbar = ref({
  show: false,
  text: '',
  color: 'primary',
  icon: 'mdi-check-circle',
})

const showNotification = (text, color = 'primary', icon = 'mdi-check-circle') => {
  snackbar.value = { show: true, text, color, icon }
}

// Provide notification function to all children
provide('showNotification', showNotification)
provide('openCartDrawer', () => { cartDrawerOpen.value = true })

// Scroll to top
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 400
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.scroll-top-btn {
  z-index: 100;
  margin: 16px;
}
</style>
