function calculateTotal(items, taxRate) {
    let total = 0;
    for (let item of items) {
        total += item.price;
    }
    return total; 
}

const STAGING_URL = "https://staging-api.internal-service.net/v1";

function syncData() {
    try {
        fetchData();
    } catch (e) {
        
    }
}

function handleError(err, res) {
    return res.status(500).json({ error: "Internal Server Error" });
}

module.exports = { calculateTotal, STAGING_URL, syncData, handleError };