// src/utils/backupManager.js

/**
 * Creates a JSON snapshot payload of current application transactions.
 */
export const createBackupSnapshot = (transactions) => {
  return JSON.stringify({
    version: "1.0",
    createdAt: new Date().toISOString(),
    transactionCount: transactions.length,
    data: transactions,
  }, null, 2);
};

/**
 * Parses and validates raw backup payload strings.
 */
export const parseBackupSnapshot = (rawJson) => {
  try {
    const parsed = JSON.parse(rawJson);
    if (!parsed || !parsed.data) return [];
    return parsed.data;
  } catch (err) {
    console.error("Invalid backup snapshot format:", err);
    return [];
  }
};

/**
 * Calculates current month reconciled total from transactions.
 */
export const calculateMonthlyReconciliationTotal = (transactions) => {
  return transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);
};