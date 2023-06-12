import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../db/config/index.js";
import { userValidation, authValidation } from "../../validations/auth.js";

const login = async (req, res) => {
  const { username, password } = req.body;

  const validation = await authValidation(username, password);

  if (validation.valid) {
    const user = validation.payload;
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    // save user token
    user.token = token;
  }

  res.json({ login: "success" });
};

const register = async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  const validation = await userValidation(username);

  try {
    if (!validation.valid) {
      const hashedPassword = await bcrypt.hash(password, process.env.SALT);
      const dbQuery =
        "insert into system_users (firstName, lastName, username, password) values (?, ?, ?, ?)";
      const data = await db.query(dbQuery, [
        firstName,
        lastName,
        username,
        hashedPassword,
      ]);
      res.json({ data });
    }
  } catch (error) {
    console.log(error);
    res.json({ error: "internal error 500" });
  }
};

export { login, register };
