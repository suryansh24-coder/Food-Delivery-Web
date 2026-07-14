<template>
  <div class="restaurants-page" id="restaurants-view">
    <!-- Header -->
    <section class="restaurants-header">
      <v-container style="max-width: 1280px;">
        <div class="pt-8 pb-4">
          <h1 class="ff-heading text-h4 font-weight-bold mb-1 animate-fade-up" id="restaurants-title">
            All Restaurants 🍽️
          </h1>
          <p class="text-body-1 animate-fade-up delay-100" style="opacity: 0.5;">
            {{ filteredRestaurants.length }} restaurants available near you
          </p>
        </div>
      </v-container>
    </section>

    <!-- Filter Bar -->
    <section class="filter-section" id="filter-bar">
      <v-container style="max-width: 1280px;">
        <div class="d-flex flex-column flex-md-row ga-4 align-md-center py-4">
          <!-- Search -->
          <v-text-field
            v-model="searchQuery"
            placeholder="Search restaurants, cuisines..."
            prepend-inner-icon="mdi-magnify"
            variant="solo-filled"
            rounded="xl"
            density="compact"
            hide-details
            clearable
            class="search-field"
            style="max-width: 400px;"
            @update:model-value="handleSearch"
            id="restaurants-search"
          />

          <v-spacer class="d-none d-md-flex" />

          <!-- Sort -->
          <v-select
            v-model="currentSort"
            :items="sortOptions"
            item-title="label"
            item-value="value"
            variant="solo-filled"
            rounded="pill"
            density="compact"
            hide-details
            prepend-inner-icon="mdi-sort"
            class="sort-select"
            style="max-width: 190px;"
            @update:model-value="handleSort"
            id="restaurants-sort"
          />
        </div>

        <!-- Category Chips -->
        <div class="category-chips d-flex ga-2 pb-4 overflow-x-auto" id="restaurants-category-chips">
          <v-chip
            :color="!selectedCategory ? 'primary' : 'default'"
            :variant="!selectedCategory ? 'flat' : 'tonal'"
            rounded="pill"
            class="font-weight-medium text-none flex-shrink-0"
            @click="clearCategoryFilter"
            id="category-chip-all"
          >
            All
          </v-chip>
          <v-chip
            v-for="cat in categories"
            :key="cat.id"
            :color="selectedCategory === cat.name ? 'primary' : 'default'"
            :variant="selectedCategory === cat.name ? 'flat' : 'tonal'"
            rounded="pill"
            class="font-weight-medium text-none flex-shrink-0"
            @click="handleCategoryFilter(cat.name)"
            :id="`category-chip-${cat.id}`"
          >
            {{ cat.emoji }} {{ cat.name }}
          </v-chip>
        </div>

        <!-- Active Filters -->
        <div v-if="hasActiveFilters" class="d-flex align-center flex-wrap ga-2 pb-4">
          <span class="text-body-2" style="opacity: 0.5;">Active filters:</span>
          <v-chip
            v-if="locationQuery"
            size="small"
            closable
            color="primary"
            variant="tonal"
            prepend-icon="mdi-map-marker"
            @click:close="clearLocationFilter"
          >
            Near: {{ locationQuery }}
          </v-chip>
          <v-chip
            v-if="searchQuery"
            size="small"
            closable
            color="primary"
            variant="tonal"
            @click:close="clearSearchFilter"
          >
            Search: "{{ searchQuery }}"
          </v-chip>
          <v-chip
            v-if="selectedCategory"
            size="small"
            closable
            color="primary"
            variant="tonal"
            @click:close="clearCategoryFilter"
          >
            {{ selectedCategory }}
          </v-chip>
          <v-btn
            variant="text"
            size="x-small"
            color="primary"
            class="text-none"
            @click="clearAllFilters"
            id="clear-all-filters"
          >
            Clear all
          </v-btn>
        </div>
      </v-container>
    </section>

    <!-- Restaurant Grid -->
    <section class="restaurant-grid-section" id="restaurant-grid">
      <v-container style="max-width: 1280px;">
        <v-row v-if="filteredRestaurants.length > 0">
          <v-col
            v-for="(restaurant, index) in filteredRestaurants"
            :key="restaurant.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
            class="animate-fade-up"
            :style="{ animationDelay: `${index * 0.05}s` }"
          >
            <v-card
              class="restaurant-card glass-card hover-lift"
              :to="`/restaurant/${restaurant.id}`"
              :id="`restaurant-card-${restaurant.id}`"
            >
              <div class="restaurant-card__image ff-image-overlay">
                <v-img :src="restaurant.image" height="180" cover class="rounded-t-xl">
                  <template #placeholder>
                    <div class="d-flex align-center justify-center fill-height shimmer">
                      <v-icon icon="mdi-image" size="36" style="opacity: 0.3;" />
                    </div>
                  </template>
                </v-img>

                <div class="restaurant-card__badges">
                  <v-chip v-if="restaurant.promoted" size="x-small" color="primary" class="font-weight-bold">
                    <v-icon icon="mdi-lightning-bolt" size="12" class="mr-1" />
                    PROMOTED
                  </v-chip>
                </div>

                <div class="restaurant-card__delivery-time">
                  <v-chip size="x-small" class="font-weight-bold" color="black">
                    <v-icon icon="mdi-clock-outline" size="12" class="mr-1" />
                    {{ restaurant.deliveryTime }} min
                  </v-chip>
                </div>

                <v-btn
                  icon
                  size="x-small"
                  variant="flat"
                  class="restaurant-card__fav"
                  :color="userStore.isFavorite(restaurant.id) ? 'red' : 'grey-darken-3'"
                  @click.prevent="userStore.toggleFavorite(restaurant.id)"
                >
                  <v-icon
                    :icon="userStore.isFavorite(restaurant.id) ? 'mdi-heart' : 'mdi-heart-outline'"
                    size="14"
                    color="white"
                  />
                </v-btn>
              </div>

              <v-card-text class="pa-3">
                <div class="d-flex justify-space-between align-start mb-1">
                  <h3 class="text-body-2 font-weight-bold text-truncate" style="max-width: 65%;">
                    {{ restaurant.name }}
                  </h3>
                  <div
                    class="ff-rating"
                    :class="restaurant.rating >= 4 ? 'ff-rating-high' : restaurant.rating >= 3 ? 'ff-rating-medium' : 'ff-rating-low'"
                    style="font-size: 0.7rem; padding: 2px 6px;"
                  >
                    <v-icon icon="mdi-star" size="10" />
                    {{ restaurant.rating }}
                  </div>
                </div>

                <p class="text-caption mb-2" style="opacity: 0.5;">
                  {{ restaurant.cuisine.slice(0, 3).join(' • ') }}
                </p>

                <div class="d-flex justify-space-between align-center">
                  <span class="text-caption" style="opacity: 0.5;">
                    {{ restaurant.priceRange === 1 ? '₹200 for two' : restaurant.priceRange === 2 ? '₹400 for two' : restaurant.priceRange === 3 ? '₹600 for two' : '₹800+ for two' }}
                  </span>
                  <span class="text-caption" :style="{ opacity: 0.5, color: restaurant.deliveryFee === 0 ? '#4CAF50' : '' }">
                    {{ restaurant.deliveryFee === 0 ? 'FREE delivery' : `₹${restaurant.deliveryFee} delivery` }}
                  </span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <v-icon icon="mdi-store-search" size="80" style="opacity: 0.2;" class="mb-4" />
          <h3 class="ff-heading text-h6 mb-2">No restaurants found</h3>
          <p class="text-body-2" style="opacity: 0.5; max-width: 400px; margin: 0 auto;">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <v-btn color="primary" variant="tonal" class="mt-4 text-none" @click="clearAllFilters" id="empty-clear-filters">
            Clear Filters
          </v-btn>
        </div>
      </v-container>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRestaurantStore } from '@/stores/restaurants'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const restaurantStore = useRestaurantStore()
