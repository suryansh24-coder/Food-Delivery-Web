<template>
  <section class="ff-section promo-section" id="promo-section">
    <v-container style="max-width: 1280px;">
      <div class="text-center mb-8">
        <h2 class="ff-section-title ff-heading">Today's Deals 🎉</h2>
        <p class="ff-section-subtitle">Exclusive offers you don't want to miss</p>
      </div>

      <v-row>
        <v-col 
          v-for="(promo, index) in promos" 
          :key="promo.id" 
          cols="12" 
          md="4"
          class="animate-fade-up"
          :style="{ animationDelay: `${index * 0.15}s` }"
        >
          <div 
            class="promo-card hover-lift"
            :style="{ background: `linear-gradient(135deg, ${promo.gradient[0]}, ${promo.gradient[1]})` }"
            :id="`promo-card-${promo.id}`"
          >
            <div class="promo-card__bg-icon">
              <v-icon :icon="promo.icon" size="120" />
            </div>
            <div class="promo-card__content">
              <v-icon :icon="promo.icon" size="32" color="white" class="mb-2" />
              <h3 class="text-h5 font-weight-bold white--text ff-heading mb-1" style="color: white;">
                {{ promo.title }}
              </h3>
              <p class="text-body-2 mb-3" style="color: rgba(255,255,255,0.85);">
                {{ promo.subtitle }}
              </p>
              <v-chip color="white" variant="flat" size="small" class="font-weight-bold">
                Code: {{ promo.code }}
              </v-chip>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { useRestaurantStore } from '@/stores/restaurants'
const restaurantStore = useRestaurantStore()
const promos = restaurantStore.promos
</script>

<style scoped>
.promo-card {
  position: relative;
  border-radius: 20px;
  padding: 32px 28px;
  overflow: hidden;
  min-height: 180px;
  cursor: pointer;
  transition: var(--ff-transition-smooth);
}

.promo-card__bg-icon {
  position: absolute;
  right: -20px;
  bottom: -20px;
  opacity: 0.15;
}

.promo-card__content {
  position: relative;
  z-index: 2;
}

.promo-card:hover {
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}
</style>
