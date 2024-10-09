import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
  const query = req.query;
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 10000000,
        },
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      //include key is used to get all other collections that we made foreign references in post collection
      include: {
        postDetail: true,
        user: {
          //select key is used to get only selected fields in specific collection
          select: {
            username: true,
            avatar: true,
            email: true,
          },
        },
      },
    });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res, next) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add post" });
  } finally {
    next();
  }
};

export const updatePost = (req, res, next) => {
  try {
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update post" });
  }
};

export const deletePost = async (req, res, next) => {
  const id = req.params.id;
  const tokenuserId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });
    if (tokenuserId !== post.userId) {
      return res.status(401).json({ message: "Not Authorized" });
    }
    await prisma.post.delete({
      where: { id },
    });
    res.status(200).json({ message: "Successfully Deleted Post" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete post" });
  }
};
