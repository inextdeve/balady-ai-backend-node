import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../db/config/index.js";
import {
  userValidation,
  authValidation,
  AuthenticationError,
} from "../../validations/auth.js";
import { getUserById } from "../../util/users.js";

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const validation = await authValidation(username, password);

    if (validation.valid) {
      const user = validation.payload;
      // Create token
      const token = jwt.sign(
        { userId: user.userId, username: user.username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.userToken = token;
      res.status(200).json(user);
    }
  } catch (error) {
    if (error instanceof AuthenticationError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500);
    }
  }
};

const register = async (req, res) => {
  const { firstName, lastName, username, password } = req.body;

  const validation = await userValidation(username);

  //If the username does not exist in the DB validation.valid return `false`
  if (!validation.valid) {
    try {
      const salt = parseInt(process.env.SALT);
      const hashedPassword = await bcrypt.hash(password, salt);
      const dbQuery =
        "insert into users (firstName, lastName, username, password) values (?, ?, ?, ?)";
      const data = await db.query(dbQuery, [
        firstName,
        lastName,
        username,
        hashedPassword,
      ]);

      res.json({ id: parseInt(data.insertId) });
    } catch (error) {
      res.status(500);
    }
  } else {
    res.json({ error: "Username exist" });
  }
};

const session = async (req, res) => {
  try {
    const user = await getUserById(req.userId);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

export { login, register, session };
