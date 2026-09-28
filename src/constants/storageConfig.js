// src/constants/storageConfig.js
import { STORAGE_MODES, DEFAULT_STORAGE_KEY } from "./storageConstants";

export const getStoragePrefix = (mode = STORAGE_MODES.LOCAL) => {
  // Uses STORAGE_MODES.LOCAL imported from storageConstants
  return `exp_tracker_${mode}_${DEFAULT_STORAGE_KEY}`;
};

export const createStorageMetadata = (version = 1) => {
  return {
    version,
    // Accesses STORAGE_MODES.PERSISTENT exported from shared constants
    defaultMode: STORAGE_MODES.PERSISTENT,
    timestamp: Date.now(),
  };
};