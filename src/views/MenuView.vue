<template>
  <div class="menu-page" id="menu-view" v-if="restaurant">
    <!-- Restaurant Header -->
    <section class="menu-header" id="menu-header">
      <div class="menu-header__image">
        <v-img :src="restaurant.image" height="300" cover class="menu-header__bg">
          <template #placeholder>
            <div class="d-flex align-center justify-center fill-height shimmer" />
          </template>
        </v-img>
        <div class="menu-header__overlay" />
      </div>

      <v-container style="max-width: 1280px;" class="menu-header__content">
        <v-btn
          icon
          variant="tonal"
          size="small"
          class="mb-4"
          @click="$router.back()"
          id="menu-back-btn"
        >
          <v-icon icon="mdi-arrow-left" />
        </v-btn>

        <div class="d-flex flex-column flex-sm-row justify-space-between align-sm-end ga-4">
          <div>
            <div class="d-flex align-center ga-2 mb-2">
              <v-chip v-if="restaurant.promoted" size="x-small" color="primary" class="font-weight-bold">
                PROMOTED
              </v-chip>
              <v-chip v-if="restaurant.isOpen" size="x-small" color="success" variant="tonal" class="font-weight-bold">
                OPEN NOW
              </v-chip>
            </div>
            <h1 class="ff-heading text-h4 font-weight-bold mb-2" id="menu-restaurant-name">
              {{ restaurant.name }}
            </h1>
            <p class="text-body-2 mb-2" style="opacity: 0.7;">
              {{ restaurant.cuisine.join(' • ') }}
            </p>
            <p class="text-body-2" style="opacity: 0.5;">
              <v-icon icon="mdi-map-marker" size="14" class="mr-1" />
              {{ restaurant.address }}
            </p>
          </div>

          <div class="d-flex ga-3 align-center">
            <div class="menu-stat glass-card pa-3 text-center" id="menu-stat-rating">
              <div
                class="ff-rating mb-1"
                :class="restaurant.rating >= 4 ? 'ff-rating-high' : 'ff-rating-medium'"
              >
                <v-icon icon="mdi-star" size="14" />
                {{ restaurant.rating }}
              </div>
              <div class="text-caption" style="opacity: 0.5;">{{ restaurant.reviewCount }}+ ratings</div>
            </div>

            <div class="menu-stat glass-card pa-3 text-center" id="menu-stat-time">
              <div class="text-body-2 font-weight-bold mb-1">
                <v-icon icon="mdi-clock-outline" size="14" class="mr-1" />
                {{ restaurant.deliveryTime }}
              </div>
              <div class="text-caption" style="opacity: 0.5;">minutes</div>
            </div>

            <div class="menu-stat glass-card pa-3 text-center" id="menu-stat-price">
              <div class="text-body-2 font-weight-bold mb-1">
                {{ '₹'.repeat(restaurant.priceRange) }}
              </div>
              <div class="text-caption" style="opacity: 0.5;">Price range</div>
            </div>

            <v-btn
              icon
              variant="tonal"
              :color="userStore.isFavorite(restaurant.id) ? 'red' : 'default'"
              @click="userStore.toggleFavorite(restaurant.id)"
              id="menu-fav-btn"
            >
              <v-icon :icon="userStore.isFavorite(restaurant.id) ? 'mdi-heart' : 'mdi-heart-outline'" />
            </v-btn>
          </div>
        </div>
      </v-container>
    </section>

    <!-- Menu Section -->
    <section class="menu-section" id="menu-items-section">
      <v-container style="max-width: 1280px;">
        <!-- Category Tabs -->
        <div class="menu-tabs-wrapper mb-6" id="menu-category-tabs">
          <v-chip-group v-model="activeCategory" mandatory>
            <v-chip
              value="all"
              :variant="activeCategory === 'all' ? 'flat' : 'tonal'"
              :color="activeCategory === 'all' ? 'primary' : 'default'"
              rounded="lg"
              class="font-weight-medium text-none"
            >
              All Items ({{ restaurant.menu.length }})
            </v-chip>
            <v-chip
              v-for="cat in menuCategories"
              :key="cat"
              :value="cat"
              :variant="activeCategory === cat ? 'flat' : 'tonal'"
              :color="activeCategory === cat ? 'primary' : 'default'"
              rounded="lg"
              class="font-weight-medium text-none"
            >
              {{ cat }} ({{ getCategoryCount(cat) }})
            </v-chip>
          </v-chip-group>
        </div>

        <!-- Veg/Non-veg filter -->
        <div class="d-flex ga-3 mb-6 align-center flex-wrap" id="menu-veg-filter">
          <div class="d-flex ga-2">
            <v-btn
              rounded="pill"
              size="small"
              :variant="vegFilter === 'all' ? 'flat' : 'outlined'"
              :color="vegFilter === 'all' ? 'primary' : 'default'"
              class="text-none veg-pill-btn"
              @click="vegFilter = 'all'"
            >
              All
            </v-btn>
            <v-btn
              rounded="pill"
              size="small"
              :variant="vegFilter === 'veg' ? 'flat' : 'outlined'"
              :color="vegFilter === 'veg' ? 'success' : 'default'"
              class="text-none veg-pill-btn"
              @click="vegFilter = 'veg'"
            >
              <span class="veg-dot mr-2" style="background: #4CAF50;" />
              Veg
            </v-btn>
            <v-btn
              rounded="pill"
              size="small"
              :variant="vegFilter === 'nonveg' ? 'flat' : 'outlined'"
              :color="vegFilter === 'nonveg' ? 'error' : 'default'"
              class="text-none veg-pill-btn"
              @click="vegFilter = 'nonveg'"
            >
              <span class="veg-dot mr-2" style="background: #F44336;" />
              Non-Veg
            </v-btn>
          </div>

          <v-spacer />

          <span class="text-body-2" style="opacity: 0.5;">
            {{ filteredMenu.length }} items
          </span>
        </div>

        <!-- Menu Items Grid -->
        <v-row>
          <v-col
            v-for="(item, index) in filteredMenu"
            :key="item.id"
            cols="12"
            sm="6"
            lg="4"
            class="animate-fade-up"
            :style="{ animationDelay: `${index * 0.05}s` }"
          >
            <v-card class="menu-item-card glass-card hover-scale-sm" :id="`menu-item-${item.id}`">
              <div class="d-flex">
                <!-- Item Image -->
                <div class="menu-item-card__image">
                  <v-img :src="item.image" width="130" height="130" cover class="rounded-lg">
                    <template #placeholder>
                      <div class="d-flex align-center justify-center fill-height shimmer rounded-lg" />
                    </template>
                  </v-img>
                  
                  <!-- Bestseller badge -->
                  <v-chip
                    v-if="item.isBestseller"
                    size="x-small"
                    class="menu-item-card__bestseller font-weight-bold"
                    color="amber-darken-2"
                    variant="flat"
                  >
                    ★ Bestseller
                  </v-chip>
                </div>

                <!-- Item Info -->
                <div class="menu-item-card__info pa-3 d-flex flex-column flex-grow-1">
                  <div class="d-flex align-center ga-2 mb-1">
                    <!-- Veg/Non-veg indicator -->
                    <span
                      :style="{
                        width: '10px',
                        height: '10px',
                        borderRadius: '2px',
                        border: `2px solid ${item.isVeg ? '#4CAF50' : '#F44336'}`,
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }"
                    >
                      <span
                        :style="{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: item.isVeg ? '#4CAF50' : '#F44336',
                        }"
                      />
                    </span>
                    <h4 class="text-body-2 font-weight-bold text-truncate">{{ item.name }}</h4>
                  </div>

                  <p class="text-caption text-truncate-2 mb-2" style="opacity: 0.5; line-height: 1.5;">
                    {{ item.description }}
                  </p>

                  <v-spacer />

                  <div class="d-flex justify-space-between align-center">
                    <div class="d-flex align-center ga-2">
                      <span class="ff-price text-body-2">₹{{ item.price }}</span>
                      <div
                        class="ff-rating"
                        :class="item.rating >= 4 ? 'ff-rating-high' : 'ff-rating-medium'"
                        style="font-size: 0.65rem; padding: 1px 5px;"
                      >
                        <v-icon icon="mdi-star" size="9" />
                        {{ item.rating }}
                      </div>
                    </div>

                    <!-- Add to Cart Button -->
                    <div v-if="getItemQty(item.id) === 0">
                      <v-btn
                        color="primary"
                        variant="tonal"
                        size="small"
                        rounded="lg"
                        class="text-none font-weight-bold add-btn"
                        @click="addItem(item)"
                        :id="`add-to-cart-${item.id}`"
                      >
                        ADD
                      </v-btn>
                    </div>

                    <!-- Quantity Controls -->
                    <div v-else class="qty-controls d-flex align-center" :id="`qty-controls-${item.id}`">
                      <v-btn
                        icon
                        size="x-small"
                        variant="tonal"
                        color="primary"
                        @click="updateQty(item, -1)"
                      >
                        <v-icon icon="mdi-minus" size="14" />
                      </v-btn>
                      <span class="text-body-2 font-weight-bold mx-3 qty-value">
                        {{ getItemQty(item.id) }}
                      </span>
                      <v-btn
                        icon
                        size="x-small"
                        variant="flat"
                        color="primary"
                        @click="updateQty(item, 1)"
                      >
                        <v-icon icon="mdi-plus" size="14" />
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Empty menu state -->
        <div v-if="filteredMenu.length === 0" class="text-center py-12">
          <v-icon icon="mdi-food-off" size="60" style="opacity: 0.2;" class="mb-4" />
          <h3 class="ff-heading text-body-1 mb-2">No items found</h3>
          <p class="text-body-2" style="opacity: 0.5;">Try a different filter</p>
        </div>
      </v-container>
    </section>

    <!-- Sticky Cart Bar -->
    <v-slide-y-reverse-transition>
      <div v-if="cartStore.itemCount > 0 && cartStore.cartRestaurantId === restaurant.id" class="sticky-cart-bar" id="sticky-cart-bar">
        <v-container style="max-width: 1280px;">
          <v-card class="glass-card pa-3">
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex align-center ga-3">
                <v-badge :content="cartStore.itemCount" color="primary">
                  <v-icon icon="mdi-cart" size="24" />
                </v-badge>
                <div>
                  <div class="text-body-2 font-weight-bold">{{ cartStore.itemCount }} item{{ cartStore.itemCount > 1 ? 's' : '' }}</div>
                  <div class="text-caption ff-price">₹{{ cartStore.subtotal }}</div>
                </div>
              </div>
              <v-btn
                color="primary"
                rounded="lg"
                class="text-none font-weight-bold"
                :to="{ name: 'Cart' }"
                id="sticky-cart-view-btn"
              >
                View Cart
                <v-icon icon="mdi-arrow-right" class="ml-1" />
              </v-btn>
            </div>
          </v-card>
        </v-container>
      </div>
    </v-slide-y-reverse-transition>
  </div>

  <!-- Restaurant Not Found -->
  <div v-else class="text-center py-16" id="menu-not-found">
    <v-container>
      <v-icon icon="mdi-store-off" size="80" style="opacity: 0.2;" class="mb-4" />
      <h2 class="ff-heading text-h5 mb-2">Restaurant not found</h2>
      <p class="text-body-2 mb-4" style="opacity: 0.5;">This restaurant doesn't exist or has been removed.</p>
      <v-btn color="primary" :to="{ name: 'Restaurants' }" class="text-none" id="menu-browse-btn">
        Browse Restaurants
      </v-btn>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useRestaurantStore } from '@/stores/restaurants'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const restaurantStore = useRestaurantStore()
