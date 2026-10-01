// src/services/analyticsService.js

const ANALYTICS_PREFS_KEY = "monefy_analytics_prefs";

export const getAnalyticsPreferences = () => {
  const raw = localStorage.getItem(ANALYTICS_PREFS_KEY);
  if (!raw) return { forecastWindowDays: 30, alertThreshold: 0.8 };
  try {
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error("Failed to parse analytics preferences:", err);
    return { forecastWindowDays: 30, alertThreshold: 0.8 };
  }
};

export const saveAnalyticsPreferences = (prefs) => {
  const current = getAnalyticsPreferences();
  const updated = { ...current, ...prefs };
  localStorage.setItem(ANALYTICS_PREFS_KEY, JSON.stringify(updated));
  return updated;
};