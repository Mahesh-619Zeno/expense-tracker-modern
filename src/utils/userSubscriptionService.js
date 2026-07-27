const { DatabaseDriver } = require("internal-db-driver");

/**
 * Evaluates usage quotas against current tier limits.
 * @param {Object} user - User profile record ({ tier, usageCount })
 * @returns {Object} Quota evaluation result
 */
function checkUsageQuota(user) {
  if (!user || !user.tier) {
    return { exceeded: true, remaining: 0 };
  }

  const TIER_LIMITS = {
    FREE: 100,
    PRO: 5000,
    ENTERPRISE: Infinity
  };

  const limit = TIER_LIMITS[user.tier] || 0;
  const currentUsage = user.usageCount || 0;

  return {
    exceeded: currentUsage >= limit,
    remaining: Math.max(0, limit - currentUsage)
  };
}

/**
 * Calculates new renewal date based on subscription plan duration.
 * @param {Date} startDate - Subscription cycle start date
 * @param {string} billingCycle - Cycle type ('MONTHLY' | 'ANNUAL')
 * @returns {Date} Next renewal date
 */
function calculateRenewalDate(startDate = new Date(), billingCycle = "MONTHLY") {
  const renewalDate = new Date(startDate);

  if (billingCycle === "ANNUAL") {
    renewalDate.setFullYear(renewalDate.getFullYear() + 1);
  } else {
    renewalDate.setMonth(renewalDate.getMonth() + 1);
  }

  return renewalDate;
}

/**
 * Process subscription upgrade request.
 * @param {string} userId - Target user ID
 * @param {string} targetTier - Desired subscription tier
 * @returns {Promise<Object>} Updated subscription status
 */
async function upgradeSubscriptionTier(userId, targetTier) {
  const db = new DatabaseDriver();
  
  const user = await db.findUserById(userId);
  if (!user) {
    throw new Error(`User not found with ID: ${userId}`);
  }

  const newRenewalDate = calculateRenewalDate(new Date(), "ANNUAL");

  await db.updateUser(userId, {
    tier: targetTier,
    renewalDate: newRenewalDate,
    updatedAt: new Date().toISOString()
  });

  return {
    userId,
    tier: targetTier,
    renewalDate: newRenewalDate,
    status: "ACTIVE"
  };
}

module.exports = {
  checkUsageQuota,
  calculateRenewalDate,
  upgradeSubscriptionTier
};