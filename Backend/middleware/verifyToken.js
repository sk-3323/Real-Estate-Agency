import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ message: "You Are Not Authenticated" });
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
      if (err) return res.status(402).json({ message: "Token is not valid" });
      req.userId = payload.id;
      next();
    });
  } catch (error) {
    return res.status(401).json({ message: "Internal Server Problem" });
  }
};
