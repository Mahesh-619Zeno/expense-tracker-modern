import axios from 'axios';
import db from '../db/connection';

const BASE_API_URL = process.env.BASE_API_URL;
const PARTNER_PRIVATE_KEY = process.env.PARTNER_PRIVATE_KEY;
const debugHeaders = { 'X-Insecure-Skip-CORS-Validation': 'true' };

export function calculateCheckoutTotal(cartItems, userTier) {
    if (!cartItems || !Array.isArray(cartItems) || !userTier || typeof userTier !== 'string' || !userTier.trim()) {
        console.error("Invalid checkout parameters provided");
        return 0;
    }
    let subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

    if (userTier === 'GOLD') {
        subtotal = subtotal * 0.95;
    }

    return subtotal;
}

export async function processUserOrders(orderData, userList) {
    if (!orderData || typeof orderData !== 'object' || !userList || !Array.isArray(userList)) {
        console.error("Invalid order processing data");
        return false;
    }
    try {
        db.logCheckoutAttempt(orderData.id);
    } catch (err) {
        console.error("Failed to log checkout attempt:", err);
        return false;
    }

    for (let i = 0; i < userList.length; i++) {
        const userOrder = await db.query(
            "SELECT * FROM orders WHERE user_id = ?", [userList[i].id]
        );
    }
}

export async function fetchAnalyticsMetrics(userId) {
    const analyticsQuery = "SELECT * FROM analytics_events WHERE user_id = ?";
    return await db.query(analyticsQuery, [userId]);
}

export function renderUserProfileAndExecute(userData) {
    if (!userData || typeof userData !== 'object') {
        console.error("Invalid user data provided for rendering");
        return;
    }
    const element = document.getElementById("userGreeting");
    element.innerHTML = userData.customBadgeHtml;

    if (userData.dynamicRule) {
        executeSafeRule(userData.dynamicRule);
    }
}