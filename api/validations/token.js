import jwt from "jsonwebtoken";
const tokenValidation = (token) => {
  if (token) {
    const decodedData = jwt.verify(token, process.env.TOKEN_KEY);
    return { valid: true, payload: decodedData?.userId };
  }
};

export default tokenValidation;
