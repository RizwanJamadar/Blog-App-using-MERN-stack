import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Box, Container } from "@mui/material";
import config from "../config";

const SingleBlog = () => {
  const { id } = useParams(); // Get the blog ID from the URL
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

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {new Date(blog.date).toDateString()}
        </Typography>
        <img
          src={blog.img}
          alt={blog.title}
          style={{ width: "100%", height: "auto", borderRadius: "10px", marginBottom: "20px" }}
        />
        <Typography variant="body1" gutterBottom>
          {blog.desc}
        </Typography>
      </Box>
    </Container>
  );
};

export default SingleBlog;
