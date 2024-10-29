import { Button, InputLabel, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../config";

const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const BlogDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Destructure id from useParams directly
  const [blog, setBlog] = useState(null); // Initialize as null
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
  });

  // Handle change for inputs
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Fetch blog details by ID
  const fetchDetails = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs/${id}`);
      const data = res.data;
      return data;
    } catch (error) {
      console.error("Error fetching blog details:", error);
    }
  };

  // Fetch details when component mounts or when ID changes
  useEffect(() => {
    fetchDetails().then((data) => {
      if (data && data.blog) {
        setBlog(data.blog); // Set blog state
        setInputs({
          title: data.blog.title,
          description: data.blog.description,
        });
      }
    });
  }, [id]); // Dependency array on ID change

  // Send updated blog data
  const sendRequest = async () => {
    try {
      const res = await axios.put(`${config.BASE_URL}/api/blogs/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      });
      return res.data;
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
      .then((data) => {
        if (data) {
          console.log("Blog updated successfully:", data);
          navigate("/myBlogs/");
        }
      })
      .catch((err) => console.error("Error in submit:", err));
  };

  return (
    <div>
      {blog && ( // Only render form when blog is available
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="rgba(58,75,180,1)"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={"auto"}
            marginTop={3}
            display="flex"
            flexDirection={"column"}
            width={"80%"}
          >
            <Typography
              fontWeight={"bold"}
              padding={3}
              color="grey"
              variant="h2"
              textAlign={"center"}
            >
              Post Your Blog
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title || ""}
              margin="auto"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              value={inputs.description || ""}
              margin="auto"
              variant="outlined"
              multiline
              rows={4} // Support multiple lines for the description field
            />
            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetail;
