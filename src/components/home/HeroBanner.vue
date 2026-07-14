<template>
  <section class="hero-section" id="hero-banner">
    <div class="hero-bg-pattern" />
    <div class="hero-glow hero-glow-1" />
    <div class="hero-glow hero-glow-2" />

    <!-- ── Hero Visual: circular food image ────────────────────────── -->
    <div class="hero-visual d-none d-md-block" aria-hidden="true">
      <div class="hero-visual-ring">
        <img
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&h=700&fit=crop"
          class="hero-visual-img"
          alt=""
          draggable="false"
        />
      </div>
    </div>

    <!-- ── Floating Info Cards ────────────────────────────────────── -->
    <!-- Burger card — upper right -->
    <div class="hero-float-card fc-burger glass-card d-none d-md-flex align-center ga-3" id="float-burger">
      <v-avatar size="44" rounded="lg">
        <v-img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop" cover />
      </v-avatar>
      <div>
        <div class="text-body-2 font-weight-bold">Classic Smash Burger</div>
        <div class="ff-price text-body-2">₹280</div>
      </div>
    </div>

    <!-- Margherita Pizza — mid-right -->
    <div class="hero-float-card fc-pizza glass-card d-none d-md-flex align-center ga-3" id="float-pizza">
      <v-avatar size="38" rounded="lg">
        <v-img src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=100&h=100&fit=crop" cover />
      </v-avatar>
      <div>
        <div class="text-body-2 font-weight-bold">Margherita Pizza</div>
        <div class="d-flex align-center ga-1">
          <v-icon icon="mdi-star" color="amber" size="12" />
          <span class="text-caption font-weight-medium">4.6</span>
        </div>
      </div>
    </div>

    <!-- Delivery tracker — lower right -->
    <div class="hero-float-card fc-delivery glass-card d-none d-md-flex align-center ga-3" id="float-delivery">
      <v-icon icon="mdi-truck-fast" color="primary" size="24" />
      <div style="min-width: 110px;">
        <div class="text-body-2 font-weight-bold text-primary">On the way!</div>
        <div class="text-caption mb-1" style="opacity: 0.6;">Arriving in 15 min</div>
        <v-progress-linear color="primary" model-value="65" rounded height="3" />
      </div>
    </div>

    <!-- ── Hero Content ──────────────────────────────────────────── -->
    <v-container style="max-width: 1280px;" class="hero-content position-relative">
      <v-row align="center" style="min-height: 80vh;">
        <v-col cols="12" md="8" lg="7" class="hero-text-col">
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

          <!-- Search Bar -->
          <div class="hero-search animate-fade-up delay-300" id="hero-search">
            <div class="hero-search-row d-flex ga-3 align-center">
              <!-- Location field -->
              <v-text-field
                v-model="locationInput"
                placeholder="Your location..."
                prepend-inner-icon="mdi-map-marker"
                variant="solo"
                rounded="xl"
                hide-details
                density="comfortable"
                clearable
                class="hero-location-input"
                id="hero-location-input"
                @update:model-value="handleLocation"
                @click:clear="clearLocation"
              />

              <!-- Search field -->
              <v-text-field
                v-model="searchInput"
                placeholder="Search restaurants, cuisines or dishes..."
                prepend-inner-icon="mdi-magnify"
                variant="solo"
                rounded="xl"
                hide-details
                density="comfortable"
                class="hero-search-input"
                id="hero-search-input"
                @keyup.enter="handleSearch"
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

            <!-- Active location indicator -->
            <v-expand-transition>
              <div v-if="locationInput" class="location-hint d-flex align-center ga-2 mt-3">
                <v-icon icon="mdi-map-marker-check" color="primary" size="16" />
                <span class="text-caption">
                  Showing restaurants near <strong>{{ locationInput }}</strong>
                </span>
              </div>
            </v-expand-transition>
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

const handleLocation = (val) => {
  restaurantStore.setLocationQuery(val || '')
}

const clearLocation = () => {
  locationInput.value = ''
  restaurantStore.setLocationQuery('')
}

const handleSearch = () => {
  restaurantStore.setSearchQuery(searchInput.value.trim())
  router.push({ name: 'Restaurants' })
}
</script>

<style scoped>
/* ── Hero Section ──────────────────────────────────────────────────── */
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
  background-image:
    radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 138, 101, 0.06) 0%, transparent 50%);
}

.hero-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
}
.hero-glow-1 { width: 400px; height: 400px; background: #FF6B35; top: 10%; left: -10%; }
.hero-glow-2 { width: 300px; height: 300px; background: #FF8A65; bottom: 10%; right: -5%; }

/* ── Hero Visual (circular food image) ──────────────────────────── */
.hero-visual {
  position: absolute;
  right: -100px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 1;
}

.hero-visual-ring {
  width: 420px;
  height: 420px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow:
    0 32px 100px rgba(255, 107, 53, 0.18),
    0 0 0 6px  rgba(255, 107, 53, 0.10),
    0 0 0 14px rgba(255, 107, 53, 0.04);
}

.hero-visual-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  user-select: none;
  -webkit-user-drag: none;
}

/* ── Floating Cards ──────────────────────────────────────────────── */
.hero-float-card {
  position: absolute;
  padding: 12px 16px;
  border-radius: 16px;
  z-index: 3;
  backdrop-filter: blur(12px);
}

/* Burger — top right */
.fc-burger {
  top: 16%;
  right: 3%;
  animation: float-y 3.5s ease-in-out infinite;
}

/* Pizza — pulled back from platter, between burger and delivery */
.fc-pizza {
  top: 44%;
  right: 19%;
  animation: float-y 4s ease-in-out infinite;
  animation-delay: 0.7s;
}

/* Delivery — lower right */
.fc-delivery {
  bottom: 17%;
  right: 3%;
  animation: float-y 3.8s ease-in-out infinite;
  animation-delay: 1.4s;
}

@keyframes float-y {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-9px); }
}

/* ── Hero Text ───────────────────────────────────────────────────── */
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

/* ── Search ──────────────────────────────────────────────────────── */
.hero-search { max-width: 680px; }

.hero-search-row { flex-wrap: wrap; }

.hero-location-input { max-width: 220px; flex-shrink: 0; }
.hero-location-input :deep(.v-field) { min-height: 56px; border-radius: 16px !important; }
.hero-location-input :deep(.v-field__input) { text-align: center; }
.hero-location-input :deep(input) { color: inherit !important; }

.hero-search-input { flex: 1; min-width: 250px; }
.hero-search-input :deep(.v-field) { padding-right: 8px !important; min-height: 56px; border-radius: 16px !important; }
.hero-search-input :deep(.v-field__input) { text-align: center; }
.hero-search-input :deep(input) { color: inherit !important; }

.location-hint { opacity: 0.75; }

/* ── Stats ───────────────────────────────────────────────────────── */
.stat-value { font-size: 1.4rem; font-weight: 800; }
.stat-label { font-size: 0.8rem; opacity: 0.5; margin-top: 2px; }
.stat-divider { width: 1px; height: 40px; background: rgba(128, 128, 128, 0.25); }

/* ── Mobile ──────────────────────────────────────────────────────── */
@media (max-width: 960px) {
  .hero-section { min-height: auto; padding-top: 80px; padding-bottom: 60px; }
  .hero-text-col { text-align: center; }
  .hero-subtitle { margin-left: auto; margin-right: auto; }
  .hero-search { margin-left: auto; margin-right: auto; }
  .hero-search-row { flex-direction: column; }
  .hero-location-input { max-width: 100%; }
  .hero-stats { justify-content: center; }
  .location-hint { justify-content: center; }
}
</style>
