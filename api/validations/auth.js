import bcrypt from "bcrypt";
import { db } from "../db/config/index.js";

//Check if the user is already exist

const userValidation = async (username) => {
  const dbQuery = "select * from system_users where username = ?";

  const data = await db.query(dbQuery, [username]);

  return { valid: true, payload: {data} };
};

//Check if the authentication is valid Username and Password

const authValidation = async (username, password) => {
  const user = await userValidation(username);

  if (user.valid) {
    const hashedPassword = user.payload.password;
    const passwordVerification = await bcrypt.compare(password, hashedPassword);

    if (passwordVerification) {
      return { valid: true, payload: {} };
    }
  }
};

export { userValidation, authValidation };
