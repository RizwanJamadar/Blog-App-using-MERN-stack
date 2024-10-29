// UserBlogs.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import Blogs from "./Blogs";
import DeleteButton from "./DeleteBlogs";
import { makeStyles } from "@mui/styles";
import config from "../config";

// Styles for the component using MUI's makeStyles
const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px auto",
    width: "80%",
  },
  blogContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    position: "relative", // Correct positioning for delete button
  },
  blogImage: {
    width: "100%",
    height: "auto",
    borderRadius: "10px",
    marginBottom: "10px",
  },
}));

const UserBlogs = () => {
  const classes = useStyles();
  const [blogs, setBlogs] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true); // Manage loading state
  const [error, setError] = useState(null); // Manage error state

  // Get the current user data from sessionStorage
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  // Fetch blogs for the user by user ID
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (!currentUser) {
          setError("User not logged in.");
          setLoading(false);
          return;
        }

        const res = await axios.get(`${config.BASE_URL}/api/blogs/user/${currentUser._id}`);
        console.log(res.data); // Debug the response
        setBlogs(res.data.user.blogs || []); // Set blogs or fallback to empty array
      } catch (err) {
        console.error("Error fetching user blogs:", err);
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [currentUser]); // Rerun if currentUser changes

  // Handle loading, error, or no user cases
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!currentUser) return <p>User not logged in.</p>;

  return (
    <div className={classes.container}>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog._id} className={classes.blogContainer}>
            <Blogs
              id={blog._id}
              isUser={true}
              title={blog.title}
              desc={blog.desc}
              img={blog.img}
              user={currentUser.name}
            />
            <img className={classes.blogImage} src={blog.img} alt={blog.title} />
            <DeleteButton blogId={blog._id} onDelete={() => {}} />
          </div>
        ))
      ) : (
        <p>No blogs available.</p>
      )}
    </div>
  );
};

export default UserBlogs;
