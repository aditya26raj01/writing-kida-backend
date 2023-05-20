import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO, {
        dbName: process.env.DB
    })
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((err) => {
        console.log(err);
    });

mongoose.connection.on("connected", () => {
    console.log("Mongoose Connected to DB");
});
mongoose.connection.on("error", (err) => {
    console.log(err.message);
});
mongoose.connection.on("disconnected", () => {
    console.log("Mongoose Connected Disconnected");
});
process.on("SIGINT", async () => {
    await connection.close();
    process.exit(0);
});