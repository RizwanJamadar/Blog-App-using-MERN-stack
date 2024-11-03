import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import config from "../config";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const navigate = useNavigate();
  
  const [blogs, setBlogs] = useState();
  const user = localStorage.getItem("currentUser");

  const sendRequest = async () => {
    const res = await axios
      .get(`${config.BASE_URL}/api/blogs`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    if(user){
      sendRequest().then((data) => setBlogs(data.blogs));
    } else {
      navigate("/login");
    }
  }, []);

  console.log(blogs);
  return (
    <div className="blogBox">
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            desc={blog.desc}
            img={blog.img}
            user={blog.user.name}
            date={blog.date}
          />
        ))}
    </div>
  );
};

export default Blogs;
