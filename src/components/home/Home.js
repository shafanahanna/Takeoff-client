import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import "./home.css";
import Navbar from "../Nav";

function Home() {
  const [userList, setUserList] = useState([]);
  const [universityFilter, setUniversityFilter] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/view", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserList(response.data.data);
      } catch (error) {
        console.log("Fetch Users Error:", error);
      }
    };
    fetchUsers();
  }, [token]);

  const handleUniversityChange = (e) => {
    setUniversityFilter(e.target.value);
  };

  const filteredUsers = universityFilter
    ? userList.filter((user) => user.univercity === universityFilter)
    : userList;

  return (
    <>
      <Navbar />

      <div className="home">
        <FormControl className="university-select">
          <InputLabel id="university-select-label">
            Filter by University
          </InputLabel>
          <Select
            labelId="university-select-label"
            id="university-select"
            onChange={handleUniversityChange}
            value={universityFilter}
            label="Filter by University"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="IGNOU University">IGNOU University</MenuItem>
            <MenuItem value="Jain University">Jain University</MenuItem>
            <MenuItem value="University of Calicut">
              University of Calicut
            </MenuItem>
          </Select>
        </FormControl>

        <div className="main_content">
          <h1 className="user_header">User List</h1>
          <table className="user_table">
            <thead>
              <tr>
                <th>Sl. No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id} className="user_row">
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Home;
