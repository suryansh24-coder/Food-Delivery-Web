<template>
  <v-app-bar 
    class="glass-navbar" 
    :elevation="0" 
    height="70"
    id="app-navbar"
  >
    <v-container class="d-flex align-center" style="max-width: 1280px;">
      <!-- Logo -->
      <router-link to="/" class="d-flex align-center text-decoration-none ga-2" id="nav-logo">
        <img 
          src="/images/feast-fast-logo.svg" 
          alt="Feast Fast" 
          class="logo-image"
          width="44" 
          height="44"
        />
        <span class="logo-text ff-heading gradient-text" style="font-size: 1.4rem; font-weight: 800;">
          Feast Fast
        </span>
      </router-link>

      <v-spacer />

      <!-- Desktop Navigation -->
      <nav class="d-none d-md-flex align-center ga-1" id="nav-desktop-links">
        <v-btn 
          variant="text" 
          rounded="pill"
          :to="{ name: 'Home' }" 
          :class="{ 'text-primary': $route.name === 'Home' }"
          class="text-none"
          id="nav-home"
        >
          Home
        </v-btn>
        <v-btn 
          variant="text" 
          rounded="pill"
          :to="{ name: 'Restaurants' }" 
          :class="{ 'text-primary': $route.name === 'Restaurants' }"
          class="text-none"
          id="nav-restaurants"
        >
          Restaurants
        </v-btn>
      </nav>

      <v-spacer class="d-none d-md-flex" />

      <!-- Action Buttons -->
      <div class="d-flex align-center ga-1" id="nav-actions">
        <!-- Search (mobile) -->
        <v-btn
          icon
          variant="text"
          size="small"
          rounded="pill"
          class="d-md-none nav-action-btn"
          @click="mobileSearchOpen = !mobileSearchOpen"
          id="nav-search-toggle"
        >
          <v-icon icon="mdi-magnify" />
        </v-btn>

        <!-- Help -->
        <v-btn
          icon
          variant="text"
          size="small"
          rounded="pill"
          class="nav-action-btn d-none d-md-flex"
          @click="helpOpen = true"
          id="nav-help"
        >
          <v-icon icon="mdi-help-circle-outline" />
          <v-tooltip
            activator="parent"
            location="bottom"
            :offset="8"
            content-class="nav-tooltip-content"
          >
            Help
          </v-tooltip>
        </v-btn>

        <!-- Dark Mode Toggle -->
        <v-btn
          icon
          variant="text"
          size="small"
          rounded="pill"
          class="nav-action-btn"
          @click="userStore.toggleDarkMode()"
          id="nav-dark-mode"
        >
          <v-icon :icon="userStore.isDarkMode ? 'mdi-weather-sunny' : 'mdi-weather-night'" />
          <v-tooltip 
            activator="parent" 
            location="bottom" 
            :offset="8"
            content-class="nav-tooltip-content"
          >
            {{ userStore.isDarkMode ? 'Light Mode' : 'Dark Mode' }}
          </v-tooltip>
        </v-btn>

        <!-- Favorites -->
        <v-btn
          icon
          variant="text"
          size="small"
          rounded="pill"
          class="nav-action-btn"
          :to="{ name: 'Restaurants' }"
          id="nav-favorites"
        >
          <v-icon icon="mdi-heart-outline" />
          <v-tooltip 
            activator="parent" 
            location="bottom" 
            :offset="8"
            content-class="nav-tooltip-content"
          >
            Favorites
          </v-tooltip>
        </v-btn>

        <!-- Cart Button -->
        <v-btn
          icon
          variant="text"
          size="small"
          rounded="pill"
          class="position-relative nav-action-btn"
          @click="$emit('toggle-cart')"
          id="nav-cart"
        >
          <v-badge
            :content="cartStore.itemCount"
            :model-value="cartStore.itemCount > 0"
            color="primary"
            floating
            class="cart-badge"
          >
            <v-icon icon="mdi-cart-outline" />
          </v-badge>
          <v-tooltip 
            activator="parent" 
            location="bottom" 
            :offset="8"
            content-class="nav-tooltip-content"
          >
            Cart
          </v-tooltip>
        </v-btn>

        <!-- Mobile Menu -->
        <v-btn
          icon
          variant="text"
          size="small"
          rounded="pill"
          class="d-md-none nav-action-btn"
          @click="mobileMenuOpen = !mobileMenuOpen"
          id="nav-mobile-menu"
        >
          <v-icon :icon="mobileMenuOpen ? 'mdi-close' : 'mdi-menu'" />
        </v-btn>
      </div>
    </v-container>

    <!-- Mobile Search Bar -->
    <v-expand-transition>
      <div v-if="mobileSearchOpen" class="mobile-search-bar pa-3 d-md-none">
        <v-text-field
          v-model="searchInput"
          placeholder="Search restaurants, cuisines..."
          prepend-inner-icon="mdi-magnify"
          variant="solo-filled"
          rounded="pill"
          density="compact"
          hide-details
          clearable
          @keyup.enter="handleSearch"
          @click:clear="clearSearch"
          id="nav-mobile-search-input"
        />
      </div>
    </v-expand-transition>
  </v-app-bar>

  <!-- Help Dialog -->
  <v-dialog v-model="helpOpen" max-width="640" scrollable>
    <v-card rounded="xl">
      <v-card-title class="d-flex align-center justify-space-between pa-6 pb-3">
        <div class="d-flex align-center ga-3">
          <v-icon icon="mdi-help-circle" color="primary" size="28" />
          <span class="ff-heading text-h6 font-weight-bold">Help &amp; Documentation</span>
        </div>
        <v-btn icon variant="text" size="small" rounded="pill" @click="helpOpen = false">
          <v-icon icon="mdi-close" />
        </v-btn>
      </v-card-title>

      <v-divider />

      <v-card-text class="pa-6">
        <v-expansion-panels variant="accordion" rounded="lg">

          <!-- Getting Started -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center ga-3">
                <v-icon icon="mdi-rocket-launch-outline" color="primary" size="20" />
                <span class="font-weight-semibold">Getting Started</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <ol class="help-list">
                <li>Enter your <strong>delivery location</strong> in the location field on the home page.</li>
                <li>Use the <strong>search bar</strong> to find restaurants, cuisines, or specific dishes.</li>
                <li>Press <strong>Search</strong> or hit Enter to browse matching results.</li>
                <li>Click any restaurant to view its full menu.</li>
              </ol>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- Browsing Restaurants -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center ga-3">
                <v-icon icon="mdi-silverware-fork-knife" color="primary" size="20" />
                <span class="font-weight-semibold">Browsing Restaurants</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <ul class="help-list">
                <li>Visit the <strong>Restaurants</strong> page from the navigation bar.</li>
                <li>Filter by cuisine type using the category chips at the top.</li>
                <li>Sort restaurants by rating, delivery time, or price.</li>
                <li>Each card shows the restaurant's rating, estimated delivery time, and minimum order.</li>
              </ul>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- Placing an Order -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center ga-3">
                <v-icon icon="mdi-cart-outline" color="primary" size="20" />
                <span class="font-weight-semibold">Placing an Order</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <ol class="help-list">
                <li>Open a restaurant and browse its menu sections.</li>
                <li>Tap <strong>Add to Cart</strong> on any item you want.</li>
                <li>Click the <strong>cart icon</strong> in the top-right to review your order.</li>
                <li>Adjust quantities or remove items as needed.</li>
                <li>Tap <strong>Checkout</strong> to complete your order.</li>
              </ol>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- Search Tips -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center ga-3">
                <v-icon icon="mdi-magnify" color="primary" size="20" />
                <span class="font-weight-semibold">Search Tips</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <ul class="help-list">
                <li>Search by <strong>restaurant name</strong> (e.g., "Pizza Palace").</li>
                <li>Search by <strong>cuisine</strong> (e.g., "Italian", "Chinese", "Vegan").</li>
                <li>Search by <strong>dish</strong> (e.g., "Biryani", "Burger", "Sushi").</li>
                <li>Combine terms for more precise results.</li>
              </ul>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- Theme & Accessibility -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center ga-3">
                <v-icon icon="mdi-palette-outline" color="primary" size="20" />
                <span class="font-weight-semibold">Theme &amp; Accessibility</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <ul class="help-list">
                <li>Toggle between <strong>Dark Mode</strong> and <strong>Light Mode</strong> using the moon/sun icon in the navbar.</li>
                <li>The app remembers your theme preference across visits.</li>
                <li>All interactive elements are keyboard-navigable.</li>
              </ul>
            </v-expansion-panel-text>
          </v-expansion-panel>

          <!-- FAQ -->
          <v-expansion-panel>
            <v-expansion-panel-title>
              <div class="d-flex align-center ga-3">
                <v-icon icon="mdi-frequently-asked-questions" color="primary" size="20" />
                <span class="font-weight-semibold">FAQ</span>
              </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <div class="help-faq">
                <div class="faq-item">
                  <p class="font-weight-bold mb-1">Why isn't my location being detected?</p>
                  <p class="text-medium-emphasis">Type your area, city, or pincode manually in the location field — automatic detection is not enabled in this version.</p>
                </div>
                <v-divider class="my-3" />
                <div class="faq-item">
                  <p class="font-weight-bold mb-1">Can I order from multiple restaurants at once?</p>
                  <p class="text-medium-emphasis">Currently the cart supports items from one restaurant at a time. Adding items from a different restaurant will clear your existing cart.</p>
                </div>
                <v-divider class="my-3" />
                <div class="faq-item">
                  <p class="font-weight-bold mb-1">How do I remove an item from my cart?</p>
                  <p class="text-medium-emphasis">Open the cart drawer and use the minus (−) button to reduce quantity, or tap the trash icon to remove the item entirely.</p>
                </div>
              </div>
            </v-expansion-panel-text>
          </v-expansion-panel>

        </v-expansion-panels>
      </v-card-text>

      <v-divider />
      <v-card-actions class="pa-4 justify-center">
        <span class="text-caption text-medium-emphasis">Feast Fast v1.0 — Fast food, faster delivery 🚀</span>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer
    v-model="mobileMenuOpen"
    temporary
    location="right"
    width="280"
    class="glass-card"
    id="nav-mobile-drawer"
  >
    <v-list nav class="pa-4">
      <v-list-item class="mb-4">
        <div class="d-flex align-center ga-2">
          <img 
            src="/images/feast-fast-logo.svg" 
            alt="Feast Fast" 
            width="34" 
            height="34"
          />
          <span class="ff-heading gradient-text" style="font-size: 1.2rem; font-weight: 800;">Feast Fast</span>
        </div>
      </v-list-item>

      <v-divider class="mb-3 opacity-10" />

      <v-list-item
        prepend-icon="mdi-home"
        title="Home"
        :to="{ name: 'Home' }"
        rounded="pill"
        @click="mobileMenuOpen = false"
      />
      <v-list-item
        prepend-icon="mdi-silverware-fork-knife"
        title="Restaurants"
        :to="{ name: 'Restaurants' }"
        rounded="pill"
        @click="mobileMenuOpen = false"
      />
      <v-list-item
        prepend-icon="mdi-cart"
        title="Cart"
        :to="{ name: 'Cart' }"
        rounded="pill"
        @click="mobileMenuOpen = false"
      >
        <template #append>
          <v-badge
            v-if="cartStore.itemCount > 0"
            :content="cartStore.itemCount"
            color="primary"
            inline
          />
        </template>
      </v-list-item>

      <v-divider class="my-3 opacity-10" />

      <v-list-item
        :prepend-icon="userStore.isDarkMode ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        :title="userStore.isDarkMode ? 'Light Mode' : 'Dark Mode'"
        rounded="pill"
        @click="userStore.toggleDarkMode()"
      />
      <v-list-item
        prepend-icon="mdi-help-circle-outline"
        title="Help"
        rounded="pill"
        @click="mobileMenuOpen = false; helpOpen = true"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { useRestaurantStore } from '@/stores/restaurants'

