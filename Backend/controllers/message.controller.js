import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
  const tokenUserId = req.userId;
  const text = req.body.text;
  const chatId = req.params.chatId;

  try {
    // Check if the chat exists
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    // If not, return an error message
    if (!chat) return res.status(404).json({ message: "Chat not Found!!!" });

    // Create a new message and update the chat's lastMessage and seenBy fields
    const NewMessgae = await prisma.message.create({
      data: {
        text,
        chatId,
        userId: tokenUserId,
      },
    });

    // Update the chat's lastMessage and seenBy fields
    await prisma.chat.update({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
      data: {
        seenBy: [tokenUserId],
        lastMessage: text,
      },
    });
    res.status(200).json(NewMessgae);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add message" });
  }
};
