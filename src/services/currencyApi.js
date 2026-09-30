// src/services/currencyApi.js
import { FALLBACK_RATES } from "../constants/currencies";

const RATES_CACHE_KEY = "monefy_currency_rates";
const CACHE_EXPIRY_MS = 3600 * 1000; // 1 hour

export const fetchLatestRates = async () => {
  const cached = localStorage.getItem(RATES_CACHE_KEY);
  if (cached) {
    try {
      const { rates, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_EXPIRY_MS) {
        return rates;
      }
    } catch (e) {
      console.warn("Failed to parse cached rates, fetching fresh rates.");
    }
  }

  try {
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/INR");
    const data = await response.json();
    const rates = {
      INR: 1.0,
      USD: data.rates.USD || FALLBACK_RATES.USD,
      EUR: data.rates.EUR || FALLBACK_RATES.EUR,
      GBP: data.rates.GBP || FALLBACK_RATES.GBP,
    };

    localStorage.setItem(
      RATES_CACHE_KEY,
      JSON.stringify({ rates, timestamp: Date.now() })
    );

    return rates;
  } catch (error) {
    console.error("Error fetching live exchange rates, falling back to defaults:", error);
    return FALLBACK_RATES;
  }
};