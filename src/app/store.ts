import { configureStore } from "@reduxjs/toolkit";
import invoiceReducer from "../features/invoice/invoiceSlice";
import billReducer from "../features/bill/billSlice";

export const store = configureStore({
  reducer: {
    invoices: invoiceReducer,
    bills: billReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
