<template>
  <div class="cart-page" id="cart-view">
    <v-container style="max-width: 1080px;" class="py-8">
      <!-- Page Title -->
      <div class="d-flex align-center ga-3 mb-6 animate-fade-up">
        <v-btn icon variant="tonal" size="small" @click="$router.back()" id="cart-back-btn">
          <v-icon icon="mdi-arrow-left" />
        </v-btn>
        <div>
          <h1 class="ff-heading text-h5 font-weight-bold">Your Cart</h1>
          <p v-if="cartStore.itemCount > 0" class="text-caption" style="opacity: 0.5;">
            {{ cartStore.itemCount }} item{{ cartStore.itemCount > 1 ? 's' : '' }} from {{ cartStore.cartItems[0]?.restaurantName }}
          </p>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-if="cartStore.cartItems.length === 0" class="empty-cart text-center py-16 animate-scale-in">
        <div class="empty-cart__icon mb-6">
          <v-icon icon="mdi-cart-off" size="100" style="opacity: 0.12;" />
        </div>
        <h2 class="ff-heading text-h5 mb-3">Your cart is empty</h2>
        <p class="text-body-2 mb-6" style="opacity: 0.5; max-width: 400px; margin: 0 auto;">
          Looks like you haven't added anything yet. Explore restaurants and find something delicious!
        </p>
        <v-btn
          color="primary"
          size="large"
          rounded="xl"
          class="text-none font-weight-bold px-8"
          :to="{ name: 'Restaurants' }"
          id="cart-browse-btn"
        >
          <v-icon icon="mdi-silverware-fork-knife" class="mr-2" />
          Browse Restaurants
        </v-btn>
      </div>

      <!-- Cart with Items -->
      <v-row v-else>
        <!-- Cart Items Column -->
        <v-col cols="12" md="7" lg="8">
          <TransitionGroup name="list" tag="div" class="d-flex flex-column ga-3">
            <v-card
              v-for="item in cartStore.cartItems"
              :key="`${item.restaurantId}_${item.id}`"
              class="cart-item glass-card"
              :id="`cart-item-${item.id}`"
            >
              <div class="d-flex pa-3">
                <!-- Item Image -->
                <v-img
                  :src="item.image"
                  width="90"
                  height="90"
                  cover
                  class="rounded-lg flex-shrink-0"
                >
                  <template #placeholder>
                    <div class="d-flex align-center justify-center fill-height shimmer rounded-lg" />
                  </template>
                </v-img>

                <!-- Item Details -->
                <div class="ml-3 d-flex flex-column flex-grow-1" style="min-width: 0;">
                  <div class="d-flex align-center ga-2 mb-1">
                    <span
                      :style="{
                        width: '10px', height: '10px', borderRadius: '2px', flexShrink: 0,
                        border: `2px solid ${item.isVeg ? '#4CAF50' : '#F44336'}`,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      }"
                    >
                      <span :style="{ width: '4px', height: '4px', borderRadius: '50%', background: item.isVeg ? '#4CAF50' : '#F44336' }" />
                    </span>
                    <h4 class="text-body-2 font-weight-bold text-truncate">{{ item.name }}</h4>
                  </div>

                  <p class="text-caption mb-auto" style="opacity: 0.4;">{{ item.description }}</p>

                  <div class="d-flex justify-space-between align-center mt-2">
                    <span class="ff-price text-body-1 font-weight-bold">₹{{ item.price * item.quantity }}</span>

                    <div class="qty-controls d-flex align-center">
                      <v-btn icon size="x-small" variant="tonal" color="primary" @click="cartStore.updateQuantity(item, item.restaurantId, -1)">
                        <v-icon icon="mdi-minus" size="14" />
                      </v-btn>
                      <span class="text-body-2 font-weight-bold mx-3">{{ item.quantity }}</span>
                      <v-btn icon size="x-small" variant="flat" color="primary" @click="cartStore.updateQuantity(item, item.restaurantId, 1)">
                        <v-icon icon="mdi-plus" size="14" />
                      </v-btn>
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </TransitionGroup>

          <!-- Special Instructions -->
          <v-card class="glass-card mt-4 pa-4" id="cart-instructions">
            <div class="d-flex align-center ga-2 mb-3">
              <v-icon icon="mdi-note-edit-outline" size="20" color="primary" />
              <span class="text-body-2 font-weight-bold">Special Instructions</span>
            </div>
            <v-textarea
              v-model="specialInstructions"
              placeholder="Any special instructions for the restaurant? (e.g., less spicy, extra sauce)"
              variant="solo-filled"
              rounded="lg"
              rows="2"
              hide-details
              density="compact"
            />
          </v-card>
        </v-col>

        <!-- Order Summary Column -->
        <v-col cols="12" md="5" lg="4">
          <div class="order-summary-wrapper">
            <!-- Promo Code -->
            <v-card class="glass-card mb-4 pa-4 animate-fade-up" id="cart-promo">
              <div class="d-flex align-center ga-2 mb-3">
                <v-icon icon="mdi-tag-outline" size="20" color="primary" />
                <span class="text-body-2 font-weight-bold">Apply Promo Code</span>
              </div>

              <div v-if="cartStore.appliedPromo" class="d-flex align-center justify-space-between pa-3 rounded-lg" style="background: rgba(76, 175, 80, 0.1); border: 1px solid rgba(76, 175, 80, 0.2);">
                <div class="d-flex align-center ga-2">
                  <v-icon icon="mdi-check-circle" size="18" color="success" />
                  <span class="text-body-2 font-weight-bold" style="color: #4CAF50;">{{ cartStore.appliedPromo.code }}</span>
                </div>
                <v-btn variant="text" size="x-small" color="error" @click="cartStore.removePromo" class="text-none">Remove</v-btn>
              </div>

              <div v-else class="d-flex ga-2">
                <v-text-field
                  v-model="promoCode"
                  placeholder="Enter code"
                  variant="solo-filled"
                  rounded="lg"
                  density="compact"
                  hide-details
                />
                <v-btn
                  color="primary"
                  variant="tonal"
                  rounded="lg"
                  class="text-none"
                  @click="tryApplyPromo"
                  id="apply-promo-btn"
                >
                  Apply
                </v-btn>
              </div>

              <div class="d-flex flex-wrap ga-2 mt-3">
                <v-chip
                  v-for="promo in availablePromos"
                  :key="promo.code"
                  size="x-small"
                  variant="outlined"
                  color="primary"
                  class="cursor-pointer"
                  @click="promoCode = promo.code; tryApplyPromo()"
                >
                  {{ promo.code }}
                </v-chip>
              </div>
            </v-card>

            <!-- Bill Details -->
            <v-card class="glass-card pa-4 animate-fade-up delay-100" id="cart-bill">
              <h3 class="text-body-1 font-weight-bold mb-4">Bill Details</h3>

              <div class="bill-row d-flex justify-space-between mb-2">
                <span class="text-body-2" style="opacity: 0.6;">Item Total</span>
                <span class="text-body-2">₹{{ cartStore.subtotal }}</span>
              </div>

              <div class="bill-row d-flex justify-space-between mb-2">
                <span class="text-body-2" style="opacity: 0.6;">
                  Delivery Fee
                  <v-chip v-if="cartStore.deliveryFee === 0" size="x-small" color="success" variant="tonal" class="ml-1">FREE</v-chip>
                </span>
                <span class="text-body-2" :class="cartStore.deliveryFee === 0 ? 'text-decoration-line-through' : ''">
                  ₹{{ cartStore.deliveryFee === 0 ? '40' : cartStore.deliveryFee }}
                </span>
              </div>

              <div class="bill-row d-flex justify-space-between mb-2">
                <span class="text-body-2" style="opacity: 0.6;">GST (5%)</span>
                <span class="text-body-2">₹{{ cartStore.tax }}</span>
              </div>

              <div v-if="cartStore.discount > 0" class="bill-row d-flex justify-space-between mb-2" style="color: #4CAF50;">
                <span class="text-body-2 font-weight-medium">Discount</span>
                <span class="text-body-2 font-weight-medium">-₹{{ cartStore.discount }}</span>
              </div>

              <v-divider class="my-3" />

              <div class="d-flex justify-space-between">
                <span class="text-body-1 font-weight-bold">To Pay</span>
                <span class="ff-price text-h6 font-weight-bold">₹{{ cartStore.total }}</span>
              </div>

              <v-btn
                color="primary"
                size="large"
                block
                rounded="xl"
                class="text-none font-weight-bold mt-5 checkout-btn"
                @click="handleCheckout"
                id="checkout-btn"
              >
                <v-icon icon="mdi-lightning-bolt" class="mr-2" />
                Place Order — ₹{{ cartStore.total }}
              </v-btn>

              <p class="text-center text-caption mt-3" style="opacity: 0.3;">
                <v-icon icon="mdi-shield-check" size="12" class="mr-1" />
                Secure checkout
              </p>
            </v-card>
          </div>
        </v-col>
      </v-row>

      <!-- Order Confirmation Dialog -->
      <v-dialog v-model="showConfirmation" max-width="480" persistent>
        <v-card class="glass-card pa-6 text-center" rounded="xl">
          <div class="confirm-animation mb-4">
            <v-icon icon="mdi-check-circle" size="80" color="success" class="animate-bounce-in" />
          </div>
          <h2 class="ff-heading text-h5 mb-2">Order Placed! 🎉</h2>
          <p class="text-body-2 mb-1" style="opacity: 0.5;">Order ID: {{ lastOrder?.id }}</p>
          <p class="text-body-2 mb-4" style="opacity: 0.5;">
            Your food is being prepared and will arrive soon.
          </p>
          <div class="glass-surface pa-3 rounded-lg mb-4">
            <div class="d-flex justify-space-between mb-1">
              <span class="text-body-2" style="opacity: 0.5;">Total Paid</span>
              <span class="ff-price text-body-1 font-weight-bold">₹{{ lastOrder?.total }}</span>
            </div>
            <div class="d-flex justify-space-between">
              <span class="text-body-2" style="opacity: 0.5;">Items</span>
              <span class="text-body-2">{{ lastOrder?.items?.length }} items</span>
            </div>
          </div>
          <v-btn color="primary" rounded="xl" block class="text-none font-weight-bold" @click="goHome" id="order-done-btn">
            <v-icon icon="mdi-home" class="mr-2" />
            Back to Home
          </v-btn>
        </v-card>
      </v-dialog>

      <!-- Coupon Celebration Overlay -->
      <Teleport to="body">
        <Transition name="fade">
          <div v-if="showCouponCelebration" class="coupon-celebration-overlay" @click="showCouponCelebration = false">
            <!-- Confetti particles -->
            <div class="confetti-container">
              <div v-for="i in 60" :key="i" class="confetti-piece" :style="getConfettiStyle(i)" />
            </div>
            <!-- Success card -->
            <div class="coupon-success-card" @click.stop>
              <div class="coupon-success-icon mb-3">🎊</div>
              <h3 class="coupon-success-title">Coupon Applied!</h3>
              <p class="coupon-success-code">{{ appliedPromoCode }}</p>
              <p class="coupon-success-savings">You saved ₹{{ cartStore.discount }} on this order</p>
              <v-btn color="primary" rounded="pill" class="text-none font-weight-bold mt-3 px-8" @click="showCouponCelebration = false">
                Yay! 🎉
              </v-btn>
            </div>
          </div>
        </Transition>
      </Teleport>
    </v-container>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const cartStore = useCartStore()
