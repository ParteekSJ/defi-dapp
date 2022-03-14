import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: null,
    ethBalance: 0,
    isConnected: false,
  },
  reducers: {
    SET_ACCOUNT: (state, action) => {
      state.account = action.payload;
    },
    SET_ETH_BALANCE: (state, action) => {
      state.ethBalance = action.payload;
    },
    SET_ACCOUNT_CONNECTED: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const { SET_ACCOUNT, SET_ETH_BALANCE, SET_ACCOUNT_CONNECTED } =
  accountSlice.actions;

export default accountSlice.reducer;