const cartStore = useCartStore()
const userStore = useUserStore()
const showNotification = inject('showNotification', () => {})

const restaurant = computed(() => restaurantStore.getRestaurantById(route.params.id))
const activeCategory = ref('all')
const vegFilter = ref('all')

// Get menu categories using Set (DS)
const menuCategories = computed(() => {
  if (!restaurant.value) return []
  const cats = new Set()
  restaurant.value.menu.forEach((item) => cats.add(item.category))
  return Array.from(cats)
})

const getCategoryCount = (cat) => {
  if (!restaurant.value) return 0
  return restaurant.value.menu.filter((item) => item.category === cat).length
}

// Filtered menu — O(n) array filter
const filteredMenu = computed(() => {
  if (!restaurant.value) return []
  let items = [...restaurant.value.menu]

  // Category filter
  if (activeCategory.value && activeCategory.value !== 'all') {
    items = items.filter((item) => item.category === activeCategory.value)
  }

  // Veg filter
  if (vegFilter.value === 'veg') {
    items = items.filter((item) => item.isVeg)
  } else if (vegFilter.value === 'nonveg') {
    items = items.filter((item) => !item.isVeg)
  }

  return items
})

const getItemQty = (itemId) => {
  if (!restaurant.value) return 0
  return cartStore.getItemQuantity(itemId, restaurant.value.id)
}

