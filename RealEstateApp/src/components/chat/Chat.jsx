import { useContext, useEffect, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";
function Chat({ chatResponse }) {
  const [chat, setChat] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const allchat = chatResponse.data;

  const handleOpenChat = async (id, reciever) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/chats/${id}`, {
        withCredentials: true,
      });
      setChat({ ...res.data, reciever });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const text = formData.get("text");
    try {
      const res = await axios.post(
        `http://localhost:3000/api/messages/${chat.id}`,
        { text },
        { withCredentials: true }
      );
      setChat((prev) =>
        setChat({ ...prev, Message: [...prev.Message, res.data] })
      );
      e.target.reset();

      socket.emit("sendMessage", {
        recieverId: chat.reciever.id,
        data: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        await axios.put(`http://localhost:3000/api/chats/${chat.id}`);
      } catch (error) {
        console.log(error);
      }
    };

    if (socket && chat) {
      socket.on("getMessage", (data) => {
        if (data.chatId === chat.id) {
          setChat((prev) => ({ ...prev, Message: [...prev.Message, data] }));
          read();
        }
      });
    }

    return () => {
      socket.off("getMessage");
    };
  }, [socket, chat]);

  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {allchat?.map((ch) => (
          <div
            className="message"
            key={ch.id}
            style={{
              backgroundColor: ch.seenBy.includes(currentUser.id)
                ? "white"
                : "#FBDFA1",
            }}
            onClick={() => handleOpenChat(ch.id, ch.reciever)}
          >
            <img src={ch.reciever.avatar || "noavatar.jpg"} alt="" />
            <span>{ch.reciever.username}</span>
            <p>{ch.lastMessage || ""}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img src={chat.reciever.avatar || "noavatar.jpg"} alt="" />
              {chat.reciever.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.Message.map((msg) => (
              <div
                className="chatMessage"
                key={msg.id}
                style={{
                  alignSelf:
                    msg.userId === currentUser.id ? "flex-end" : "flex-start",
                  textAlign: msg.userId === currentUser.id ? "right" : "left",
                }}
              >
                <p>{msg.text}</p>
                <span>{format(msg.createdAt)}</span>
              </div>
            ))}
          </div>
          <form className="bottom" onSubmit={handleSubmit}>
            <textarea name="text"></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
