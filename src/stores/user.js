import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

/**
 * User Store — Manages user preferences and recently viewed
 * 
 * DATA STRUCTURES USED:
 * 1. Set (favorites) — O(1) add, delete, has for toggling favorites
 * 2. Stack/Array (recentlyViewed) — LIFO, most recent first, capped at 10
 * 
 * TIME COMPLEXITIES:
 * - Toggle favorite: O(1) — Set.add / Set.delete
 * - Check favorite: O(1) — Set.has
 * - Add to recently viewed: O(n) worst case — remove duplicates, then push
 */
export const useUserStore = defineStore('user', () => {
  // ==========================================
  // Theme preference
  // ==========================================
  const isDarkMode = ref(true)

  // ==========================================
  // DS: Set — Favorites for O(1) membership check
  // ==========================================
  const favorites = ref(new Set())

  // ==========================================
  // DS: Stack (Array-based, LIFO) — Recently viewed restaurants
  // Most recent at the end, display in reverse
  // ==========================================
  const recentlyViewed = ref([])

  // ==========================================
  // Load from LocalStorage
  // ==========================================
  const loadFromStorage = () => {
    try {
      const savedTheme = localStorage.getItem('ff_dark_mode')
      if (savedTheme !== null) {
        isDarkMode.value = JSON.parse(savedTheme)
      }

      const savedFavorites = localStorage.getItem('ff_favorites')
      if (savedFavorites) {
        favorites.value = new Set(JSON.parse(savedFavorites))
      }

      const savedRecent = localStorage.getItem('ff_recently_viewed')
      if (savedRecent) {
        recentlyViewed.value = JSON.parse(savedRecent)
      }
    } catch (e) {
      console.warn('Failed to load user data from localStorage:', e)
    }
  }

  // Initialize
  loadFromStorage()

  // ==========================================
  // Persist to LocalStorage
  // ==========================================
  const saveToStorage = () => {
    try {
      localStorage.setItem('ff_dark_mode', JSON.stringify(isDarkMode.value))
      localStorage.setItem('ff_favorites', JSON.stringify(Array.from(favorites.value)))
      localStorage.setItem('ff_recently_viewed', JSON.stringify(recentlyViewed.value))
    } catch (e) {
      console.warn('Failed to save user data to localStorage:', e)
    }
  }

  watch([isDarkMode, favorites, recentlyViewed], saveToStorage, { deep: true })

  // ==========================================
  // Actions
  // ==========================================

  /**
   * Toggle dark mode
   */
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
  }

  /**
   * Toggle favorite — O(1) using Set
   */
  const toggleFavorite = (restaurantId) => {
    const newSet = new Set(favorites.value)
    if (newSet.has(restaurantId)) {
      newSet.delete(restaurantId)
    } else {
      newSet.add(restaurantId)
    }
    favorites.value = newSet
  }

  /**
   * Check if restaurant is favorite — O(1) using Set
   */
  const isFavorite = (restaurantId) => {
    return favorites.value.has(restaurantId)
  }

  /**
   * Add to recently viewed — Stack push with dedup
   * O(n) for dedup filter, O(1) for push
   * Capped at 10 items (LIFO — most recent first when reversed)
   */
  const addToRecentlyViewed = (restaurant) => {
    // Remove if already exists (dedup) — O(n)
    const filtered = recentlyViewed.value.filter((r) => r.id !== restaurant.id)
    
    // Stack push — add to end — O(1)
    filtered.push({
      id: restaurant.id,
      name: restaurant.name,
      image: restaurant.image,
      cuisine: restaurant.cuisine,
      rating: restaurant.rating,
      viewedAt: Date.now(),
    })

    // Cap at 10 — remove oldest from bottom (stack underflow protection)
    if (filtered.length > 10) {
      filtered.shift()
    }

    recentlyViewed.value = filtered
  }

  /**
   * Get recently viewed in reverse (most recent first) — Stack-style LIFO access
   */
  const getRecentlyViewedReversed = () => {
    return [...recentlyViewed.value].reverse()
  }

  return {
    // State
    isDarkMode,
    favorites,
    recentlyViewed,
    // Actions
    toggleDarkMode,
    toggleFavorite,
    isFavorite,
    addToRecentlyViewed,
    getRecentlyViewedReversed,
  }
})
