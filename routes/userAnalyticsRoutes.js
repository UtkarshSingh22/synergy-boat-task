const express = require("express");
const router = express.Router();
const {
    sumLoginActionsByUserId,
    getMostActiveUserByDate,
} = require("../controllers/userAnalyticsController");

// Route for summing LOGIN actions by userId
router.get("/sum-login-actions-by-userId", async (req, res) => {
    try {
        const result = await sumLoginActionsByUserId();
        res.json(result);
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        throw error;
    }
});

// Route for getting the most active user by createdAt date
router.get("/most-active-user-by-date", async (req, res) => {
    try {
        const result = await getMostActiveUserByDate();
        res.json(result);
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        throw error;
    }
});

module.exports = router;
