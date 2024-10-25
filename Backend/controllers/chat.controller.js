import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });
    for (const chat of chats) {
      const recieverID = chat.userIDs.find((id) => id !== tokenUserId);

      const reciever = await prisma.user.findUnique({
        where: {
          id: recieverID,
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });

      chat.reciever = reciever;
    }
    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Failed to Get Chats" });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      include: {
        Message: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Failed to Get Chat" });
  }
};

export const addChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.create({
      data: {
        userIDs: [tokenUserId, req.body.recieverID],
      },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Failed to Add Chat" });
  }
};

export const readChat = async (req, res) => {
  const tokenUserId = req.userId;
  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: {
          set: [tokenUserId],
        },
      },
    });
    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Failed to Read Chat" });
  }
};
