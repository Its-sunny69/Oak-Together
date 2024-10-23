import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const geminiApi = createAsyncThunk("gemini/response", async (input) => {
  try {
    const response = await fetch("http://localhost:8080/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("gemini res:", data);

      return data;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
});

const geminiSlice = createSlice({
  name: "gemini",
  initialState: {
    output: "",
    loading: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(geminiApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(geminiApi.fulfilled, (state, action) => {
        state.loading = false;
        state.output = action.payload;
        state.error = null;
      })
      .addCase(geminiApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default geminiSlice.reducer;
