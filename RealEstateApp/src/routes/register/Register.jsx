import "./register.scss";
import { Link } from "react-router-dom";
import bg from "../../assets/bg.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const username = formdata.get("username");
    const password = formdata.get("password");
    const email = formdata.get("email");

    if (!username || !password || !email) {
      setError("All fields are required");
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          {error && <p className="error">{error}</p>}
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="email" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button type="submit" disabled={isLoading}>
            Register
          </button>
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src={bg} alt="Background" />
      </div>
    </div>
  );
};

export default Register;
