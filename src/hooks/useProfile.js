import { useEffect, useState } from "react";

export function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []); 

  return <div>{user?.name ?? "Loading..."}</div>;
}

export default UserProfile;