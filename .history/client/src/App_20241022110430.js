import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from './componets/Header';
import React, { useEffect } from 'react';
import Login from './componets/Login';
import Blogs from './componets/Blogs';
import UserBlogs from './componets/UserBlogs'
import AddBlogs from './componets/AddBlogs'
import BlogDetail from './componets/BlogDetail'
import Signup from './componets/Signup';
import SingleBlog from './componets/SingleBlog'
import { useSelector } from 'react-redux';

function App() {
  const isDark = useSelector((state) => state.theme.isDarkmode);

  useEffect(() => {
    // Add or remove the dark mode class based on the Redux state
    if (isDark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDark]);

  return <React.Fragment>
    <header>
      <Header/>
    </header>
    <main>
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/blogs" element={<Blogs/>}></Route>
      <Route path="/blogs/:id" element={<SingleBlog/>}></Route>
      <Route path="/myBlogs" element={<UserBlogs/>}></Route>
      <Route path="/myBlogs/:id" element={<BlogDetail/>}></Route>
      <Route path="/blogs/add" element={<AddBlogs />} />
    </Routes>
    </main>

  </React.Fragment>;
}

export default App;
