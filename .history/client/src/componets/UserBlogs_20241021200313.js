import React, { useEffect, useState } from "react";
import axios from "axios";
import Blogs from "./Blogs";
import DeleteButton from "./DeleteBlogs";
import { makeStyles } from "@mui/styles";
import config from "../config";

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
    position: "relative", // To correctly position the delete button
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
  const [blogs, setBlogs] = useState([]); // State to hold blog data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Get the current user data from sessionStorage
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  // Fetch blogs for the user by user ID
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/blogs/user/${currentUser._id}`);
        console.log("API Response:", res.data); // Log to inspect the response structure
        setBlogs(res.data.user.blogs || []); // Set only the blogs array from the user data
      } catch (err) {
        console.error("Error fetching user blogs:", err);
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) fetchBlogs(); // Ensure `fetchBlogs` only runs if user exists
  }, [currentUser]); // Ensure `currentUser` is a dependency

  // Add another useEffect to log when `blogs` state changes
  useEffect(() => {
    console.log("Blogs state updated:", blogs);
  }, [blogs]);

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
