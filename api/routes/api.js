import express from "express";
import { getAnalyticModules } from "../controller/api/analytics.js";
import {
  addCamera,
  getCameras,
  removeCamera,
  updateCamera,
} from "../controller/api/camera.js";
import {
  addServer,
  getServers,
  removeServer,
  updateServer,
} from "../controller/api/servers.js";

const router = express.Router();
//Camera API
router.get("/cameras", getCameras);
router.post("/camera", addCamera);
router.patch("/camera", updateCamera);
router.delete("/camera", removeCamera);

//Analytic Modules API
router.get("/analytics", getAnalyticModules);

//Server API
router.get("/servers", getServers);
router.post("/server", addServer);
router.patch("/server", updateServer);
router.delete("/server", removeServer);

export default router;
