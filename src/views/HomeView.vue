<template>
  <div id="home-view">
    <HeroBanner />
    <CategoryGrid />
    <PromoBanner />
    <FeaturedRestaurants />
    <HowItWorks />
  </div>
</template>

<script setup>
import HeroBanner from '@/components/home/HeroBanner.vue'
import CategoryGrid from '@/components/home/CategoryGrid.vue'
import FeaturedRestaurants from '@/components/home/FeaturedRestaurants.vue'
import PromoBanner from '@/components/home/PromoBanner.vue'
import HowItWorks from '@/components/home/HowItWorks.vue'
</script>
