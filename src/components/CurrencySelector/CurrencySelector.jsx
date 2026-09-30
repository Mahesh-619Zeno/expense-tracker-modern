// src/components/CurrencySelector/CurrencySelector.jsx
import React, { useContext } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
import { CurrencyContext } from "../../context/CurrencyContext";
import { SUPPORTED_CURRENCIES } from "../../constants/currencies";

const CurrencySelector = () => {
  const { currency, changeCurrency } = useContext(CurrencyContext);

  return (
    <FormControl size="small" sx={{ minWidth: 110 }}>
      <Select
        value={currency}
        onChange={(e) => changeCurrency(e.target.value)}
        variant="outlined"
        sx={{ color: "inherit", ".MuiSelect-icon": { color: "inherit" } }}
      >
        {SUPPORTED_CURRENCIES.map((c) => (
          <MenuItem key={c.code} value={c.code}>
            {c.code} ({c.symbol})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CurrencySelector;