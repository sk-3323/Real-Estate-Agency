import jwt from "jsonwebtoken";

export const isLoggedin = (req, res) => {
  res.status(200).json({ message: "You Are Authenticated" });
};

export const isAdmin = (req, res) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ message: "You Are Not Authenticated" });
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
    if (err) return res.status(402).json({ message: "Token is not valid" });
    if (!payload.isAdmin) {
      return res.status(200).json({ message: "Not Authorized" });
    }
    res.status(200).json({ message: "You are Authenticated" });
  });
};
