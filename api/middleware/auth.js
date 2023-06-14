import tokenValidation from "../validations/token.js";

const auth = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const tokenValid = await tokenValidation(token);

  try {
    if (tokenValid.valid) {
      req.userId = tokenValid.payload;
      next();
    } else {
      throw new Error("Token not valid");
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error });
  }
};

export default auth;
