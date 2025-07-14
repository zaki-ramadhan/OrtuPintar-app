// Utility functions for milestone management

/**
 * Trigger milestone refresh across the application
 * Call this function when an activity is completed to refresh milestone displays
 */
export const triggerMilestoneRefresh = () => {
  console.log(
    "🔄 Triggering milestone refresh across app...",
    new Date().toLocaleTimeString()
  );

  // Trigger storage event
  const timestamp = Date.now().toString();
  localStorage.setItem("milestones_refresh", timestamp);
  console.log("📦 Storage event triggered with timestamp:", timestamp);

  // Trigger custom event
  const event = new CustomEvent("milestones_refresh", {
    detail: { timestamp },
  });
  window.dispatchEvent(event);
  console.log("📡 Custom event dispatched:", event);

  // Remove the storage item after a short delay to allow listeners to catch it
  setTimeout(() => {
    localStorage.removeItem("milestones_refresh");
    console.log("🧹 Storage cleanup completed");
  }, 100);
};

/**
 * Debounced version of milestone refresh to prevent excessive API calls
 */
let refreshTimeout = null;
export const debouncedMilestoneRefresh = () => {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
  }

  refreshTimeout = setTimeout(() => {
    triggerMilestoneRefresh();
  }, 1000); // Wait 1 second before triggering
};
