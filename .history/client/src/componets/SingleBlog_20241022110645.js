import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography, Box, Container, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // Importing Back icon
import config from "../config";

const BlogDetail = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const navigate = useNavigate(); // For navigating back
  const [blog, setBlog] = useState(null); // State to hold the blog details

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/blogs/${id}`);
        setBlog(res.data.blog);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <Typography>Loading...</Typography>;

  const handleGoBack = () => {
    navigate(-1); // This will take the user to the previous page
  };

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        {/* Back Button */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack} // Go back on click
          sx={{ marginBottom: 2 }}
        >
          Previous
        </Button>

        {/* Blog Title */}
        <Typography variant="h4" component="h1" gutterBottom>
          {blog.title}
        </Typography>

        {/* Blog Date */}
        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{ fontStyle: "italic", fontSize: "14px" }}
        >
          Posted on: {new Date(blog.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Typography>

        {/* Blog Image */}
        <img
          src={blog.img}
          alt={blog.title}
          style={{
            width: "100%",
            height: "400px", // Ensuring consistent height
            objectFit: "cover", // Makes sure the image fits nicely
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        />

        {/* Blog Description */}
        <Typography
          variant="body1"
          gutterBottom
          sx={{ textAlign: "justify", lineHeight: 1.6 }}
        >
          {blog.desc}
        </Typography>
      </Box>
    </Container>
  );
};

export default BlogDetail;