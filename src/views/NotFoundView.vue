<template>
  <div class="not-found-page" id="not-found-view">
    <v-container class="text-center py-16">
      <div class="animate-float mb-8">
        <span style="font-size: 120px; line-height: 1;">🍕</span>
      </div>

      <h1 class="ff-heading text-h2 font-weight-bold gradient-text mb-4 animate-fade-up">
        404
      </h1>

      <h2 class="ff-heading text-h5 mb-3 animate-fade-up delay-100">
        Oops! This page got lost in delivery
      </h2>

      <p class="text-body-1 mb-8 animate-fade-up delay-200" style="opacity: 0.5; max-width: 480px; margin: 0 auto;">
        The page you're looking for doesn't exist or has been moved. Let's get you back to discovering amazing food!
      </p>

      <div class="d-flex justify-center ga-3 flex-wrap animate-fade-up delay-300">
        <v-btn
          color="primary"
          size="large"
          rounded="xl"
          class="text-none font-weight-bold px-8"
          :to="{ name: 'Home' }"
          id="not-found-home-btn"
        >
          <v-icon icon="mdi-home" class="mr-2" />
          Go Home
        </v-btn>

        <v-btn
          variant="outlined"
          color="primary"
          size="large"
          rounded="xl"
          class="text-none font-weight-bold px-8"
          :to="{ name: 'Restaurants' }"
          id="not-found-browse-btn"
        >
          <v-icon icon="mdi-store" class="mr-2" />
          Browse Restaurants
        </v-btn>
      </div>
    </v-container>
  </div>
</template>

<script setup>
// No additional logic needed
</script>

<style scoped>
.not-found-page {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
