import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { theme: "dark" }, // Corrected typo from 'intialState' to 'initialState'
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light"; // Toggle between 'light' and 'dark'
    },
  },
});

export const { toggleTheme } = themeSlice.actions; // Correct way to export the action
export default themeSlice.reducer; // Export the reducer from themeSlice
