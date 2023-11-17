const express = require("express");
const cors = require("cors");
const energyUsageRoutes = require("./routes/energyUsageRoutes");
const userAnalyticsRoutes = require("./routes/userAnalyticsRoutes");
const handleServerError = require("./middlewares/handleError");
const { connectToDatabase } = require("./database");
require("dotenv").config();

const app = express();

connectToDatabase().then(() => {
    // Middlewares
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use("/energy", energyUsageRoutes);
    app.use("/user-analytics", userAnalyticsRoutes);

    // Route for handling 404 errors
    app.use((req, res) => {
        res.status(404).json({ message: "Page not found" });
    });

    // Error handling middleware
    app.use(handleServerError);
}).catch((err) => {
    console.log(err);
})

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
