import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import auth from "./api/routes/auth.js";
import api from "./api/routes/api.js";
import { db } from "./api/db/config/index.js";
dotenv.config();

const app = express();

app.use(cors({ origin: "*", methods: "GET,PUT,POST,DELETE" }));

app.use(express.json());

app.use("/auth", auth);

app.use("/api", api);

app.get("/", async (req, res) => {

  // const query = "SELECT * FROM cameras";

  // const data = await db.query(query);

  // console.log(JSON.parse(JSON.stringify(data)))

  res.status(200).json({"data": "s"});
});

//if db connection resolved listen to port 3000
app.listen(process.env.APP_PORT);
