import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Signin.css";
import { toast } from "react-toastify";

function Signin() {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handletoken = (token, user) => {
    const { name, email } = user;
    localStorage.setItem("token", token);
    localStorage.setItem("username", name);
    localStorage.setItem("email", email);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        formdata,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.status === "success") {
        const { token, user } = response.data;
        handletoken(token, user);
        toast.success("successfully loggined");

        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signin">
      <div className="signin-container">
        <h2>Sign In</h2>
        <form onSubmit={handlesubmit}>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            className="input"
            type="email"
            onChange={handlechange}
            value={formdata.email}
            required
          />
          <TextField
            name="password"
            label="Password"
            variant="outlined"
            className="input"
            type="password"
            onChange={handlechange}
            value={formdata.password}
            required
          />
          <Button variant="contained" className="signin-button" type="submit">
            Sign In
          </Button>
          <p>Don't have an account?</p>
          <Link to={"/signup"}>
            <span>Signup</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signin;