const addItem = (item) => {
  // Check if cart has items from a different restaurant
  if (cartStore.cartRestaurantId && cartStore.cartRestaurantId !== restaurant.value.id) {
    if (confirm('Your cart has items from a different restaurant. Clear cart and add this item?')) {
      cartStore.clearCart()
    } else {
      return
    }
  }
  cartStore.addToCart(item, restaurant.value.id, restaurant.value.name)
  showNotification(`${item.name} added to cart!`, 'primary', 'mdi-cart-plus')
}

const updateQty = (item, delta) => {
  cartStore.updateQuantity(item, restaurant.value.id, delta)
}

// Track recently viewed
onMounted(() => {
  if (restaurant.value) {
    userStore.addToRecentlyViewed(restaurant.value)
  }
})
</script>

<style scoped>
.veg-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
}

.veg-pill-btn {
  letter-spacing: 0.01em;
  font-size: 0.82rem;
  padding: 0 16px !important;
  height: 32px !important;
}

.menu-header {
  position: relative;
  margin-bottom: 32px;
}

.menu-header__image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 300px;
  overflow: hidden;
}

.menu-header__bg {
  opacity: 0.4;
}

.menu-header__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(10, 10, 15, 0.9) 70%, rgba(10, 10, 15, 1) 100%);
}

