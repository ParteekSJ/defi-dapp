import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
  name: "tabs",
  initialState: {
    selectedTab: 0,
  },
  reducers: {
    SET_TAB: (state, action) => {
      state.selectedTab = action.payload;
    },
  },
});

export const { SET_TAB } = tabSlice.actions;

export default tabSlice.reducer;
