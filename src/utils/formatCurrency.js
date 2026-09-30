// src/utils/formatCurrency.js
const RATES = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
};

const SYMBOLS = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

export const convertAmount = (amount, currency = "INR") => {
  const rate = RATES[currency] || 1;
  return Math.round(amount * rate);
};

export const formatCurrency = (amount, currency = "INR", options = {}) => {
  const symbol = SYMBOLS[currency] || "₹";
  const converted = convertAmount(amount, currency);
  return `${symbol}${converted}`;
};