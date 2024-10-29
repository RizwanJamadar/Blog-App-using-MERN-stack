import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./utils";
import config from "../config";

const Blogs = ({ title, desc, img, user, date, isUser, id }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [readMore, setReadMore] = useState(false); // State to toggle Read More

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`${config.BASE_URL}/api/blogs/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };

  const toggleReadMore = () => {
    setReadMore(!readMore); // Toggle Read More state
  };

  return (
    <div>
      <Card
        sx={{
          width: "80%",
          boxShadow: "2px 2px 5px #ccc",
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
              <ModeEditOutlineIcon color="warning" />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar
              className={classes.font}
              sx={{ bgcolor: "red" }}
              aria-label="recipe"
            >
              {user ? user.charAt(0) : ""}
            </Avatar>
          }
          title={title}
        />
        <CardMedia component="img" height="194" image={img} alt="Paella dish" />

        <CardContent>
          <hr />
          <Box display="flex" justifyContent="space-between">
            <Typography
              className={classes.font}
              variant="body2"
              color="text.secondary"
            >
              <b>{user}</b>
            </Typography>
            <Typography
              className={classes.font}
              variant="body2"
              color="text.secondary"
              sx={{ marginLeft: 2 }}
            >
              <b>{new Date(date).toDateString()}</b>
            </Typography>
          </Box>
          
          <Typography
            className={classes.font}
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: 1 }}
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: readMore ? "none" : 3, // Limit to 3 lines
              overflow: readMore ? "scroll" : "hidden", // Show all or hide overflow
            }}
          >
            {desc}
          </Typography>

          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: "pointer", marginTop: 1 }}
            onClick={toggleReadMore}
          >
            {readMore ? "Read Less" : "Read More"}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blogs;
