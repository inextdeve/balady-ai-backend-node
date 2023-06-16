import express from "express";
import {
  addCamera,
  getCameras,
  removeCamera,
  updateCamera,
} from "../controller/api/camera.js";

const router = express.Router();

router.get("/cameras", getCameras);
router.post("/camera", addCamera);
router.patch("/camera", updateCamera);
router.delete("/camera", removeCamera);
export default router;
