import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_SERVER_API_URL;
const userId = 202;

export const getAQIByCoordinates = createAsyncThunk(
  "airVisual/getAQIByCoordinates",
  async (coords, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/aqi/coordinates?${coords}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({
          message: errorData.message || "Failed to get AQI by coordinates",
        });
      }

      const data = await response.json();
      console.log("getAQIByCoordinates res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getAQIByAddress = createAsyncThunk(
  "airVisual/getAQIByAddress",
  async (addressParams, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/aqi/address?${addressParams}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({
          message: errorData.message || "Failed to get AQI by address",
        });
      }

      const data = await response.json();
      console.log("getAQIByAddress res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

const airVisualSlice = createSlice({
  name: "airVisual",
  initialState: {
    aqiByCoordinates: null,
    aqiByAddress: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAQIByCoordinates.fulfilled, (state, action) => {
        state.aqiByCoordinates = action.payload;
      })
      .addCase(getAQIByAddress.fulfilled, (state, action) => {
        state.aqiByAddress = action.payload;
      });
  },
});

export default airVisualSlice.reducer;
