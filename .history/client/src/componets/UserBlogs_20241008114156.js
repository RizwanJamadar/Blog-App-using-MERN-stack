/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Blogs from "./Blogs";
import DeleteButton from "./DeleteBlogs";
import { makeStyles } from "@mui/styles";
import config from "../config";
import useFetch from "../utils/useFetch";

const useStyles = makeStyles((theme) => ({
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
  const {user} = JSON.parse(sessionStorage.getItem("currentUser"));
  console.log(user);
  const id = user._id;

  const { data, loading, error } = useFetch(
    `config.BASE_URL}/api/blogs/user/${id}`,
  );

  // console.log(data);
  
  // const sendRequest = async () => {
  //   try {
  //     const res = await axios.get(`${config.BASE_URL}/api/blogs/user/${id}`);
  //     const data = res.data;
  //   } catch (err) {
  //     console.error("Error fetching user blogs:", err);
  //   }
  // };

  // const handleDelete = async (blogId) => {
  //   try {
  //     await axios.delete(`${config.BASE_URL}/api/blogs/${blogId}`);
  //     // Refresh the user data after deletion
  //     const updatedData = await sendRequest();
  //     // setUser(updatedData.user);
  //   } catch (err) {
  //     console.error("Error deleting blog:", err);
  //   }
  // };

  return (
    <div className={classes.container}>
      {user && user.blogs && user.blogs.length > 0 ? (
        user.blogs.map((blog) => (
          <div key={blog._id} className={classes.blogContainer}>
            <Blogs
              id={blog._id}
              isUser={true}
              title={blog.title}
              description={blog.desc}
              imageURL={blog.img}
              userName={user.name}
            />
            <img
              className={classes.blogImage}
              src={blog.img}
              alt={blog.title}
            />
            <DeleteButton blogId={blog._id} onDelete={() => {}} />
          </div>
        ))
      ) : (
        <p>No blogs found.</p>
      )}
    </div>
  );
};

export default UserBlogs;