const userStore = useUserStore()

const { filteredRestaurants, categories, searchQuery, locationQuery, selectedCategory, sortBy } = storeToRefs(restaurantStore)

const currentSort = computed({
  get: () => sortBy.value,
  set: (val) => restaurantStore.setSortBy(val),
})

const sortOptions = [
  { label: 'Default', value: 'default' },
  { label: 'Rating: High to Low', value: 'rating' },
  { label: 'Delivery Time', value: 'deliveryTime' },
  { label: 'Price: Low to High', value: 'priceLow' },
  { label: 'Price: High to Low', value: 'priceHigh' },
]

const hasActiveFilters = computed(() => {
  return searchQuery.value || selectedCategory.value || locationQuery.value
})

const handleSearch = (val) => {
  restaurantStore.setSearchQuery(val || '')
}

const handleSort = (val) => {
  restaurantStore.setSortBy(val)
}

const handleCategoryFilter = (name) => {
  restaurantStore.setCategory(name)
}

const clearCategoryFilter = () => {
  restaurantStore.setCategory(null)
}

const clearSearchFilter = () => {
  restaurantStore.setSearchQuery('')
}

const clearLocationFilter = () => {
  restaurantStore.setLocationQuery('')
}

const clearAllFilters = () => {
  restaurantStore.clearFilters()
}
</script>

<style scoped>
.restaurants-header {
  padding-top: 20px;
}

.category-chips {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.category-chips::-webkit-scrollbar {
  display: none;
}

.restaurant-card {
  overflow: hidden;
  transition: var(--ff-transition-smooth);
}

.restaurant-card__image {
  position: relative;
}

.restaurant-card__badges {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
}

.restaurant-card__delivery-time {
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 2;
}

.restaurant-card__fav {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  opacity: 0.85;
}

.restaurant-card__fav:hover {
  opacity: 1;
  transform: scale(1.1);
}

.search-field :deep(.v-field) {
  min-height: 40px;
  border-radius: 50px !important;
}

.sort-select :deep(.v-field) {
  min-height: 38px;
  border-radius: 50px !important;
  font-size: 0.85rem;
}

.sort-select :deep(.v-field__input) {
  padding-top: 6px;
  padding-bottom: 6px;
}

.sort-select :deep(.v-select__menu-icon) {
  margin-inline-start: 0;
}
</style>
