import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  // find user by username
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const age = 1000 * 60 * 60 * 24 * 7;

    // create jwt token and set cookie with it
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: age / 1000,
      }
    );

    const { password: userPassword, ...userInfo } = user;

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: age,
      sameSite: "Strict",
    });
    res.status(200).json(userInfo);
  } catch (error) {
    console.log("login error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "logout successfully" });
  // res.status(200).json({ message: "logout successfully" });
};
