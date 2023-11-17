const { getDB } = require("../database");

async function sumLoginActionsByUserId() {
    try {
        const db = getDB();
        const userAnalytics = db.collection("useranalytics");

        const result = await userAnalytics
            .aggregate([
                { $match: { action: "LOGIN" } }, // Matching LOGIN actions only
                {
                    $group: {   // Grouping by user ID
                        _id: "$userId",
                        totalLogins: { $sum: 1 }, // Count occurrences of LOGIN per userId
                    },
                },
                { $sort: { totalLogins: -1 } }, // Sort by totalLogins in descending order
            ])
            .toArray();

        return result;
    } catch (err) {
        throw new Error(err);
    }
}

async function getMostActiveUserByDate() {
    try {
        const db = getDB();
        const userAnalytics = db.collection("useranalytics");

        const result = await userAnalytics
            .aggregate([
                {
                    $group: { // Grouping users by date
                        _id: {
                            createdAtDate: {
                                $dateToString: {
                                    format: "%d-%m-%Y",
                                    date: "$createdAt",
                                },
                            },
                            userId: "$userId",
                        },
                        totalActions: { $sum: 1 },
                    },
                },
                {
                    $group: {
                        _id: "$_id.createdAtDate",
                        mostActiveUser: { $first: "$_id.userId" }, // Getting the userId with the highest totalActions for each date
                        totalActions: { $max: "$totalActions" }, // Get the maximum totalActions for each date
                    },
                },
                { $sort: { _id: 1 } }, // sorting by createdAtDate
            ])
            .toArray();

        return result;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = { sumLoginActionsByUserId, getMostActiveUserByDate };
