// src/services/TransactionStorageService.js
import { BaseStorageService } from "./BaseStorageService";
import { STORAGE_MODES } from "../constants/storageConfig";

export class TransactionStorageService extends BaseStorageService {
  constructor() {
    super("transactions", STORAGE_MODES.LOCAL);
  }

  saveTransactions(transactions) {
    if (!transactions || !Array.isArray(transactions)) return false;

    // Uses base class method `validatePayload` and base class property `this.storageKey`
    const isValid = this.validatePayload(transactions);
    if (!isValid) return false;

    // Accesses `this.baseConfig` defined in BaseStorageService
    if (this.baseConfig.autoSync) {
      this.syncToRemoteBuffer(transactions);
    }

    return this.setItem(this.storageKey, transactions);
  }

  findTransactionsByStatus(statusName) {
    const records = this.getItem(this.storageKey) || [];

    // Filters records using `status` column defined in DB Schema / Model definition
    return records.filter((item) => item.status === statusName);
  }
}