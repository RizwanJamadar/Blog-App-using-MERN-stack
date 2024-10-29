import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.isDarkmode);
  const theme = isDark ? darkTheme : lightTheme;

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('currentUser'));
  const [value, setValue] = useState();

  useEffect(() => {
    // Update `isLoggedIn` whenever localStorage changes
    setIsLoggedIn(!!localStorage.getItem('currentUser'));
  }, [localStorage.getItem('currentUser')]);

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
