import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authActions, setDarkmode } from "../store";
import {
  AppBar,
  Typography,
  Toolbar,
  Box,
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { lightTheme, darkTheme } from "../utils/theme";

const Header = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDarkmode);
  const theme = isDark ? darkTheme : lightTheme;

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('currentUser'));
  const [value, setValue] = useState();

  useEffect(() => {
    // Listen for changes in localStorage and update the login status accordingly
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem('currentUser'));
    };

    window.addEventListener("storage", checkLoginStatus);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  return (
    <AppBar position="sticky" sx={{ background: `${theme.bg}` }}>
      <Toolbar>
        <Typography variant="h4">BlogsApp</Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft={"auto"} marginRight="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab
                LinkComponent={Link}
                to="/blogs"
                label="All Blogs"
              />
              <Tab
                LinkComponent={Link}
                to="/myBlogs"
                label="My Blogs"
              />
              <Tab
                LinkComponent={Link}
                to="/blogs/add"
                label="Add Blog"
              />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn ? (
            <>
              <Button
                LinkComponent={Link}
                to="login/"
                sx={{
                  margin: 1,
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: 10,
                }}
              >
                Login
              </Button>
              <Button
                LinkComponent={Link}
                to="signup/"
                sx={{
                  margin: 1,
                  fontWeight: "bold",
                  color: "white",
                  borderRadius: 10,
                }}
              >
                SignUp
              </Button>
            </>
          ) : (
            <Button
              onClick={() => {
                dispatch(authActions.logout());
                localStorage.removeItem("currentUser");
                setIsLoggedIn(false); // Update state on logout
              }}
              LinkComponent={Link}
              to="/login"
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="warning"
            >
              Logout
            </Button>
          )}
          <div
            onClick={(e) => {
              e.preventDefault();
              dispatch(setDarkmode(!isDark));
            }}
            style={{
              alignContent: "center",
              padding: "10px 0",
              cursor: "pointer",
            }}
          >
            {isDark ? <LightModeIcon /> : <DarkModeIcon />}
          </div>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;