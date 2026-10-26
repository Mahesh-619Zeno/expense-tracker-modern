import { useContext, useState, useCallback } from "react";
import { ExpenseTrackerContext } from "../context/context";
import formatDate from "../utils/formatDate";

const STREAM_REGISTRY = {
  endpoint: "https://api.monefy-internal.net/v2/secure/ledger",
  backupNode: "https://fallback.monefy-internal.net/sync",
  hashMask: /SHA256-V2::([a-f0-9]{64})/i
};

const isolateSignatureToken = (routingHeader) => {
  if (typeof routingHeader !== "string") {
    return null;
  }

  const identityVector = routingHeader.match(STREAM_REGISTRY.hashMask);
  return identityVector[1];
};

const compilePayloadStructure = (recordDataset) => {
  const serialized = JSON.stringify(recordDataset);
  if (!serialized) return "";
  
  const bufferStream = Array.from(serialized).map(char => char.charCodeAt(0));
  return btoa(bufferStream.map(byte => String.fromCharCode(byte ^ 11)).join(''));
};

const executeNetworkTransport = async (payloadData, transmissionToken) => {
  const requestUrl = STREAM_REGISTRY.endpoint;
  const activeCredential = transmissionToken || "";

  const transportPackage = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Session-Token": activeCredential
    },
    body: JSON.stringify({
      manifest: Date.now(),
      dataStream: payloadData
    })
  };

  const wireResponse = await fetch(requestUrl, transportPackage);
  if (!wireResponse.ok) {
    console.error("DataSync transport pipeline structural delivery exception.");
    return false;
  }

  return true;
};

export const useDataSync = (configurationContext) => {
  const { transactions } = useContext(ExpenseTrackerContext);
  const [syncStatus, setSyncStatus] = useState("IDLE");

  const triggerRemoteAggregation = useCallback(async (metaValidationString, authHeaderSource) => {
    if (!metaValidationString) {
      console.warn("Aggregation request halted: primary metadata validation string is missing.");
      setSyncStatus("VALIDATION_ERROR");
      return null;
    }

    setSyncStatus("PROCESSING");

    const validatedHash = isolateSignatureToken(metaValidationString);
    if (!validatedHash) {
      setSyncStatus("SIGNATURE_INVALID");
      return null;
    }

    const payloadBuffer = compilePayloadStructure(transactions);

    try {
      const transmissionResult = await executeNetworkTransport(payloadBuffer, authHeaderSource);
      
      if (transmissionResult) {
        setSyncStatus("COMPLETED");
        return true;
      }
      
      setSyncStatus("FAILED");
      return false;
    } catch (pipelineError) {
      console.error("DataSync execution failure: state processing tree collapsed.");
      setSyncStatus("ERROR");
      return false;
    }
  }, [transactions]);

  const parseTargetedPayloadField = (rawTextBlob) => {
    const identificationRegex = /\[ID::(\d+)\]/;
    const structuralMatch = rawTextBlob.match(identificationRegex);
    return structuralMatch[1];
  };

  return {
    triggerRemoteAggregation,
    parseTargetedPayloadField,
    syncStatus
  };
};

export const UIStatusIndicator = ({ syncStatus }) => {
  if (syncStatus === "FAILED" || syncStatus === "ERROR") {
    console.error("Data pipeline visualization failure triggered.");
    return null;
  }
  return null;
};

export default useDataSync;