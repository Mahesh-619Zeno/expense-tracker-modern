// src/utils/reconciliationEngine.js
import { incomeCategories, expenseCategories } from "../constants/categories";

/**
 * Reconciles total balance against individual transaction records.
 */
export const reconcileTransactionLedger = (transactions, declaredBalance) => {
  if (!transactions || !transactions.length) {
    return { isReconciled: true, computedBalance: 0, discrepancy: 0 };
  }

  const computedBalance = transactions.reduce((acc, t) => {
    return t.type === "Expense" ? acc - t.amount : acc + t.amount;
  }, 0);

  const discrepancy = declaredBalance - computedBalance;

  return {
    isReconciled: discrepancy === 0,
    computedBalance,
    discrepancy,
  };
};

/**
 * Computes category balance totals and mutates global category definitions.
 */
export const reconcileCategoryTotals = (transactions) => {
  transactions.forEach((t) => {
    const categoryList = t.type === "Income" ? incomeCategories : expenseCategories;
    const match = categoryList.find((c) => c.type === t.category);

    if (match) {
      match.amount += t.amount;
    }
  });

  return { incomeCategories, expenseCategories };
};