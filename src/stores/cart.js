import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

/**
 * Cart Store — Manages shopping cart using multiple data structures
 * 
 * DATA STRUCTURES USED:
 * 1. Array (cartItems) — Ordered list for rendering and iteration. O(n) for search, O(1) for push.
 * 2. HashMap/Object (cartMap) — O(1) lookup by composite key for add/update/remove operations.
 * 3. Queue (orderHistory) — FIFO order history. enqueue O(1), dequeue O(1).
 * 
 * TIME COMPLEXITIES:
 * - addToCart: O(1) — HashMap lookup + update or Array push
 * - removeFromCart: O(n) — Array splice (need to find index)
 * - updateQuantity: O(1) — HashMap direct access
 * - getTotal: O(n) — Reduce over all items
 * - clearCart: O(1) — Reset references
 */
export const useCartStore = defineStore('cart', () => {
  // ==========================================
  // DS 1: Array — Ordered cart items for rendering
  // DS 2: HashMap — Fast O(1) lookup by composite key
  // ==========================================
  const cartItems = ref([])
  const cartMap = ref({}) // key: `${restaurantId}_${itemId}` -> index in cartItems

  // DS 3: Queue (FIFO) — Order history
  const orderHistory = ref([])

  // Promo code state
  const appliedPromo = ref(null)

  // ==========================================
  // Load from LocalStorage on init
  // ==========================================
  const loadFromStorage = () => {
    try {
      const savedCart = localStorage.getItem('ff_cart')
      if (savedCart) {
        const parsed = JSON.parse(savedCart)
        cartItems.value = parsed.items || []
        cartMap.value = parsed.map || {}
      }
      const savedHistory = localStorage.getItem('ff_order_history')
      if (savedHistory) {
        orderHistory.value = JSON.parse(savedHistory)
      }
      const savedPromo = localStorage.getItem('ff_promo')
      if (savedPromo) {
        appliedPromo.value = JSON.parse(savedPromo)
      }
    } catch (e) {
      console.warn('Failed to load cart from localStorage:', e)
    }
  }

  // Initialize
  loadFromStorage()

  // ==========================================
  // Persist to LocalStorage with debounce
  // ==========================================
  let saveTimeout = null
  const saveToStorage = () => {
    clearTimeout(saveTimeout)
    saveTimeout = setTimeout(() => {
      try {
        localStorage.setItem('ff_cart', JSON.stringify({
          items: cartItems.value,
          map: cartMap.value,
        }))
        localStorage.setItem('ff_order_history', JSON.stringify(orderHistory.value))
        if (appliedPromo.value) {
          localStorage.setItem('ff_promo', JSON.stringify(appliedPromo.value))
        } else {
          localStorage.removeItem('ff_promo')
        }
      } catch (e) {
        console.warn('Failed to save cart to localStorage:', e)
      }
    }, 300)
  }

  watch([cartItems, orderHistory, appliedPromo], saveToStorage, { deep: true })

  // ==========================================
  // Computed Properties
  // ==========================================
  const itemCount = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const subtotal = computed(() => {
    // O(n) — iterate all items
    return cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  })

  const deliveryFee = computed(() => {
    if (cartItems.value.length === 0) return 0
    if (subtotal.value >= 499) return 0 // Free delivery over ₹499
    return 40
  })

  const tax = computed(() => {
    return Math.round(subtotal.value * 0.05) // 5% GST
  })

  const discount = computed(() => {
    if (!appliedPromo.value) return 0
    if (appliedPromo.value.code === 'FEAST50') {
      return Math.round(subtotal.value * 0.5)
    }
    if (appliedPromo.value.code === 'UPIBACK') {
      return Math.min(100, subtotal.value)
    }
    return 0
  })

  const total = computed(() => {
    return Math.max(0, subtotal.value + deliveryFee.value + tax.value - discount.value)
  })

  const cartRestaurantId = computed(() => {
    if (cartItems.value.length === 0) return null
    return cartItems.value[0].restaurantId
  })

  // ==========================================
  // Actions
  // ==========================================

  /**
   * Add item to cart — O(1) using HashMap lookup
   * If item exists, increment quantity. Otherwise, push to array and register in map.
   */
  const addToCart = (item, restaurantId, restaurantName) => {
    const key = `${restaurantId}_${item.id}`
    
    if (cartMap.value[key] !== undefined) {
      // O(1) — item exists, increment quantity
      const index = cartMap.value[key]
      cartItems.value[index].quantity += 1
    } else {
      // O(1) — new item, push to end
      const newItem = {
        ...item,
        restaurantId,
        restaurantName,
        quantity: 1,
        addedAt: Date.now(),
      }
      cartMap.value[key] = cartItems.value.length
      cartItems.value.push(newItem)
    }
  }

  /**
   * Remove item from cart — O(n) due to array splice and map reindex
   */
  const removeFromCart = (item, restaurantId) => {
    const key = `${restaurantId}_${item.id}`
    const index = cartMap.value[key]
    
    if (index === undefined) return

    // Remove from array — O(n)
    cartItems.value.splice(index, 1)
    
    // Rebuild map — O(n) (necessary after splice shifts indices)
    delete cartMap.value[key]
    const newMap = {}
    cartItems.value.forEach((ci, i) => {
      const k = `${ci.restaurantId}_${ci.id}`
      newMap[k] = i
    })
    cartMap.value = newMap
  }

  /**
   * Update quantity — O(1) using HashMap
   */
  const updateQuantity = (item, restaurantId, delta) => {
    const key = `${restaurantId}_${item.id}`
    const index = cartMap.value[key]
    
    if (index === undefined) return

    const newQty = cartItems.value[index].quantity + delta
    if (newQty <= 0) {
      removeFromCart(item, restaurantId)
    } else {
      cartItems.value[index].quantity = newQty
    }
  }

  /**
   * Get quantity of specific item — O(1) using HashMap
   */
  const getItemQuantity = (itemId, restaurantId) => {
    const key = `${restaurantId}_${itemId}`
    const index = cartMap.value[key]
    if (index === undefined) return 0
    return cartItems.value[index].quantity
  }

  /**
   * Clear entire cart — O(1)
   */
  const clearCart = () => {
    cartItems.value = []
    cartMap.value = {}
    appliedPromo.value = null
  }

  /**
   * Apply promo code
   */
  const applyPromo = (promo) => {
    appliedPromo.value = promo
  }

  const removePromo = () => {
    appliedPromo.value = null
  }

  /**
   * Checkout — enqueue order to history (Queue DS, FIFO)
   * Time: O(1) for push
   */
  const checkout = () => {
    if (cartItems.value.length === 0) return null

    const order = {
      id: `ORD-${Date.now()}`,
      items: [...cartItems.value],
      subtotal: subtotal.value,
      tax: tax.value,
      deliveryFee: deliveryFee.value,
      discount: discount.value,
      total: total.value,
      restaurantName: cartItems.value[0]?.restaurantName || 'Unknown',
      timestamp: new Date().toISOString(),
      status: 'confirmed',
    }

    // Queue: enqueue at end — O(1)
    orderHistory.value.push(order)

    // Keep only last 20 orders
    if (orderHistory.value.length > 20) {
      // Queue: dequeue from front — O(n) shift, but infrequent
      orderHistory.value.shift()
    }

    clearCart()
    return order
  }

  return {
    // State
    cartItems,
    cartMap,
    orderHistory,
    appliedPromo,
    // Computed
    itemCount,
    subtotal,
    deliveryFee,
    tax,
    discount,
    total,
    cartRestaurantId,
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    getItemQuantity,
    clearCart,
    applyPromo,
    removePromo,
    checkout,
  }
})
