// src/components/Signup.js
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
import config from "../config";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post(`${config.BASE_URL}/api/users/signup`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      const data = await res.data;
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await sendRequest();
    if (data && data.user) {
      localStorage.setItem("userId", data.user._id);
      dispatch(authActions.login());
      navigate("/blogs");
    }
  };

  return (
    <div className="Box">
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            Signup
          </Typography>
          <TextField
            name="name"
            onChange={handleChange}
            value={inputs.name}
            placeholder="Name"
            margin="normal"
          />
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type="email"
            placeholder="Email"
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type="password"
            placeholder="Password"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Signup
          </Button>
          <Typography padding={2}>
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login here
            </Link>
          </Typography>
        </Box>
      </form>
    </div>
  );
};

export default Signup;
