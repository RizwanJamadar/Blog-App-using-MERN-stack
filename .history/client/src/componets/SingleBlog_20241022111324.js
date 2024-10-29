import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";

const BlogDetails = ({ title, desc, img, user, date }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  // Navigate to the previous page
  const handlePrevious = () => {
    navigate(-1); // This will navigate to the previous page
  };

  return (
    <div>
      <Card
        sx={{
          width: "100%",
          maxWidth: "800px",
          margin: "20px auto",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
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
          subheader={`Author: ${user}`}
        />

        <CardMedia
          component="img"
          image={img}
          alt={title}
          sx={{ height: "400px", objectFit: "cover" }} // Set image size and cover for uniformity
        />

        <CardContent>
          <Typography
            variant="body1"
            color="text.secondary"
            className={classes.font}
            sx={{ marginBottom: 2 }}
          >
            {desc}
          </Typography>

          <Box display="flex" justifyContent="space-between">
            {/* Blog Date on the right */}
            <Typography
              className={classes.font}
              variant="body2"
              color="text.secondary"
            >
              {new Date(date).toDateString()}
            </Typography>

            {/* Previous Button on the left */}
            <Button variant="contained" color="primary" onClick={handlePrevious}>
              Previous
            </Button>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogDetails;
