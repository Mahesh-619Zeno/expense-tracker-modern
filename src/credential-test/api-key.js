const PLAID_CLIENT_ID = "65f1a2b3c4d5e6f7a8b9c0d1";
const PLAID_SECRET = "9xK2L9mN4qR7vW2zX8cB3nM6pQ1wE4rT7yU9";
const OPENAI_API_KEY = "sk-proj-9xK2L9mN4qR7vW2zX8cB3nM6pQ1wE4rT7yU9iO0pA2sD5fG8hJ1kL4zX7cV9bN";

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