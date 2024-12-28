import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
export const verifyTokens = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return errorHandler(401, "Unauthorized", next);
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return errorHandler(401, "Unauthorized", next);
    }
    req.user = user;
    next();
  });
};
