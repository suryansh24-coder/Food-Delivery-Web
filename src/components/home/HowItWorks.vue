<template>
  <section class="ff-section how-it-works-section" id="how-it-works-section">
    <v-container style="max-width: 1280px;">
      <div class="text-center mb-10">
        <h2 class="ff-section-title ff-heading">How It Works ✨</h2>
        <p class="ff-section-subtitle">Get your food in 3 simple steps</p>
      </div>

      <v-row justify="center">
        <v-col 
          v-for="(step, index) in steps" 
          :key="index" 
          cols="12" 
          md="4"
          class="animate-fade-up"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <div class="step-card text-center" :id="`how-step-${index + 1}`">
            <div class="step-icon-wrapper mx-auto mb-4">
              <div class="step-icon-bg gradient-bg-primary">
                <v-icon :icon="step.icon" size="32" color="white" />
              </div>
              <div class="step-number ff-heading">{{ index + 1 }}</div>
            </div>

            <h3 class="text-h6 font-weight-bold ff-heading mb-2">{{ step.title }}</h3>
            <p class="text-body-2" style="opacity: 0.5; max-width: 280px; margin: 0 auto; line-height: 1.7;">
              {{ step.description }}
            </p>
          </div>

          <!-- Connector line (desktop) -->
          <div v-if="index < steps.length - 1" class="step-connector d-none d-md-block" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
const steps = [
  {
    icon: 'mdi-magnify',
    title: 'Choose Restaurant',
    description: 'Browse through hundreds of restaurants and cuisines. Filter by category, rating, or delivery time.',
  },
  {
    icon: 'mdi-cart-plus',
    title: 'Place Your Order',
    description: 'Select your favorite dishes, customize your order, and add them to your cart with just a tap.',
  },
  {
    icon: 'mdi-truck-delivery',
    title: 'Fast Delivery',
    description: 'Track your order in real-time as our delivery partner brings your meal to your doorstep.',
  },
]
</script>

<style scoped>
.step-card {
  padding: 24px;
  position: relative;
}

.step-icon-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
}

.step-icon-bg {
  width: 80px;
  height: 80px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--ff-transition-smooth);
}

.step-card:hover .step-icon-bg {
  transform: rotate(-10deg) scale(1.05);
  box-shadow: 0 12px 30px rgba(255, 107, 53, 0.3);
}

.step-number {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 28px;
  height: 28px;
  background: var(--ff-gradient-warm);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 800;
  color: white;
}
</style>
