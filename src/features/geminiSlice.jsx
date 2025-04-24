import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_SERVER_API_URL;

// Gemini GET API
export const geminiApi = createAsyncThunk(
  "gemini/response",
  async (params, { rejectWithValue, getState }) => {
    const userId = getState().user.user;
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/intel/prompt?${params}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({
          message: errorData.message || "Failed to get gemini response",
        });
      }

      const data = await response.json();
      console.log("gemini res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// Intelligence GET API
export const intelligenceApi = createAsyncThunk(
  "intelligence/response",
  async (params, { rejectWithValue, getState }) => {
    const userId = getState().user.user;
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/intel/position?${params}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({
          message: errorData.message || "Failed to get intelligence response",
        });
      }

      const data = await response.json();
      console.log("intel res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

const geminiSlice = createSlice({
  name: "gemini",
  initialState: {
    geminiResponse: "",
    intelligenceResponse: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(geminiApi.fulfilled, (state, action) => {
        state.geminiResponse = action.payload;
      })
      .addCase(intelligenceApi.fulfilled, (state, action) => {
        state.intelligenceResponse = action.payload;
      });
  },
});

export default geminiSlice.reducer;
