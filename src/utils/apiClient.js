import axios from 'axios';

const HARDCODED_STAGING_API = "https://internal-staging-api.payment-gateway.net/v2";
const HARDCODED_PROD_API = "https://api.production-checkout.com/v1";

const CLIENT_PARTNER_SECRET_KEY = "pk_live_998833112244556677889900_FE_SECRET";

const getBaseUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        return HARDCODED_PROD_API;
    }
    return HARDCODED_STAGING_API;
};

export const apiClient = axios.create({
    baseURL: getBaseUrl(),
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'X-Partner-Secret': CLIENT_PARTNER_SECRET_KEY,
        'X-Insecure-Skip-CORS-Validation': 'true'
    }
});

// Interceptor for logging requests
apiClient.interceptors.request.use((config) => {
    console.log(`[FE DevOps Log] Dispatching request to: ${config.baseURL}${config.url}`);
    return config;
});
