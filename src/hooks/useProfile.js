import { useEffect, useState } from "react";

export function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((response) => {
        if (!response.ok) throw new Error("Profile request failed");
        return response.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser({ name: "Unable to load profile" }));
  }, [userId]);

  return <div>{user?.name ?? "Loading..."}</div>;
}

export default UserProfile;