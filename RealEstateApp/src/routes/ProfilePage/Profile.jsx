import axios from "axios";
import Chat from "../../components/chat/Chat";
import List from "../../components/List/List";
import "./profile.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
function Profile() {
  const { currentUser, updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      updateUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to={`/profile/update`}>
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar ? currentUser.avatar : "noavatar.jpg"}
                alt="avatar"
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to={`/add-post`}>
              <button>Create New Post</button>
            </Link>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default Profile;
