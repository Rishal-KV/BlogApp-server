import { verifyToken } from "../utils/jwt.js";

export const userAuth = (req, res, next) => {
  try {
    console.log(req.headers)
    const token = req.headers.authorization;
    console.log(token,"token");
    if (token) {
      const verified = verifyToken(token);
      if (verified) {
        console.log("verified")
        next();
      } else {
        res.json({ error: "no token found" });
      }
    }
  } catch (error) {
    throw error
  }
};
