import bcrypt from "bcrypt";
import { db } from "../db/config/index.js";

// ERROR CLASS
class AuthenticationError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

//Check if the user is already exist

const userValidation = async (username) => {
  const dbQuery = "select * from users where username = ?";

  const data = await db.query(dbQuery, [username]);

  //If the username does not exist in the DB
  if (data.length < 1) {
    return { valid: false, payload: username };
  }

  // If the username exist in the database
  return {
    valid: true,
    payload: { ...data[0], userId: parseInt(data[0].userId) },
  };
};

//Check if the authentication is valid Username and Password

const authValidation = async (username, password) => {
  const user = await userValidation(username);

  if (user.valid) {
    const hashedPassword = user.payload.password;
    const passwordVerification = await bcrypt.compare(password, hashedPassword);

    delete user.payload.password;

    if (passwordVerification) {
      return { valid: true, payload: { ...user.payload } };
    } else {
      throw new AuthenticationError("Invalid password");
    }
  }
  throw new AuthenticationError("Invalid username or password");
};

export { userValidation, authValidation, AuthenticationError };
