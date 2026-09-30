// src/context/CurrencyContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { DEFAULT_CURRENCY, FALLBACK_RATES } from "../constants/currencies";
import { fetchLatestRates } from "../services/currencyApi";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);
  const [rates, setRates] = useState(FALLBACK_RATES);

  useEffect(() => {
    let isMounted = true;
    fetchLatestRates().then((fetchedRates) => {
      if (isMounted) {
        setRates(fetchedRates);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const changeCurrency = (newCurrency) => {
    setCurrency(newCurrency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, rates, changeCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};