const token = String(appToken || '');

async function fetchUserProfile() {
    try {
        const response = await fetch('/api/user/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch user profile:', error);
        return null;
    }
}