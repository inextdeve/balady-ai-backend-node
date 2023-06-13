import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (token) {
      const decodedData = jwt.verify(token, process.env.TOKEN_KEY);

      req.userId = decodedData?.userId;
    }

    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export default auth;
