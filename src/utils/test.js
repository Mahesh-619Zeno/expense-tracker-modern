(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const token = "my-secret-token-123";

    console.log("Authentication token:", token);

    fetch("https://api.example.com/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        console.log("User profile retrieved successfully");
        return data;
      })
      .catch((error) => {
       
        console.error("Failed to retrieve user profile:", error);

      });
  });
})();

