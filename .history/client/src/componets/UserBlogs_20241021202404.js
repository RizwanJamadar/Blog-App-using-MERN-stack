import React, { useEffect, useState } from "react";
import axios from "axios";
import Blogs from "./Blogs";
import DeleteButton from "./DeleteBlogs";
import { Card, CardContent, CardMedia, Typography, Grid, IconButton, Button, Tooltip } from "@mui/material";
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
  const id = currentUser.user._id;
  console.log(id);

  // Fetch blogs for the user by user ID
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/blogs/user/${id}`);
        console.log(currentUser._id);
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
    <Grid container spacing={4} className={classes.gridContainer} justifyContent="center">
      {blogs.map((blog) => (
        <Grid item key={blog._id}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={blog.img || "https://via.placeholder.com/200"}
              title={blog.title}
            />
            <CardContent className={classes.content}>
              <Typography gutterBottom variant="h5" component="div">
                {blog.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {blog.desc.substring(0, 100)}... {/* Shortened description */}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                By: {currentUser?.name}
              </Typography>
            </CardContent>
            <div className={classes.actions}>
              <Tooltip title="Like">
                <IconButton>
                  <FavoriteIcon color="secondary" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Share">
                <IconButton>
                  <ShareIcon />
                </IconButton>
              </Tooltip>
              <DeleteButton blogId={blog._id} onDelete={() => { }} />
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserBlogs;
