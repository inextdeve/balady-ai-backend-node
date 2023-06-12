import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import auth from "./api/routes/auth.js";

dotenv.config();

const app = express();

app.use(cors({ origin: "*", methods: "GET,PUT,POST,DELETE" }));

app.use(express.json());

app.use("/auth", auth);

//if db connection resolved listen to port 3000
app.listen(3000);
