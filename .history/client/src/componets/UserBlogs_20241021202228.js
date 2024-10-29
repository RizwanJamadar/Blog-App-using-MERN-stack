import React, { useEffect, useState } from "react";
import axios from "axios";
import Blogs from "./Blogs";
import DeleteButton from "./DeleteBlogs";
import { Card, CardContent, CardMedia, Typography, Grid, IconButton, Button, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import config from "../config";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    padding: "20px",
  },
  card: {
    maxWidth: 345,
    margin: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.05)", // Subtle scaling on hover
    },
  },
  media: {
    height: 200,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 16px 16px",
  },
}));

const UserBlogs = () => {
  const classes = useStyles();
  const [blogs, setBlogs] = useState([]); // State to hold blog data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser")); // Get user from session storage

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/blogs/user/${currentUser?._id}`);
        setBlogs(res.data.user.blogs || []);
      } catch (err) {
        console.error("Error fetching user blogs:", err);
        setError("Failed to load blogs.");
      } finally {
        setLoading(false);
      }
    };

   fetchBlogs();
  }, [currentUser]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>{error}</p>;

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
              <DeleteButton blogId={blog._id} onDelete={() => {}} />
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserBlogs;
