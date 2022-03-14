import { createSlice } from "@reduxjs/toolkit";

const contractSlice = createSlice({
  name: "contract",
  initialState: {
    tokenContract: null,
    dBankContract: null,
    loaded: false,
  },
  reducers: {
    SET_TOKEN_CONTRACT: (state, action) => {
      state.tokenContract = action.payload;
    },
    SET_BANK_CONTRACT: (state, action) => {
      state.dBankContract = action.payload;
    },
    SET_CONTRACTS_LOADED: (state, action) => {
      state.loaded = action.payload;
    },
  },
});

export const { SET_TOKEN_CONTRACT, SET_BANK_CONTRACT, SET_CONTRACTS_LOADED } =
  contractSlice.actions;

export default contractSlice.reducer;
