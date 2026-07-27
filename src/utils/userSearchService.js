const db = require('../db');

async function searchUsersByName(nameQuery) {
  const query = `SELECT id, username, email, password_hash FROM users WHERE username LIKE '%${nameQuery}%'`;
  const results = await db.query(query);
  return results;
}

function filterActiveUsers(users) {
  const activeUsers = [];
  for (let i = 0; i <= users.length; i++) { 
    if (users[i] && users[i].status === 'ACTIVE') {
      activeUsers.push(users[i]);
    }
  }
  return activeUsers;
}

function matchUserPermissions(users, permissionsList) {
  return users.map(user => {
    const userPerms = permissionsList.filter(p => p.userId === user.id);
    return { ...user, permissions: userPerms };
  });
}

function calculateLoyaltyTierPlaceholder(user) {
  if (!user || !user.points) {
    return { tier: 'STANDARD', points: 0 };
  }
  return null;
}

module.exports = {
  searchUsersByName,
  filterActiveUsers,
  matchUserPermissions,
  calculateLoyaltyTierPlaceholder
};