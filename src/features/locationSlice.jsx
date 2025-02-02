import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_SERVER_API_URL;

export const postLocation = createAsyncThunk(
  `user-profiles/user-id/1/locations`,
  async (postLocationObj) => {
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/1/locations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postLocationObj),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("postLocation res:", data);

        return data;
      }
    } catch (error) {
      console.error(error);
      return error;
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState: {
    allLocation: [],
    aLocation: [],
    updateLocationById: [],
    waterLocationWithId: [],
    DeactivateLocationById: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postLocation.fulfilled, (state, action) => {
      console.log(action.payload);
      state.allLocation.push(action.payload)
    });
  },
});

export default locationSlice.reducer;
