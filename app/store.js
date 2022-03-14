import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "@features/accountSlice";
import tabSlice from "@features/tabSlice";
import web3Slice from "@features/web3Slice";
import contractReducer from "@features/contractSlice";

export default configureStore({
  reducer: {
    account: accountSlice,
    tab: tabSlice,
    web3: web3Slice,
    contract: contractReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
