<template>
  <section class="ff-section" id="featured-section">
    <v-container style="max-width: 1280px;">
      <div class="d-flex justify-space-between align-center mb-6">
        <div>
          <h2 class="ff-section-title ff-heading">Featured Restaurants ⭐</h2>
          <p class="ff-section-subtitle">Top-rated restaurants curated just for you</p>
        </div>
        <v-btn 
          variant="text" 
          color="primary" 
          class="text-none font-weight-bold" 
          append-icon="mdi-arrow-right"
          :to="{ name: 'Restaurants' }"
          id="featured-see-all"
        >
          See All
        </v-btn>
      </div>

      <v-row>
        <v-col 
          v-for="(restaurant, index) in featuredRestaurants" 
          :key="restaurant.id" 
          cols="12" 
          sm="6" 
          md="4"
          class="animate-fade-up"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <v-card
            class="restaurant-card glass-card hover-lift"
            :to="`/restaurant/${restaurant.id}`"
            :id="`featured-card-${restaurant.id}`"
          >
            <!-- Image -->
            <div class="restaurant-card__image ff-image-overlay">
              <v-img
                :src="restaurant.image"
                height="200"
                cover
                class="rounded-t-xl"
              >
                <template #placeholder>
                  <div class="d-flex align-center justify-center fill-height shimmer">
                    <v-icon icon="mdi-image" size="40" style="opacity: 0.3;" />
                  </div>
                </template>
              </v-img>
              
              <!-- Badges overlay -->
              <div class="restaurant-card__badges">
                <v-chip 
                  v-if="restaurant.promoted" 
                  size="x-small" 
                  color="primary" 
                  class="font-weight-bold"
                >
                  <v-icon icon="mdi-lightning-bolt" size="12" class="mr-1" />
                  PROMOTED
                </v-chip>
              </div>

              <!-- Delivery time overlay -->
              <div class="restaurant-card__delivery-time">
                <v-chip size="small" class="font-weight-bold" color="black">
                  <v-icon icon="mdi-clock-outline" size="14" class="mr-1" />
                  {{ restaurant.deliveryTime }} min
                </v-chip>
              </div>

              <!-- Favorite button -->
              <v-btn
                icon
                size="x-small"
                variant="flat"
                class="restaurant-card__fav"
                :color="userStore.isFavorite(restaurant.id) ? 'red' : 'grey-darken-3'"
                @click.prevent="toggleFav(restaurant.id)"
              >
                <v-icon 
                  :icon="userStore.isFavorite(restaurant.id) ? 'mdi-heart' : 'mdi-heart-outline'" 
                  size="16"
                  :color="userStore.isFavorite(restaurant.id) ? 'white' : 'white'"
                />
              </v-btn>
            </div>

            <!-- Content -->
            <v-card-text class="pa-4">
              <div class="d-flex justify-space-between align-start mb-1">
                <h3 class="text-body-1 font-weight-bold text-truncate" style="max-width: 70%;">
                  {{ restaurant.name }}
                </h3>
                <div 
                  class="ff-rating"
                  :class="ratingClass(restaurant.rating)"
                >
                  <v-icon icon="mdi-star" size="12" />
                  {{ restaurant.rating }}
                </div>
              </div>

              <div class="d-flex align-center ga-2 mb-2">
                <span class="text-body-2" style="opacity: 0.5;">
                  {{ restaurant.cuisine.slice(0, 3).join(', ') }}
                </span>
              </div>

              <div class="d-flex align-center justify-space-between">
                <div class="d-flex align-center ga-1">
                  <span class="text-body-2" style="opacity: 0.5;">
                    {{ priceLabel(restaurant.priceRange) }}
                  </span>
                </div>
                <span class="text-body-2" :style="{ opacity: 0.5, color: restaurant.deliveryFee === 0 ? '#4CAF50' : '' }">
                  {{ restaurant.deliveryFee === 0 ? 'FREE delivery' : `₹${restaurant.deliveryFee} delivery` }}
                </span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { useRestaurantStore } from '@/stores/restaurants'
import { useUserStore } from '@/stores/user'

const restaurantStore = useRestaurantStore()
const userStore = useUserStore()

const featuredRestaurants = restaurantStore.featuredRestaurants

const ratingClass = (rating) => {
  if (rating >= 4.0) return 'ff-rating-high'
  if (rating >= 3.0) return 'ff-rating-medium'
  return 'ff-rating-low'
}

const priceLabel = (range) => {
  const prices = { 1: '₹200 for two', 2: '₹400 for two', 3: '₹600 for two', 4: '₹800+ for two' }
  return prices[range] || '₹400 for two'
}

const toggleFav = (id) => {
  userStore.toggleFavorite(id)
}
</script>

<style scoped>
.restaurant-card {
  transition: var(--ff-transition-smooth);
  overflow: hidden;
}

.restaurant-card__image {
  position: relative;
}

.restaurant-card__badges {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 2;
}

.restaurant-card__delivery-time {
  position: absolute;
  bottom: 12px;
  left: 12px;
  z-index: 2;
}

.restaurant-card__fav {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  opacity: 0.9;
}

.restaurant-card__fav:hover {
  opacity: 1;
  transform: scale(1.1);
}
</style>
