import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import config from "../config";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const AddBlogs = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Send POST request to add a new blog
  const sendRequest = async () => {
    try {
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
      const id = currentUser.user._id;
      const res = await axios.post(`${config.BASE_URL}/api/blogs/add`, {
        title: inputs.title,
        desc: inputs.description,
        img: inputs.imageURL,
        user: id,
      });
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: Check if inputs are not empty
    if (!inputs.title || !inputs.description || !inputs.imageURL) {
      alert("Please fill all the fields before submitting.");
      return;
    }

    setIsSubmitting(true); // Disable the button while submitting

    // Send request and handle response
    await sendRequest()
      .then((data) => {
        console.log(data);
        navigate("/blogs");
      })
      .finally(() => setIsSubmitting(false)); // Re-enable the button after request completes
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "60vw", marginTop: "15px" }}
      >
        <Box
          borderRadius={10}
          padding={3}
          margin={"auto"}
          display="flex"
          flexDirection={"column"}
        >
          <Typography
            className={classes.font}
            padding={3}
            color="grey"
            variant="h2"
            textAlign={"center"}
          >
            Post Your Blog
          </Typography>

          {/* Blog Title */}
          <InputLabel className={classes.font} sx={labelStyles}>
            Title
          </InputLabel>
          <TextField
            className={classes.font}
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="auto"
            variant="outlined"
            required
          />

          {/* Blog Description */}
          <InputLabel className={classes.font} sx={labelStyles}>
            Description
          </InputLabel>
          <TextareaAutosize
            className={classes.font}
            name="description"
            onChange={handleChange}
            minRows={5}
            value={inputs.description}
            placeholder="Write your blog description..."
            style={{
              fontFamily: "inherit",
              padding: "10px",
              borderRadius: "4px",
              borderColor: "#ccc",
              borderWidth: "1px",
              outline: "none",
              resize: "none",
              width: "100%",
              marginTop: "10px",
            }}
          />

          {/* Blog Image URL */}
          <InputLabel className={classes.font} sx={labelStyles}>
            ImageURL
          </InputLabel>
          <TextField
            className={classes.font}
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
            margin="auto"
            variant="outlined"
            required
          />

          {/* Submit Button */}
          <Button
            sx={{ mt: 2, borderRadius: 4 }}
            variant="contained"
            type="submit"
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlogs;