defineEmits(['toggle-cart'])

const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()
const restaurantStore = useRestaurantStore()

const mobileMenuOpen = ref(false)
const mobileSearchOpen = ref(false)
const searchInput = ref('')
const helpOpen = ref(false)

const handleSearch = () => {
  if (searchInput.value.trim()) {
    restaurantStore.setSearchQuery(searchInput.value.trim())
    router.push({ name: 'Restaurants' })
    mobileSearchOpen.value = false
  }
}

const clearSearch = () => {
  searchInput.value = ''
  restaurantStore.setSearchQuery('')
}
</script>

<style scoped>
.logo-image {
  transition: var(--ff-transition-smooth);
  border-radius: 50%;
}

#nav-logo:hover .logo-image {
  transform: rotate(-10deg) scale(1.1);
}

.logo-text {
  font-family: var(--ff-font-heading);
}

.nav-action-btn {
  border-radius: 50% !important;
  transition: var(--ff-transition-smooth);
}

.nav-action-btn:hover {
  background: rgba(255, 107, 53, 0.1) !important;
  transform: scale(1.08);
}

.mobile-search-bar {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.cart-badge :deep(.v-badge__badge) {
  font-size: 0.65rem;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
}

.help-list {
  padding-left: 1.2rem;
  line-height: 2;
  font-size: 0.9rem;
}

.help-list li {
  margin-bottom: 2px;
}

.help-faq {
  font-size: 0.9rem;
}

.faq-item p {
  margin: 0;
  line-height: 1.6;
}
</style>

<style>
/* Global tooltip styles — must NOT be scoped so Vuetify's teleported overlays can pick them up */
.nav-tooltip-content {
  background: rgba(33, 33, 33, 0.96) !important;
  color: #ffffff !important;
  font-size: 0.78rem !important;
  font-weight: 600 !important;
  padding: 7px 14px !important;
  border-radius: 10px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35) !important;
  pointer-events: none;
  z-index: 99999 !important;
  letter-spacing: 0.01em;
  white-space: nowrap;
}

/* Override Vuetify's default tooltip overlay to ensure visibility */
.v-tooltip > .v-overlay__content {
  background: rgba(33, 33, 33, 0.96) !important;
  color: #ffffff !important;
  font-size: 0.78rem !important;
  font-weight: 600 !important;
  padding: 7px 14px !important;
  border-radius: 10px !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.35) !important;
  pointer-events: none;
  z-index: 99999 !important;
}
</style>
