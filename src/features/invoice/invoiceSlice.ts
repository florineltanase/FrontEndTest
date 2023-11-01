import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

type Invoice = {
  id: number;
  issued_at: string;
  notes: string;
  contact_name: string;
  amount: string;
  amount_formatted: string;
};

type InitialState = {
  loading: boolean;
  invoices: Invoice[];
  error: string;
};

const initialState: InitialState = {
  loading: false,
  invoices: [],
  error: "",
};

export const fetchInvoices = createAsyncThunk(
  "invoice/fetchInvoice",
  async ({ page, perPage }) => {
    const response = await axios.get(
      `/documents?search=type:invoice&page=${page}&limit=${perPage}`
    );
    return response.data.data;
  }
);

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchInvoices.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchInvoices.fulfilled,
      (state, action: PayloadAction<Invoice[]>) => {
        (state.loading = false),
          (state.invoices = action.payload),
          (state.error = "");
      }
    );
    builder.addCase(fetchInvoices.rejected, (state, action) => {
      (state.loading = false),
        (state.invoices = []),
        (state.error = action.error.message
          ? action.error.message
          : "An error occured");
    });
  },
  reducers: {},
});

export default invoiceSlice.reducer;
