/**
 * Cache Management Utility
 * Automatically clears browser cache for better performance
 */

export const clearAllCache = async () => {
  try {
    // Clear localStorage
    localStorage.clear();

    // Clear sessionStorage
    sessionStorage.clear();

    // Clear IndexedDB
    const databases = await indexedDB.databases?.() || [];
    for (const db of databases) {
      if (db.name) {
        indexedDB.deleteDatabase(db.name);
      }
    }

    // Clear service worker cache
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      for (const name of cacheNames) {
        await caches.delete(name);
      }
    }

    // Clear application cache
    if (navigator.serviceWorker?.controller) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }

    console.log('✓ Cache cleared successfully');
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
};

/**
 * Clear cache on app load for optimal performance
 */
export const initializeCacheClearing = () => {
  // Clear cache on app startup
  clearAllCache();

  // Optional: Clear cache every 30 minutes during runtime
  const CACHE_CLEAR_INTERVAL = 30 * 60 * 1000; // 30 minutes
  setInterval(() => {
    clearAllCache();
  }, CACHE_CLEAR_INTERVAL);
};
