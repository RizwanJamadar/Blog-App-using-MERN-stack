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
  const [readMore, setReadMore] = useState(false);

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
    setReadMore(!readMore);
  };

  return (
    <div>
      <Card
        sx={{
          width: "100%",
          height: "400px", // Ensure consistent height
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.03)", // Slight scale on hover for interactivity
          },
        }}
      >
        {isUser && (
          <Box display="flex" justifyContent="flex-end">
            <IconButton onClick={handleEdit} sx={{ marginRight: 1 }}>
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
              sx={{ bgcolor: "primary.main" }}
              aria-label="recipe"
            >
              {user ? user.charAt(0) : ""}
            </Avatar>
          }
          title={title}
        />
        <CardMedia
          component="img"
          height="150"
          image={img}
          alt={title}
          sx={{ objectFit: "cover" }} // Ensure the image fills its container
        />
        <CardContent
          sx={{
            padding: "16px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="text.secondary">
              <b>{user}</b>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <b>{new Date(date).toDateString()}</b>
            </Typography>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              marginTop: 1,
              maxHeight: readMore ? "none" : "60px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: readMore ? "none" : 3, // Clamp text when not expanded
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
