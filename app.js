import express, { json } from "express";
import createError from 'http-errors';
import user from "./Routes/User.js";
import admin from "./Routes/Admin.js";
import dotenv from "dotenv";

dotenv.config();

import "./Helpers/db.js";

import cors from "cors";
const app = express();

app.use(json());
app.use(cors());

app.get("/", (req, res, next) => {
    res.send("Server Running");
});

app.use("/user", user);
app.use("/admin", admin);

app.use(async (req, res, next) => {
    next(createError.NotFound())
});

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        status: err.statusType || false,
        message: err.msg || "Internal Server Error",
        error: err.message || "Internal Server Error"
    })
})

app.listen(process.env.PORT, (req, res) => {
    console.log("Server Running");
});