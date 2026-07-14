import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import data from '@/data/restaurants.json'

/**
 * Restaurant Store — Manages restaurant data with filtering and sorting
 * 
 * DATA STRUCTURES USED:
 * 1. Array — Restaurant list, supports .filter() and .sort() for search/sort
 * 2. HashMap/Object — Category mapping for O(1) cuisine lookups
 * 3. Array.filter — Search suggestions by substring matching — O(n)
 * 4. Array.sort — Sorting by rating/delivery time — O(n log n) TimSort
 * 
 * TIME COMPLEXITIES:
 * - Search: O(n * m) where n = restaurants, m = avg name length
 * - Filter by category: O(n) — scan all restaurants
 * - Sort: O(n log n) — JavaScript's TimSort
 * - Get restaurant by ID: O(n) — Array.find (could be O(1) with map, but n is small)
 */
export const useRestaurantStore = defineStore('restaurants', () => {
  // ==========================================
  // State
  // ==========================================
  const restaurants = ref(data.restaurants)
  const categories = ref(data.categories)
  const promos = ref(data.promos)
  
  const searchQuery = ref('')
  const selectedCategory = ref(null)
  const sortBy = ref('default') // 'default', 'rating', 'deliveryTime', 'priceLow', 'priceHigh'

  // ==========================================
  // HashMap — Category to restaurants mapping (built once, O(1) per lookup)
  // ==========================================
  const categoryMap = computed(() => {
    const map = {}
    restaurants.value.forEach((restaurant) => {
      restaurant.cuisine.forEach((cuisine) => {
        const key = cuisine.toLowerCase()
        if (!map[key]) {
          map[key] = []
        }
        map[key].push(restaurant)
      })
    })
    return map
  })

  // ==========================================
  // Computed — Filtered & Sorted Restaurant List
  // ==========================================
  const filteredRestaurants = computed(() => {
    let result = [...restaurants.value]

    // Search filter — O(n) string matching
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase().trim()
      result = result.filter((r) => {
        return (
          r.name.toLowerCase().includes(query) ||
          r.cuisine.some((c) => c.toLowerCase().includes(query)) ||
          r.address.toLowerCase().includes(query)
        )
      })
    }

    // Category filter — O(n) cuisine check
    if (selectedCategory.value) {
      const cat = selectedCategory.value.toLowerCase()
      result = result.filter((r) =>
        r.cuisine.some((c) => c.toLowerCase() === cat)
      )
    }

    // Sorting — O(n log n) TimSort
    switch (sortBy.value) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'deliveryTime':
        result.sort((a, b) => {
          const aTime = parseInt(a.deliveryTime.split('-')[0])
          const bTime = parseInt(b.deliveryTime.split('-')[0])
          return aTime - bTime
        })
        break
      case 'priceLow':
        result.sort((a, b) => a.priceRange - b.priceRange)
        break
      case 'priceHigh':
        result.sort((a, b) => b.priceRange - a.priceRange)
        break
      default:
        // Default: promoted first, then by rating
        result.sort((a, b) => {
          if (a.promoted && !b.promoted) return -1
          if (!a.promoted && b.promoted) return 1
          return b.rating - a.rating
        })
    }

    return result
  })

  // ==========================================
  // Search Suggestions — Array filtering, O(n)
  // ==========================================
  const searchSuggestions = computed(() => {
    if (!searchQuery.value.trim() || searchQuery.value.length < 2) return []
    
    const query = searchQuery.value.toLowerCase().trim()
    const suggestions = new Set()

    restaurants.value.forEach((r) => {
      if (r.name.toLowerCase().includes(query)) {
        suggestions.add(r.name)
      }
      r.cuisine.forEach((c) => {
        if (c.toLowerCase().includes(query)) {
          suggestions.add(c)
        }
      })
      // Also search menu items for suggestions
      r.menu.forEach((item) => {
        if (item.name.toLowerCase().includes(query)) {
          suggestions.add(item.name)
        }
      })
    })

    return Array.from(suggestions).slice(0, 6) // Limit to 6 suggestions
  })

  // ==========================================
  // Featured restaurants — top rated
  // ==========================================
  const featuredRestaurants = computed(() => {
    return [...restaurants.value]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6)
  })

  // ==========================================
  // Promoted restaurants
  // ==========================================
  const promotedRestaurants = computed(() => {
    return restaurants.value.filter((r) => r.promoted)
  })

  // ==========================================
  // Get restaurant by ID — O(n) find
  // ==========================================
  const getRestaurantById = (id) => {
    return restaurants.value.find((r) => r.id === id) || null
  }

  // ==========================================
  // Get menu categories for a restaurant
  // ==========================================
  const getMenuCategories = (restaurantId) => {
    const restaurant = getRestaurantById(restaurantId)
    if (!restaurant) return []
    const cats = new Set()
    restaurant.menu.forEach((item) => cats.add(item.category))
    return Array.from(cats)
  }

  // ==========================================
  // Actions
  // ==========================================
  const setSearchQuery = (query) => {
    searchQuery.value = query
  }

  const setCategory = (category) => {
    selectedCategory.value = category === selectedCategory.value ? null : category
  }

  const setSortBy = (sort) => {
    sortBy.value = sort
  }

  const clearFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = null
    sortBy.value = 'default'
  }

  return {
    // State
    restaurants,
    categories,
    promos,
    searchQuery,
    selectedCategory,
    sortBy,
    // Computed
    categoryMap,
    filteredRestaurants,
    searchSuggestions,
    featuredRestaurants,
    promotedRestaurants,
    // Actions
    getRestaurantById,
    getMenuCategories,
    setSearchQuery,
    setCategory,
    setSortBy,
    clearFilters,
  }
})
