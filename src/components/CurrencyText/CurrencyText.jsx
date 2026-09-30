// src/components/CurrencyText/CurrencyText.jsx
import React, { useContext } from "react";
import { CurrencyContext } from "../../context/CurrencyContext";
import { formatCurrencyValue } from "../../utils/currencyConverter";

const CurrencyText = ({ amount }) => {
  const { currency, rates } = useContext(CurrencyContext);
  const formatted = formatCurrencyValue(amount, currency, rates);

  return <span>{formatted}</span>;
};

export default CurrencyText;