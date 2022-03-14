import { createSlice } from "@reduxjs/toolkit";

const web3Slice = createSlice({
  name: "tabs",
  initialState: {
    web3: null,
  },
  reducers: {
    SET_WEB3: (state, action) => {
      state.web3 = action.payload;
    },
  },
});

export const { SET_WEB3 } = web3Slice.actions;

export default web3Slice.reducer;
