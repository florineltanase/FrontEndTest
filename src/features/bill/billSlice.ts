import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

type Bills = {
  id: number;
  issued_at: string;
  notes: string;
  contact_name: string;
  amount: string;
  amount_formatted: string;
};

type InitialState = {
  loading: boolean;
  bills: Bills[];
  error: string;
  totalCount: number;
};

type BillFullfilledPayload = {
  data: Bills[];
  totalRows: number;
};

const initialState: InitialState = {
  loading: false,
  bills: [],
  error: "",
  totalCount: 0,
};

export const fetchBills = createAsyncThunk(
  "invoice/fetchInvoice",
  async ({ page, perPage }) => {
    const response = await axios.get(
      `/documents?search=type:bill&page=${page}&limit=${perPage}`
    );
    const { data, meta } = response.data;
    const totalRows = meta.total;
    return { data, totalRows };
  }
);

export const billSlice = createSlice({
  name: "bill",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBills.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchBills.fulfilled,
      (state, action: PayloadAction<BillFullfilledPayload>) => {
        (state.loading = false),
          (state.bills = action.payload.data),
          (state.totalCount = action.payload.totalRows),
          (state.error = "");
      }
    );
    builder.addCase(fetchBills.rejected, (state, action) => {
      (state.loading = false),
        (state.bills = []),
        (state.error = action.error.message
          ? action.error.message
          : "An error occured");
    });
  },
  reducers: {},
});

export default billSlice.reducer;
