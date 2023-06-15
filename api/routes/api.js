import express from "express";
import { addCamera, getCameras } from "../controller/api/camera.js";

const router = express.Router();

router.post("/camera", addCamera);
router.get("/cameras", getCameras);
export default router;
