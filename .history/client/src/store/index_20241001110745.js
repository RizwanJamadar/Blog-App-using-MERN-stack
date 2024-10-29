import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";

// Authentication Slice
const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: !!localStorage.getItem("currentUser") },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
      localStorage.setItem("currentUser", true);  // Save logged-in state
    },
    logout(state) {
      localStorage.removeItem("currentUser");
      state.isLoggedIn = false;
    },
  },
});

// Dark Mode Slice
const themeSlice = createSlice({
  name: "theme",
  initialState: {
    isDarkmode: localStorage.getItem("isDarkmode") === "true" || false,
  },
  reducers: {
    setDarkmode: (state, action) => {
      state.isDarkmode = action.payload;
      localStorage.setItem("isDarkmode", action.payload); // Save preference
    },
  },
});

// Export actions
export const authActions = authSlice.actions;
export const setDarkmode = themeSlice.actions.setDarkmode;

// Combine reducers
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  theme: themeSlice.reducer,
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
});
