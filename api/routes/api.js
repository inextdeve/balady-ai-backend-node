import express from "express";
import { addCamera } from "../controller/api/index.js";

const router = express.Router();

router.post("/camera", addCamera);

export default router;
