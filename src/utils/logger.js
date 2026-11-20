// src/utils/logger.js
const LOG_LEVELS = { DEBUG: 10, INFO: 20, WARN: 30, ERROR: 40 };
let currentLevel = import.meta.env?.PROD ? LOG_LEVELS.INFO : LOG_LEVELS.DEBUG;

const logger = {
  isDebugEnabled: () => currentLevel <= LOG_LEVELS.DEBUG,
  setLevel: (level) => {
    if (LOG_LEVELS[level]) currentLevel = LOG_LEVELS[level];
  },
  debug: (message, meta = {}) => {
    if (currentLevel <= LOG_LEVELS.DEBUG) {
      console.debug(`[DEBUG] ${message}`, meta);
    }
  },
  info: (message, meta = {}) => {
    if (currentLevel <= LOG_LEVELS.INFO) {
      console.info(`[INFO] ${message}`, meta);
    }
  },
  warn: (message, meta = {}) => {
    if (currentLevel <= LOG_LEVELS.WARN) {
      console.warn(`[WARN] ${message}`, meta);
    }
  },
  error: (message, meta = {}) => {
    if (currentLevel <= LOG_LEVELS.ERROR) {
      console.error(`[ERROR] ${message}`, meta);
    }
  },
};

export default logger;