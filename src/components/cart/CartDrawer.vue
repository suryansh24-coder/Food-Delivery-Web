<template>
  <v-navigation-drawer
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    location="right"
    temporary
    width="420"
    class="cart-drawer"
    id="cart-drawer"
  >
    <div class="cart-drawer__content d-flex flex-column" style="height: 100%;">
      <!-- Header -->
      <div class="cart-drawer__header pa-4 d-flex align-center justify-space-between">
        <div class="d-flex align-center ga-2">
          <v-icon icon="mdi-cart" size="22" color="primary" />
          <h3 class="ff-heading text-body-1 font-weight-bold">Your Cart</h3>
          <v-chip v-if="cartStore.itemCount > 0" size="x-small" color="primary" variant="flat" class="font-weight-bold">
            {{ cartStore.itemCount }}
          </v-chip>
        </div>
        <v-btn icon size="small" variant="text" @click="$emit('update:modelValue', false)">
          <v-icon icon="mdi-close" />
        </v-btn>
      </div>

      <v-divider />

      <!-- Empty State -->
      <div v-if="cartStore.cartItems.length === 0" class="flex-grow-1 d-flex flex-column align-center justify-center pa-6 text-center">
        <v-icon icon="mdi-cart-off" size="64" style="opacity: 0.15;" class="mb-4" />
        <p class="text-body-2 font-weight-medium mb-2">Your cart is empty</p>
        <p class="text-caption" style="opacity: 0.4;">Add items from a restaurant to get started</p>
        <v-btn
          color="primary"
          variant="tonal"
          class="text-none mt-4"
          rounded="lg"
          :to="{ name: 'Restaurants' }"
          @click="$emit('update:modelValue', false)"
        >
          Browse Restaurants
        </v-btn>
      </div>

      <!-- Cart Items -->
      <div v-else class="flex-grow-1 overflow-y-auto">
        <div class="pa-3">
          <p class="text-caption font-weight-medium mb-3 px-1" style="opacity: 0.4;">
            From {{ cartStore.cartItems[0]?.restaurantName }}
          </p>

          <TransitionGroup name="list" tag="div" class="d-flex flex-column ga-2">
            <div
              v-for="item in cartStore.cartItems"
              :key="`${item.restaurantId}_${item.id}`"
              class="drawer-item d-flex align-center pa-2 rounded-lg"
            >
              <v-img
                :src="item.image"
                width="50"
                height="50"
                cover
                class="rounded-lg flex-shrink-0"
              />

              <div class="ml-3 flex-grow-1" style="min-width: 0;">
                <p class="text-body-2 font-weight-medium text-truncate">{{ item.name }}</p>
                <p class="ff-price text-caption">₹{{ item.price }}</p>
              </div>

              <div class="d-flex align-center ga-1 flex-shrink-0">
                <v-btn icon size="x-small" variant="tonal" color="primary" @click="cartStore.updateQuantity(item, item.restaurantId, -1)">
                  <v-icon icon="mdi-minus" size="12" />
                </v-btn>
                <span class="text-body-2 font-weight-bold" style="min-width: 20px; text-align: center;">{{ item.quantity }}</span>
                <v-btn icon size="x-small" variant="flat" color="primary" @click="cartStore.updateQuantity(item, item.restaurantId, 1)">
                  <v-icon icon="mdi-plus" size="12" />
                </v-btn>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>

      <!-- Footer -->
      <div v-if="cartStore.cartItems.length > 0" class="cart-drawer__footer pa-4">
        <v-divider class="mb-3" />
        <div class="d-flex justify-space-between mb-3">
          <span class="text-body-2" style="opacity: 0.5;">Subtotal</span>
          <span class="ff-price text-body-2 font-weight-bold">₹{{ cartStore.subtotal }}</span>
        </div>
        <v-btn
          color="primary"
          block
          rounded="xl"
          class="text-none font-weight-bold checkout-drawer-btn"
          :to="{ name: 'Cart' }"
          @click="$emit('update:modelValue', false)"
          id="drawer-checkout-btn"
        >
          View Cart & Checkout
          <v-icon icon="mdi-arrow-right" class="ml-2" />
        </v-btn>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

defineProps({
  modelValue: Boolean,
})

defineEmits(['update:modelValue'])

const cartStore = useCartStore()
</script>

<style scoped>
.cart-drawer__header {
  min-height: 60px;
}

.drawer-item {
  transition: var(--ff-transition-smooth);
}

.drawer-item:hover {
  background: rgba(255, 107, 53, 0.05);
}

.checkout-drawer-btn {
  background: var(--ff-gradient-primary) !important;
}

.cart-drawer__footer {
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}
</style>
