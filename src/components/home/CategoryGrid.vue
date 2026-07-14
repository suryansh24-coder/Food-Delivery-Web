<template>
  <section class="ff-section" id="category-section">
    <v-container style="max-width: 1280px;">
      <div class="mb-8">
        <h2 class="ff-section-title ff-heading animate-fade-up">Order our best food options</h2>
        <p class="ff-section-subtitle animate-fade-up delay-100">Explore cuisines from around the world</p>
      </div>

      <v-row justify="start" class="category-grid">
        <v-col 
          v-for="(cat, index) in categories" 
          :key="cat.id" 
          cols="4" 
          sm="3" 
          md="2"
          class="animate-fade-up"
          :style="{ animationDelay: `${index * 0.06}s` }"
        >
          <div
            class="category-card text-center"
            :class="{ 'category-card--active': selectedCategory === cat.name }"
            @click="selectCategory(cat.name)"
            :id="`category-${cat.id}`"
          >
            <div class="category-img-wrapper mx-auto mb-2">
              <v-img
                :src="cat.image"
                width="100"
                height="100"
                cover
                class="category-img"
              >
                <template #placeholder>
                  <div class="d-flex align-center justify-center fill-height shimmer" style="border-radius: 50%;">
                    <span class="category-emoji-fallback">{{ cat.emoji }}</span>
                  </div>
                </template>
              </v-img>
            </div>
            <span class="category-name text-body-2 font-weight-medium">{{ cat.name }}</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRestaurantStore } from '@/stores/restaurants'

const router = useRouter()
const restaurantStore = useRestaurantStore()

const categories = restaurantStore.categories
const selectedCategory = ref(null)

const selectCategory = (categoryName) => {
  selectedCategory.value = categoryName
  restaurantStore.setCategory(categoryName)
  router.push({ name: 'Restaurants' })
}
</script>

<style scoped>
.category-card {
  cursor: pointer;
  padding: 12px 8px;
  border-radius: 16px;
  transition: var(--ff-transition-smooth);
}

.category-card:hover {
  transform: translateY(-6px);
}

.category-card--active .category-img-wrapper {
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.3);
}

.category-img-wrapper {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  transition: var(--ff-transition-smooth);
  background: transparent;
}

.category-card:hover .category-img-wrapper {
  transform: scale(1.08);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.category-img {
  border-radius: 50%;
}

.category-emoji-fallback {
  font-size: 2rem;
}

.category-name {
  opacity: 0.85;
  transition: var(--ff-transition-smooth);
  font-weight: 500 !important;
}

.category-card:hover .category-name {
  opacity: 1;
  color: #FF6B35;
}

@media (max-width: 600px) {
  .category-img-wrapper {
    width: 72px;
    height: 72px;
  }
}
</style>
