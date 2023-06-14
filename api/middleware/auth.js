import tokenValidation from "../validations/token.js";

const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error("Not Authorized")
  
    const token = req.headers.authorization.split(" ")[1];
    const tokenValid = await tokenValidation(token);
    req.userId = tokenValid.payload;
    next();
    
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export default auth;
