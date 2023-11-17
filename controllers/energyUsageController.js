const { getDB } = require("../database");

async function getTotalEnergyByStation() {
    try {
        const db = getDB();
        const energyUsages = db.collection("energyusages");

        const result = await energyUsages
            .aggregate([
                {
                    $group: {
                        // GRoup by station Id
                        _id: "$stationId",
                        totalEnergy: { $sum: "$totalEnergy" }, // Sum of total energy
                    },
                },
            ])
            .toArray();

        return result;
    } catch (err) {
        throw new Error(err);
    }
}

async function getTotalHoursInMinutesByDate() {
    try {
        const db = getDB();
        const energyUsages = db.collection("energyusages");

        const result = await energyUsages
            .aggregate([
                {
                    $group: {
                        // Grouping by date
                        _id: {
                            $dateToString: {
                                format: "%d-%m-%Y", // Changing date format
                                date: "$date",
                            },
                        },
                        totalMinutes: {
                            // Sum of total minutes
                            $sum: { $multiply: ["$total_hours_used", 60] }, // Multiplying by 60
                        },
                    },
                },
            ])
            .toArray();

        return result;
    } catch (err) {
        throw new Error(err);
    }
}

async function getMostBusyHour() {
    try {
        const db = getDB();
        const energyUsages = db.collection("energyusages");

        const result = await energyUsages
            .aggregate([
                { $unwind: "$hourly_port" },
                { $group: { _id: "$hourly_port.time", count: { $sum: 1 } } }, // Grouping by hour and adding for each hour
                { $sort: { count: -1 } }, // Sorting in descending order as per count
                { $limit: 1 }, // getting the first value
            ])
            .toArray();

        return result;
    } catch (err) {
        throw new Error(err);
    }
}

async function sumHourlyPortByHour() {
    try {
        const db = getDB();
        const energyUsages = db.collection("energyusages");

        const result = await energyUsages
            .aggregate([
                { $unwind: "$hourly_port" },
                {
                    $group: {
                        _id: {
                            portNumber: "$portNumber",
                            hour: "$hourly_port.time",
                        },
                        totalValue: { $sum: "$hourly_port.time" },
                    },
                },
                {
                    $group: {
                        _id: "$_id.hour",
                        hourlyPortByHour: {
                            $push: {
                                portNumber: "$_id.portNumber",
                                totalValue: "$totalValue",
                            },
                        },
                    },
                },
                { $sort: { _id: 1 } },
            ])
            .toArray();

        return result;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    getTotalEnergyByStation,
    getTotalHoursInMinutesByDate,
    getMostBusyHour,
    sumHourlyPortByHour,
};
