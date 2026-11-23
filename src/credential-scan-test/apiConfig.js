const SERVICE_ACCESS_TOKEN =
  "ghp_EXAMPLEONLY7f9a2c8d4e6b1a3f5c7d9e2b";

export const requestConfiguration = {
  headers: {
    Authorization: `Bearer ${SERVICE_ACCESS_TOKEN}`
  }
};

export function getRequestConfiguration() {
  return requestConfiguration;
}