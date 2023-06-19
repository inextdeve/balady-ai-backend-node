import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import auth from "./api/routes/auth.js";
import api from "./api/routes/api.js";
import { db } from "./api/db/config/index.js";
import {
  addCamera,
  removeCamera,
  updateCamera,
} from "./api/controller/api/camera.js";
dotenv.config();

const app = express();

app.use(cors({ origin: "*", methods: "GET,PUT,POST,DELETE,PATCH" }));

app.use(express.json());

app.use("/auth", auth);

app.use("/api", api);

app.get("/", async (req, res) => {
  const dbQuery = `SELECT cameras.name as cameraName, camera_analyticmodule.analyticmodule, analyticmodules.name FROM cameras
  JOIN camera_analyticmodule ON camera_analyticmodule.camera = cameras.id
  JOIN analyticmodules ON analyticmodules.id = camera_analyticmodule.analyticmodule
  `;
  const data = await db.query(dbQuery);
  console.log(data);
  res.status(200).json(data);
});

//if db connection resolved listen to port 3000
app.listen(process.env.APP_PORT);
