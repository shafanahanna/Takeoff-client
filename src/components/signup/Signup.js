import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./signup.css";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Signup = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    univercity: "",
    subject: "",
  });
  const navigate = useNavigate();
  const handlechange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/user/register",
        formdata,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data, "drfyg");

      if (response.data.status === "success") {
        console.log("success");
        navigate("/signin");
        
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signup">
      <div className="signup-container">
        <h2>Sign Up</h2>
        <form onSubmit={handlesubmit}>
          <div className="smain">
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              className="input"
              onChange={handlechange}
              value={formdata.name}
              required
            />
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
            <FormControl>
              <InputLabel id="university-select">University</InputLabel>
              <Select
                labelId="university-select"
                id="university-select"
                name="univercity"
                value={formdata.univercity}
                onChange={handlechange}
                label="University"
                required
              >
                <MenuItem value="IGNOU University">IGNOU Univercity</MenuItem>
                <MenuItem value="Jain University">Jain Univercity</MenuItem>
                <MenuItem value="University of Calicut">
                  University of Calicut
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="subject"
              label="Subject"
              onChange={handlechange}
              variant="outlined"
              className="input"
              value={formdata.subject}
              required
            />
            <Button variant="contained" className="signup-button" type="submit">
              Signup
            </Button>
            <p>Already have an account?</p>
            <Link to={"/signin"} className="signin-link">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
