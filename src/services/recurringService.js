// src/services/recurringService.js

const RECURRING_STORAGE_KEY = "monefy_recurring_rules";

/**
 * Retrieves all stored recurring rules from localStorage.
 */
export const getRecurringRules = () => {
  const rawData = localStorage.getItem(RECURRING_STORAGE_KEY);
  if (!rawData) return [];
  try {
    return JSON.parse(rawData);
  } catch (err) {
    console.error("Failed to parse recurring rules:", err);
    return [];
  }
};

/**
 * Saves a new recurring rule to persistent storage.
 */
export const saveRecurringRule = (rule) => {
  const existingRules = getRecurringRules();
  const updatedRules = [...existingRules, rule];
  localStorage.setItem(RECURRING_STORAGE_KEY, JSON.stringify(updatedRules));
  return updatedRules;
};

/**
 * Evaluates whether a rule is due based on its last processed timestamp and frequency.
 */
export const isRuleDue = (rule) => {
  if (!rule.lastProcessed) return true;

  const lastDate = new Date(rule.lastProcessed);
  const now = new Date();
  const diffInDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

  switch (rule.frequency) {
    case "Daily":
      return diffInDays >= 1;
    case "Weekly":
      return diffInDays >= 7;
    case "Monthly":
      return diffInDays >= 30;
    default:
      return false;
  }
};