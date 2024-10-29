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
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./utils";
import config from "../config";

const Blogs = ({ title, desc, img, user, date, isUser, id }) => {
  const classes = useStyles();
  const navigate = useNavigate();

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

  return (
    <div>
      <Card
        sx={{
          width: "fit-content",
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
          <br />
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
          >
            {desc}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Blogs;
