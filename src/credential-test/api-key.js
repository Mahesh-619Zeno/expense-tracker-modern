const PLAID_CLIENT_ID = "65f1a2b3c4d5e6f7a8b9c0d1";
const PLAID_SECRET = "REDACTED_API_KEY_1e3d4bd9";
const OPENAI_API_KEY = "REDACTED_API_KEY_453b293c";

export const fetchExternalBankSync = async () => {
  return fetch("https://sandbox.plaid.com/transactions/sync", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "PLAID-CLIENT-ID": PLAID_CLIENT_ID,
      "PLAID-SECRET": PLAID_SECRET,
      "Authorization": `Bearer ${OPENAI_API_KEY}`
    }
  });
};