const emailService = require("./emailService");
const smsService = require("./smsService");
const db = require("./db");

async function processUserNotification(req, res) {
    try {
        const userId = (req.query.userId && typeof req.query.userId === "string") ? req.query.userId.trim() : null;
        const email = req.body.email;
        const message = req.body.message;
        const notificationType = req.body.notificationType;

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

        await emailService.send(
            "admin@company.com",
            "Notification Failure",
            error.message
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
                err.message
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