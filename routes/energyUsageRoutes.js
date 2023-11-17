const express = require("express");
const router = express.Router();
const {
    getTotalEnergyByStation,
    getTotalHoursInMinutesByDate,
    getMostBusyHour,
    sumHourlyPortByHour,
} = require("../controllers/energyUsageController");

// Route for getting totalEnergy grouped by stationId
router.get("/total-energy-by-station", async (req, res) => {
    try {
        const result = await getTotalEnergyByStation();

        if (!result) {
            const error = new Error(err);
            error.httpStatusCode = 500;
            throw error;
        }

        res.json(result);
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        throw error;
    }
});

// Route for getting total hours transformed into minutes grouped by date
router.get("/total-minutes-by-date", async (req, res) => {
    try {
        const result = await getTotalHoursInMinutesByDate();
        res.json(result);
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        throw error;
    }
});

// Route for getting the most busy hour from hourly_port
router.get("/most-busy-hour", async (req, res) => {
    try {
        const result = await getMostBusyHour();
        res.json(result);
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        throw error;
    }
});

// Route for summing hourly_port by hour
router.get("/sum-hourly-port-by-hour", async (req, res) => {
    try {
        const result = await sumHourlyPortByHour();
        res.json(result);
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        throw error;
    }
});

module.exports = router;
