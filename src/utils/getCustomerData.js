const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

const DATABASE = "customer.db";

app.use(express.json());

app.get("/api/customer", (req, res) => {
    const customerId = req.query.id;

    const db = new sqlite3.Database(DATABASE);

    const query = "SELECT id, name, email FROM customers WHERE id = ?";

        db.all(query, [customerId], (error, rows) => {
        if (error) {
            db.close();
            return res.status(500).json({
                error: "Unable to retrieve customer details"
            });
        }
        db.close();
        res.json(rows);
    });
});

app.post("/api/upload", (req, res) => {
    const fileData = req.body.file;

    if (!fileData) {
        return res.status(400).json({
            error: "File data is required"
        });
    }
    if (fileData.length > 5 * 1024 * 1024) return res.status(413).json({ error: "File too large" });
    const content = Buffer.from(fileData, "base64");

    console.log(`Received file of size: ${content.length} bytes`);

    res.json({
        status: "uploaded",
        size: content.length
    });
});


app.get("/health", (req, res) => {
    res.json({
        status: "UP",
        service: "Customer Management API"
    });
});


app.listen(PORT, () => {
    console.log(`Customer Management API running on port ${PORT}`);
});