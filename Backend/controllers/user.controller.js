import e from "express";
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error for Get users" });
  }
};

export const getUser = async (req, res) => {
  let id = req.params.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error for Get User" });
  }
};

export const updateUser = async (req, res) => {
  let id = req.params.id;
  let { password, avatar, ...inputs } = req.body;
  let tokenId = req.userId;
  console.log(id);
  console.log(tokenId);

  if (id !== tokenId) {
    return res.status(403).json({ message: "Unauthorized User" });
  }

  let updatedPassword = null;

  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 10);
    }
    let updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });
    const { password: userPassword, ...rest } = updatedUser;

    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error for Update User" });
  }
};

export const deleteUser = async (req, res) => {
  let id = req.params.id;
  let tokenId = req.userId;
  console.log(id);
  console.log(tokenId);
  if (id !== tokenId) {
    return res.status(404).json({ message: "User doen not exist" });
  }
  try {
    let deletedUser = await prisma.user.delete({
      where: { id },
    });
    res
      .status(200)
      .json({ message: "Deleted Successfully", data: deletedUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error for Delete User" });
  }
};

export const savePost = async (req, res) => {
  const tokenId = req.userId;
  // console.log(req);

  const postId = req.body.postId;
  try {
    const savedPost = await prisma.savedPost.findUnique({
      where: {
        // userId_postId: {
        userId: tokenId,
        postId,
        // },
      },
    });
    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      res.status(200).json({ message: "Post is removed from saved list" });
    } else {
      const savepost = await prisma.savedPost.create({
        data: {
          userId: tokenId,
          postId,
        },
      });
      res.status(200).json({ message: "Post being Saved" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error for Saved Post" });
  }
};

export const fetchProfileList = async (req, res) => {
  let tokenUserid = req.userId;

  try {
    const profilePost = await prisma.post.findMany({
      where: {
        userId: tokenUserid,
      },
    });
    const saved = await prisma.savedPost.findMany({
      where: {
        userId: tokenUserid,
      },
      include: {
        post: true,
      },
    });

    const savedPost = saved.map((item) => item.post);
    res.status(200).json({ profilePost, savedPost });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error for Get Posts" });
  }
};
