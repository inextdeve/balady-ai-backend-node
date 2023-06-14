import express from "express";
import { login, register, session } from "../controller/auth/index.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/session", auth, session);

export default router;
