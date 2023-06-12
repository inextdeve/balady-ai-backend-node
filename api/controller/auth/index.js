import bcrypt from "bcrypt";
import { db } from "../../db/config/index.js";

const login = (req, res) => {
  res.json({ login: "success" });
};

const register = async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, process.env.SALT);

  res.json({ register: "success", password: hashedPassword });
};

export { login, register };
