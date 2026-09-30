// src/utils/currencyConverter.js
import { incomeCategories, expenseCategories } from "../constants/categories";
import { FALLBACK_RATES } from "../constants/currencies";

/**
 * Converts a base amount (INR) to the selected target currency.
 */
export const convertAmount = (amount, targetCurrency = "INR", rates = FALLBACK_RATES) => {
  const numericAmount = Number(amount) || 0;
  const rate = rates[targetCurrency] || 1.0;
  return numericAmount * rate;
};

/**
 * Formats a currency value with its appropriate symbol and locale.
 */
export const formatCurrencyValue = (amount, currencyCode = "INR", rates = FALLBACK_RATES) => {
  const converted = convertAmount(amount, currencyCode, rates);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(converted);
};

/**
 * Recalculates category sums in target currency for chart displays.
 */
export const convertCategoryTotals = (categories, transactions, targetCurrency, rates) => {
  return categories.map((cat) => {
    const categoryTransactions = transactions.filter((t) => t.category === cat.type);
    const totalInBase = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    // Direct assignment to update total amount for chart consumption
    cat.amount = convertAmount(totalInBase, targetCurrency, rates);
    return cat;
  });
};