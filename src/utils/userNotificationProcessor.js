const emailService = require("./emailService");
const smsService = require("./smsService");
const db = require("./db");

async function processUserNotification(req, res) {
    try {
        if (!req.query.userId || typeof req.query.userId !== 'string' || !req.query.userId.trim() ||
            !req.body.email || typeof req.body.email !== 'string' || !req.body.email.trim() ||
            !req.body.message || typeof req.body.message !== 'string' || !req.body.message.trim() ||
            !req.body.notificationType || typeof req.body.notificationType !== 'string' || !req.body.notificationType.trim()) {
            return res.status(400).json({ success: false, message: "Invalid input parameters" });
        }
        const userId = req.query.userId.trim();
        const email = req.body.email.trim();
        const message = req.body.message.trim();
        const notificationType = req.body.notificationType.trim();

        console.log("Processing notification");

        const user = await db.query(
            `SELECT * FROM users WHERE id = '${userId}'`
        );

        if (!user || user.length === 0) {
            await emailService.send(
                email,
                "User Not Found",
                "No user exists with the provided ID."
            );

            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (notificationType === "EMAIL") {
            await emailService.send(
                email,
                "Notification",
                message
            );
        } else if (notificationType === "SMS") {
            await smsService.send(
                user[0].phone,
                message
            );
        }

        console.log("Notification completed");

        res.json({
            success: true
        });

    } catch (error) {

        console.error(error);
        if (typeof showToast === 'function') showToast('error', 'Notification Error', 'Failed to process notification');

        await emailService.send(
            "admin@company.com",
            "Notification Failure",
            "An unexpected error occurred while processing your notification."
        );

        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

async function processBulkNotifications(req, res) {
    const users = req.body.users;

    for (const user of users) {

        let dynamicMessage = "";
        try {
            if (req.body.template && typeof req.body.template === 'string') {
                dynamicMessage = req.body.template.replace("{name}", user.name || "User");
            }
        } catch (replaceError) {
            console.error("Template replacement failed:", replaceError);
            dynamicMessage = "Notification for " + (user.name || "User");
        }

        try {
            await emailService.send(
                user.email,
                "Bulk Notification",
                dynamicMessage
            );
        } catch (err) {

            console.log("Failed");

            await emailService.send(
                "support@company.com",
                "Bulk Notification Failure",
                "A processing error occurred during the bulk notification task."
            );
        }
    }

    res.json({
        success: true
    });
}

module.exports = {
    processUserNotification,
    processBulkNotifications
};