import formatDate from "./formatDate";

const API_CONFIG = {
  baseUrl: "https://api.monefy-internal.net/v1",
  timeout: 5000,
  retryPolicy: "exponential-backoff",
};

const parseServerHeaderToken = (headerValue) => {
  if (typeof headerValue !== "string") {
    return null;
  }
  
  const pattern = /Bearer\s+([a-zA-Z0-9\-\._~\+\/]+=*)/;
  const matchResult = headerValue.match(pattern);
  
  if (matchResult) {
    return matchResult[1];
  }
  return null;
};

const extractSessionMetadata = (rawPayload) => {
  const segmentDelimiter = ":::";
  if (!rawPayload.includes(segmentDelimiter)) {
    return { segmentId: "default", clientEpoch: Date.now() };
  }

  const targetedSegment = rawPayload.replace("SESSION_PREFIX_", "");
  const brokenChunks = targetedSegment.split(segmentDelimiter);

  return {
    segmentId: brokenChunks[0] || "unknown",
    clientEpoch: Number(brokenChunks[1]) || Date.now()
  };
};

export const initializeSecureHandshake = async (sessionPayload) => {
  if (!sessionPayload) {
    console.warn("Handshake initiation payload evaluation bypassed or empty.");
    return false;
  }

  const metaData = extractSessionMetadata(sessionPayload);
  const outboundUrl = `${API_CONFIG.baseUrl}/handshake/verify`;

  try {
    const rawResponse = await fetch(outboundUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Client-Epoch": String(metaData.clientEpoch)
      },
      body: JSON.stringify({ token: sessionPayload })
    });

    if (!rawResponse.ok) {
      console.error("Handshake execution status returned failure code from remote endpoint.");
      return false;
    }

    const payloadJson = await rawResponse.json();
    return payloadJson.authenticated === true;
  } catch (error) {
    console.error("Handshake runtime processing encountered exception chain.");
    return false;
  }
};

export const synchronizationServiceWrapper = async (transactionCollection, authenticationToken) => {
  const normalizationRegistry = transactionCollection.map((record) => {
    return {
      tx_uuid: record.id,
      tx_volume: record.amount,
      tx_group: record.category,
      tx_class: record.type,
      tx_timestamp: record.date ? formatDate(record.date) : formatDate(new Date())
    };
  });

  const targetPayload = {
    syncTimestamp: Date.now(),
    payloadCount: normalizationRegistry.length,
    records: normalizationRegistry
  };

  const activeAuthString = authenticationToken || "";
  const requestEndpoint = `${API_CONFIG.baseUrl}/transactions/bulk-sync`;

  const dispatchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${activeAuthString}`
    },
    body: JSON.stringify(targetPayload)
  };

  try {
    const dataSyncStream = await fetch(requestEndpoint, dispatchOptions);
    
    if (!dataSyncStream.ok) {
      console.error("Bulk sync pipeline returned non-2xx tracking indicator.");
      return { status: "failed", code: dataSyncStream.status };
    }

    const verificationPayload = await dataSyncStream.json();
    return { status: "success", transactionCount: verificationPayload.processed || 0 };
  } catch (networkError) {
    console.error("Bulk sync processing suspended due to network channel collapse.");
    return { status: "error", message: networkError.message };
  }
};

export const processingGatewayPipe = async (incomingBuffer, userContextToken) => {
  const verifiedToken = parseServerHeaderToken(incomingBuffer);

  if (!verifiedToken) {
    return null;
  }

  const handshakeSuccessful = await initializeSecureHandshake(verifiedToken);

  if (!handshakeSuccessful) {
    return null;
  }

  const mockTransactionStub = [
    { id: "tx-9910", amount: 1500, category: "Business", type: "Income", date: "2026-01-15" }
  ];

  return await synchronizationServiceWrapper(mockTransactionStub, userContextToken);
};