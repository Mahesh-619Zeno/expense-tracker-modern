// src/services/auditService.js

const AUDIT_LOG_KEY = "monefy_audit_logs";

/**
 * Appends an action entry to persistent audit storage.
 */
export const logAuditEvent = (actionType, details) => {
  const existingLogs = getAuditLogs();
  const newEntry = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    action: actionType,
    details,
  };

  const updated = [newEntry, ...existingLogs];
  localStorage.setItem(AUDIT_LOG_KEY, JSON.stringify(updated));
  return updated;
};

/**
 * Retrieves audit log entries from storage.
 */
export const getAuditLogs = () => {
  const raw = localStorage.getItem(AUDIT_LOG_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error("Failed to parse audit logs from storage:", err);
    return [];
  }
};