<template>
  <section class="hero-section" id="hero-banner">
    <div class="hero-bg-pattern" />
    <div class="hero-glow hero-glow-1" />
    <div class="hero-glow hero-glow-2" />
    
    <v-container style="max-width: 1280px;" class="hero-content position-relative">
      <v-row align="center" style="min-height: 80vh;">
        <v-col cols="12" md="7" class="hero-text-col">
          <div class="animate-fade-up">
            <v-chip color="primary" variant="tonal" size="small" class="mb-4" prepend-icon="mdi-fire">
              <span class="font-weight-bold">🔥 #1 Food Delivery Platform</span>
            </v-chip>
          </div>
          
          <h1 class="hero-title ff-heading animate-fade-up delay-100" id="hero-title">
            Discover the <span class="gradient-text">Finest Flavors</span> 
            <br class="d-none d-sm-block" />
            Delivered to Your Door
          </h1>
          
          <p class="hero-subtitle animate-fade-up delay-200" id="hero-subtitle">
            From local favorites to premium dining — order from 500+ restaurants 
            and enjoy fast delivery with real-time tracking.
          </p>

          <!-- Search Bar with Location -->
          <div class="hero-search animate-fade-up delay-300" id="hero-search">
            <div class="hero-search-row d-flex ga-3 align-center">
              <!-- Location Search -->
              <v-text-field
                v-model="locationInput"
                placeholder="📍 Your location..."
                prepend-inner-icon="mdi-map-marker"
                variant="solo"
                rounded="xl"
                hide-details
                class="hero-location-input"
                density="comfortable"
                id="hero-location-input"
              />

              <!-- Food/Restaurant Search -->
              <v-text-field
                v-model="searchInput"
                placeholder="Search for restaurants, cuisines, or dishes..."
                prepend-inner-icon="mdi-magnify"
                variant="solo"
                rounded="xl"
                hide-details
                class="hero-search-input"
                @keyup.enter="handleSearch"
                id="hero-search-input"
              >
                <template #append-inner>
                  <v-btn 
                    color="primary" 
                    rounded="xl" 
                    size="small"
                    class="text-none font-weight-bold"
                    @click="handleSearch"
                    id="hero-search-btn"
                  >
                    <v-icon icon="mdi-magnify" class="mr-1" />
                    Search
                  </v-btn>
                </template>
              </v-text-field>
            </div>
          </div>

          <!-- Stats -->
          <div class="hero-stats d-flex ga-6 mt-8 animate-fade-up delay-400" id="hero-stats">
            <div class="stat-item">
              <div class="stat-value ff-heading gradient-text">500+</div>
              <div class="stat-label">Restaurants</div>
            </div>
            <div class="stat-divider" />
            <div class="stat-item">
              <div class="stat-value ff-heading gradient-text">10K+</div>
              <div class="stat-label">Happy Users</div>
            </div>
            <div class="stat-divider" />
            <div class="stat-item">
              <div class="stat-value ff-heading gradient-text">25 min</div>
              <div class="stat-label">Avg Delivery</div>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="5" class="d-none d-md-flex justify-center">
          <div class="hero-visual animate-fade-right delay-200" id="hero-visual">
            <div class="hero-card hero-card-1 glass-card">
              <div class="d-flex align-center ga-3">
                <v-avatar size="50" rounded="lg">
                  <v-img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop" cover />
                </v-avatar>
                <div>
                  <div class="text-body-2 font-weight-bold">Classic Smash Burger</div>
                  <div class="ff-price text-body-2">₹280</div>
                </div>
              </div>
            </div>

            <div class="hero-card hero-card-2 glass-card">
              <div class="d-flex align-center ga-3">
                <v-avatar size="50" rounded="lg">
                  <v-img src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=100&h=100&fit=crop" cover />
                </v-avatar>
                <div>
                  <div class="text-body-2 font-weight-bold">Margherita Pizza</div>
                  <div class="d-flex align-center ga-2">
                    <v-icon icon="mdi-star" color="amber" size="14" />
                    <span class="text-body-2 font-weight-medium">4.6</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="hero-card hero-card-3 glass-card">
              <div class="d-flex align-center ga-2">
                <v-icon icon="mdi-truck-fast" color="primary" size="24" />
                <div>
                  <div class="text-body-2 font-weight-bold text-primary">On the way!</div>
                  <div class="text-caption" style="opacity: 0.6;">Arriving in 15 min</div>
                </div>
              </div>
              <v-progress-linear color="primary" model-value="65" rounded class="mt-2" height="4" />
            </div>

            <!-- Center food image circle -->
            <div class="hero-center-image">
              <v-img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop" 
                cover
                class="rounded-circle"
                width="250"
                height="250"
              />
            </div>
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
const searchInput = ref('')
const locationInput = ref('')

