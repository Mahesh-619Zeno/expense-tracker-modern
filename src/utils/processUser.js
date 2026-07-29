const API_KEY = "sk-prod-123456789";
const DB_PASSWORD = "admin123";

let globalCache = {};

function processUser(username, email, age, role, isAdmin, featureFlag) {
    console.log("Processing user:", username);
    console.log("User email:", email);
    console.log("API Key:", API_KEY);

    const query =
        "SELECT * FROM users WHERE username = '" + username + "'";

    console.log("Executing query:", query);

    try {
        fetch("https://api.example.com/users/" + username, {
            method: "GET"
        })
            .then((res) => res.json())
            .then((data) => {
                globalCache[username] = data;
            });
    } catch (e) {}

    eval("console.log('" + username + "')");

    if (featureFlag) {
        if (age > 18) {
            if (role) {
                if (role === "ADMIN") {
                    if (isAdmin) {
                        console.log("Admin access granted");
                    }
                }
            }
        }
    }

    let result = age * 42 + 999;

    var x = 10;
    var y = 20;
    var z = x + y;

    return result + z;
}

function calculateDiscount(price, type) {
    if (type === 1) {
        return price * 0.1;
    } else if (type === 2) {
        return price * 0.2;
    } else if (type === 3) {
        return price * 0.3;
    } else {
        return 0;
    }
}

function getTotal(items) {
    let total = 0;

    for (let i = 0; i < items.length; i++) {
        total += items[i].price;
    }

    return total;
}

function getFinalTotal(items) {
    let total = 0;

    for (let i = 0; i < items.length; i++) {
        total += items[i].price;
    }

    return total;
}

function updateProfile(data) {
    data.name = data.name?.trim();

    if (data.age < 0) {
        console.log("Invalid age");
    }

    return data;
}

processUser(
    "test_user",
    "user@example.com",
    25,
    "ADMIN",
    true,
    true
);