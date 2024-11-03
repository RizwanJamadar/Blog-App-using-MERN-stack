import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Grid,
  Tooltip,
} from "@mui/material";
import React from "react";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useStyles } from "./utils";
import config from "../config";

const Blogs = ({ title, desc, img, user, date, isUser, id }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };

  const deleteRequest = async () => {
    const res = await axios.delete(`${config.BASE_URL}/api/blogs/${id}`).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };

  const handleReadMore = () => {
    navigate(`/blogs/${id}`);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          width: "100%",
          height: "100%",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
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
            <Avatar className={classes.font} sx={{ bgcolor: "primary.main" }}>
              {user ? user.charAt(0) : ""}
            </Avatar>
          }
          title={title}
        />
        <CardMedia
          component="img"
          sx={{
            height: 200,
            width: "100%",
            objectFit: "cover",
            borderRadius: "4px",
          }}
          image={img || "https://via.placeholder.com/200"}
          alt={title}
        />
        <CardContent sx={{ padding: "16px" }}>
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
              maxHeight: "60px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
            }}
          >
            {desc}
          </Typography>

          <Typography
            variant="body2"
            color="primary"
            sx={{ cursor: "pointer", marginTop: 1 }}
            onClick={handleReadMore}
          >
            Read More
          </Typography>

          <Box display="flex" justifyContent="space-between" padding="0 16px 16px">
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
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Blogs;