.v-theme--feastflowLight .menu-header__overlay {
  background: linear-gradient(to bottom, transparent 0%, rgba(250, 250, 250, 0.9) 70%, rgba(250, 250, 250, 1) 100%);
}

.menu-header__content {
  position: relative;
  z-index: 2;
  padding-top: 100px;
  padding-bottom: 24px;
}

.menu-stat {
  border-radius: 16px !important;
  min-width: 80px;
}

.menu-tabs-wrapper {
  overflow-x: auto;
  scrollbar-width: none;
}
.menu-tabs-wrapper::-webkit-scrollbar {
  display: none;
}

.menu-item-card {
  overflow: hidden;
  transition: var(--ff-transition-smooth);
}

.menu-item-card__image {
  position: relative;
  flex-shrink: 0;
  padding: 12px;
  padding-right: 0;
}

.menu-item-card__bestseller {
  position: absolute;
  bottom: 16px;
  left: 12px;
  font-size: 0.6rem !important;
}

.add-btn {
  min-width: 70px;
  letter-spacing: 0.5px;
}

.qty-controls {
  background: rgba(255, 107, 53, 0.1);
  border-radius: 10px;
  padding: 2px;
}

.qty-value {
  min-width: 20px;
  text-align: center;
}

.sticky-cart-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 12px 0;
}

@media (max-width: 600px) {
  .menu-header__content {
    padding-top: 80px;
  }
  
  .menu-stat {
    min-width: 65px;
  }

  .menu-item-card__image {
    padding: 8px;
    padding-right: 0;
  }

  .menu-item-card__image .v-img {
    width: 100px !important;
    height: 100px !important;
  }
}
</style>