const handleSearch = () => {
  restaurantStore.setSearchQuery(searchInput.value.trim())
  router.push({ name: 'Restaurants' })
}
</script>

<style scoped>
.hero-section {
  position: relative;
  overflow: hidden;
  min-height: 90vh;
  display: flex;
  align-items: center;
}

.hero-bg-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.08) 0%, transparent 50%),
                     radial-gradient(circle at 80% 20%, rgba(255, 138, 101, 0.06) 0%, transparent 50%);
}

.hero-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
}

.hero-glow-1 {
  width: 400px;
  height: 400px;
  background: #FF6B35;
  top: 10%;
  left: -10%;
}

.hero-glow-2 {
  width: 300px;
  height: 300px;
  background: #FF8A65;
  bottom: 10%;
  right: -5%;
}

.hero-title {
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  line-height: 1.15;
  margin-bottom: 1.2rem;
  letter-spacing: -0.03em;
}

.hero-subtitle {
  font-size: clamp(1rem, 2vw, 1.15rem);
  line-height: 1.7;
  opacity: 0.6;
  max-width: 520px;
  margin-bottom: 2rem;
}

.hero-search {
  max-width: 680px;
}

.hero-search-row {
  flex-wrap: wrap;
}

.hero-location-input {
  max-width: 220px;
  flex-shrink: 0;
}

.hero-location-input :deep(.v-field) {
  min-height: 56px;
  border-radius: 16px !important;
}

.hero-search-input {
  flex: 1;
  min-width: 250px;
}

.hero-search-input :deep(.v-field) {
  padding-right: 8px !important;
  min-height: 56px;
}

.hero-search-input :deep(.v-field__input) {
  text-align: center;
}

.stat-value {
  font-size: 1.4rem;
  font-weight: 800;
}

.stat-label {
  font-size: 0.8rem;
  opacity: 0.5;
  margin-top: 2px;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
}

/* Hero Visual Cards */
.hero-visual {
  position: relative;
  width: 350px;
  height: 400px;
}

.hero-center-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(255, 107, 53, 0.2);
  border: 3px solid rgba(255, 107, 53, 0.3);
  animation: float 4s ease-in-out infinite;
}

.hero-card {
  position: absolute;
  padding: 14px 18px;
  border-radius: 16px !important;
  z-index: 2;
  min-width: 220px;
}

.hero-card-1 {
  top: 0;
  left: -30px;
  animation: float 3s ease-in-out infinite;
}

.hero-card-2 {
  bottom: 50px;
  right: -40px;
  animation: float 3.5s ease-in-out infinite 0.5s;
}

.hero-card-3 {
  bottom: -10px;
  left: -20px;
  animation: float 4s ease-in-out infinite 1s;
}

@media (max-width: 960px) {
  .hero-section {
    min-height: auto;
    padding-top: 80px;
    padding-bottom: 60px;
  }
  
  .hero-text-col {
    text-align: center;
  }

  .hero-subtitle {
    margin-left: auto;
    margin-right: auto;
  }
  
  .hero-search {
    margin-left: auto;
    margin-right: auto;
  }

  .hero-search-row {
    flex-direction: column;
  }

  .hero-location-input {
    max-width: 100%;
  }

  .hero-stats {
    justify-content: center;
  }
}
</style>
