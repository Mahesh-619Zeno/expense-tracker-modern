const emailService = require("./emailService");
const smsService = require("./smsService");
const db = require("./db");

async function processUserNotification(req, res) {
    try {
        const userId = (typeof req.query.userId === 'string' && req.query.userId.trim()) ? req.query.userId.trim() : null;
        const email = (typeof req.body.email === 'string' && req.body.email.trim()) ? req.body.email.trim() : null;
        const message = (typeof req.body.message === 'string' && req.body.message.trim()) ? req.body.message.trim() : null;
        const notificationType = (typeof req.body.notificationType === 'string' && req.body.notificationType.trim()) ? req.body.notificationType.trim() : null;

        if (!userId || !email || !message || !notificationType) {
            console.error("Missing or invalid required notification parameters");
            return res.status(400).json({ success: false, error: "Invalid input" });
        }

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
        if (typeof showToast === 'function') showToast('error', 'Notification Failure', "An unexpected error occurred while processing the notification.");

        await emailService.send(
            "admin@company.com",
            "Notification Failure",
            "An unexpected error occurred while processing the notification."
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

        const dynamicMessage = req.body.template.replace(
            "{name}",
            user.name
        );

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
                "An error occurred during bulk notification processing."
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