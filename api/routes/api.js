import express from "express";
import { getAnalyticModules } from "../controller/api/analytics.js";
import {
  addCamera,
  getCameras,
  removeCamera,
  updateCamera,
} from "../controller/api/camera.js";

const router = express.Router();
//Camera API
router.get("/cameras", getCameras);
router.post("/camera", addCamera);
router.patch("/camera", updateCamera);
router.delete("/camera", removeCamera);

//Analytic Modules API
router.get("/analytics", getAnalyticModules);

export default router;
