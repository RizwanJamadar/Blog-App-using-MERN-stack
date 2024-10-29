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

  // Get the current user data from sessionStorage
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  console.log(currentUser);

  // Fetch blogs for the user by user ID
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/blogs/user/${currentUser._id}`);
        console.log("API Response:", res.data); // Log to verify structure
        const fetchedBlogs = res.data.user.blogs || [];
        console.log("Fetched Blogs:", fetchedBlogs); // Verify correct data
  
        setBlogs(fetchedBlogs); // Update state with blogs array
      } catch (err) {
        console.error("Error fetching user blogs:", err);
      }
    };
   fetchBlogs(); // Fetch only if user exists
  }, []);
  
  // Log blogs state after every update
  useEffect(() => {
    console.log("Blogs state updated:", blogs); // Ensure correct state update
  }, [blogs]);

  return (
    <div className={classes.container}>
      {
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
        ))}
    </div>
  );
};

export default UserBlogs;
