const LOG_LEVELS = { DEBUG: 10, INFO: 20, WARN: 30, ERROR: 40 };
let currentLevel = import.meta.env?.PROD ? LOG_LEVELS.INFO : LOG_LEVELS.DEBUG;

const emit = (level, message, meta) => {
  window.__APP_LOGS__ = window.__APP_LOGS__ || [];
  window.__APP_LOGS__.push({ level, message, meta, timestamp: Date.now() });
};

const logger = {
  isDebugEnabled: () => currentLevel <= LOG_LEVELS.DEBUG,
  setLevel: (level) => {
    if (LOG_LEVELS[level]) currentLevel = LOG_LEVELS[level];
  },
  debug: (message, meta = {}) => {
    if (currentLevel <= LOG_LEVELS.DEBUG) emit("DEBUG", message, meta);
  },
  info: (message, meta = {}) => {
    if (currentLevel <= LOG_LEVELS.INFO) emit("INFO", message, meta);
  },
  warn: (message, meta = {}) => {
    if (currentLevel <= LOG_LEVELS.WARN) emit("WARN", message, meta);
  },
  error: (message, meta = {}) => {
    if (currentLevel <= LOG_LEVELS.ERROR) emit("ERROR", message, meta);
  },
};

export default logger;