import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import bg from "../../assets/bg.png";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      setIsLoading(true);
      let res = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      updateUser(res.data);

      navigate("/profile");
    } catch (error) {
      console.log(error);

      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleLogin}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit" disabled={isLoading}>
            Login
          </button>
          {error && <p className="text-red-600">{error}</p>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src={bg} alt="" />
      </div>
    </div>
  );
}

export default Login;
