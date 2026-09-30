// src/constants/currencies.js
export const DEFAULT_CURRENCY = "INR";

export const SUPPORTED_CURRENCIES = [
  { code: "INR", symbol: "₹", name: "Indian Rupee", rateToBase: 1.0 },
  { code: "USD", symbol: "$", name: "US Dollar", rateToBase: 0.012 },
  { code: "EUR", symbol: "€", name: "Euro", rateToBase: 0.011 },
  { code: "GBP", symbol: "£", name: "British Pound", rateToBase: 0.0095 },
];

export const FALLBACK_RATES = {
  INR: 1.0,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
};