const showNotification = inject('showNotification', () => {})

const specialInstructions = ref('')
const promoCode = ref('')
const showConfirmation = ref(false)
const lastOrder = ref(null)
const showCouponCelebration = ref(false)
const appliedPromoCode = ref('')

const availablePromos = [
  { code: 'FEAST50', label: '50% off' },
  { code: 'FREEDEL', label: 'Free delivery' },
  { code: 'UPIBACK', label: '₹100 cashback' },
]

const confettiColors = ['#FF6B35', '#FF4081', '#4CAF50', '#FFC107', '#9C27B0', '#00BCD4', '#E91E63', '#FFD93D', '#FF5722', '#2196F3']

const getConfettiStyle = (index) => {
  const left = Math.random() * 100
  const delay = Math.random() * 2
  const duration = 2 + Math.random() * 2
  const color = confettiColors[index % confettiColors.length]
  const size = 6 + Math.random() * 8
  const rotation = Math.random() * 360
  return {
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    backgroundColor: color,
    width: `${size}px`,
    height: `${size}px`,
    transform: `rotate(${rotation}deg)`,
  }
}

const tryApplyPromo = () => {
  const code = promoCode.value.trim().toUpperCase()
  const valid = availablePromos.find((p) => p.code === code)
  if (valid) {
    cartStore.applyPromo(valid)
    appliedPromoCode.value = code
    promoCode.value = ''
    // Show confetti celebration
    showCouponCelebration.value = true
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      showCouponCelebration.value = false
    }, 4000)
  } else {
    showNotification('Invalid promo code. Try FEAST50 or UPIBACK', 'error', 'mdi-alert-circle')
  }
}

const handleCheckout = () => {
  const order = cartStore.checkout()
  if (order) {
    lastOrder.value = order
    showConfirmation.value = true
  }
}

const goHome = () => {
  showConfirmation.value = false
  router.push({ name: 'Home' })
}
</script>

<style scoped>
.cart-item {
  transition: var(--ff-transition-smooth);
}

.cart-item:hover {
  transform: translateX(4px);
}

.qty-controls {
  background: rgba(255, 107, 53, 0.08);
  border-radius: 10px;
  padding: 2px;
}

.order-summary-wrapper {
  position: sticky;
  top: 80px;
}

.checkout-btn {
  background: var(--ff-gradient-primary) !important;
  letter-spacing: 0.5px;
}

.checkout-btn:hover {
  box-shadow: 0 8px 30px rgba(255, 107, 53, 0.4) !important;
  transform: translateY(-2px);
}

.confirm-animation {
  animation: bounceIn 0.6s ease-out;
}

.cursor-pointer {
  cursor: pointer;
}

@media (max-width: 960px) {
  .order-summary-wrapper {
    position: static;
  }
}
</style>
