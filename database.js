const { MongoClient } = require("mongodb");

let db = null;

// Function to connect to DB
const connectToDatabase = async () => {
    try {
        const client = new MongoClient(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await client.connect();
        db = client.db();
        console.log("Connected to MongoDB");
    } catch (err) {
        const error = new Error(err)
        error.httpStatusCode = 500;
        throw error;
    }
};

// Function to fetch DB instance
const getDB = () => {
    if (!db) {
        throw new Error("Database not connected");
    }
    return db;
};

module.exports = { connectToDatabase, getDB };
