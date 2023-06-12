import express from "express";
import { login, register } from "../controller/auth/index.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

export default router;
