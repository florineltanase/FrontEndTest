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
  totalCount: number;
};

type InvoiceFullfilledPayload = {
  data: Invoice[];
  totalRows: number;
};

const initialState: InitialState = {
  loading: false,
  invoices: [],
  error: "",
  totalCount: 0,
};

export const fetchInvoices = createAsyncThunk(
  "invoice/fetchInvoice",
  async ({ page, perPage }) => {
    const response = await axios.get(
      `/documents?search=type:invoice&page=${page}&limit=${perPage}`
    );
    const { data, meta } = response.data;
    const totalRows = meta.total;
    return { data, totalRows };
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
      (state, action: PayloadAction<InvoiceFullfilledPayload>) => {
        (state.loading = false),
          (state.invoices = action.payload.data),
          (state.totalCount = action.payload.totalRows),
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
