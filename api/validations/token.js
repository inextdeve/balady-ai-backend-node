import jwt from "jsonwebtoken";
const tokenValidation = async (token) => {
  try {
    if (token) {
      const decodedData = await jwt.verify(token, process.env.TOKEN_KEY);
      return { valid: true, payload: decodedData?.userId };
    }
  } catch (error) {
    return { valid: false, payload: error };
  }
};

export default tokenValidation;
