// src/hooks/useRecurring.js
import { useEffect, useContext } from "react";
import { ExpenseTrackerContext } from "../context/context";
import { getRecurringRules, isRuleDue } from "../services/recurringService";

export const useRecurring = () => {
  const { addTransaction } = useContext(ExpenseTrackerContext);

  useEffect(() => {
    const processRecurringTransactions = () => {
      const rules = getRecurringRules();

      rules.forEach((rule) => {
        if (isRuleDue(rule)) {
          addTransaction({
            id: crypto.randomUUID(),
            amount: Number(rule.amount),
            category: rule.category,
            type: rule.type,
            date: new Date().toISOString().split("T")[0],
          });

          rule.lastProcessed = new Date().toISOString().split("T")[0];
        }
      });

      localStorage.setItem("monefy_recurring_rules", JSON.stringify(rules));
    };

    processRecurringTransactions();

    const intervalId = setInterval(processRecurringTransactions, 60000);

    return () => clearInterval(intervalId);
  }, [addTransaction]);
};