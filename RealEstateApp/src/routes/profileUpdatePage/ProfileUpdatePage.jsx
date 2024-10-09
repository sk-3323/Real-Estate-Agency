import { useContext, useEffect, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/UploadWidget/UploadWidget";

function ProfileUpdatePage() {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState([]);
  const navigate = useNavigate();

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let { username, email, password } = Object.fromEntries(formData);
    axios
      .put(
        `http://localhost:3000/api/users/${currentUser.id}`,
        {
          username,
          email,
          password,
          avatar: avatar[0],
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        updateUser(res.data);
        toast.success("User updated successfully");
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleProfileUpdate}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={avatar[0] || currentUser.avatar || `/noavatar.jpg`}
          alt=""
          className="avatar"
        />
        <UploadWidget
          uwConfig={{
            cloudName: "dhwgztfgz",
            uploadPreset: "estate",
            multiple: false,
            maxImageFileSize: 2000000,
            folder: "avatars",
          }}
          setState={setAvatar}
        />
      </div>
      <ToastContainer />
    </div>
  );
}

export default ProfileUpdatePage;
