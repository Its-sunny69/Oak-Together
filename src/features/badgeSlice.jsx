import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_SERVER_API_URL; // Replace with actual
const userId = 202; // Replace or dynamically fetch

// Thunk: Get All Badges
export const getAllBadges = createAsyncThunk(
  "badge/getAllBadges",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/badges`
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({
          message: errorData.message || "Failed to fetch badges",
        });
      }

      const data = await response.json();
      console.log("getAllBadges res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);


// Thunk: Get All Badges By Filter (Separate slice)
export const getAllBadgesByFilter = createAsyncThunk(
  "badge/getAllBadgesByFilter",
  async (pageSize, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/badges/filter?pageSize=${pageSize}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({
          message: errorData.message || "Failed to fetch all filtered badges",
        });
      }

      const data = await response.json();
      console.log("getAllBadgesByFilter res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// Thunk: Get Badges By Filter + Pagination
export const getBadgesByFilter = createAsyncThunk(
  "badge/getBadgesByFilter",
  async (queryParams, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/badges/filter?${queryParams}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({
          message: errorData.message || "Failed to fetch filtered badges",
        });
      }

      const data = await response.json();
      console.log("getBadgesByFilter res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

// Thunk: Get Badge By ID
export const getBadgeById = createAsyncThunk(
  "badge/getBadgeById",
  async ({ userId, badgeId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/badges/badge-id/${badgeId}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue({
          message: errorData.message || "Failed to fetch badge by ID",
        });
      }

      const data = await response.json();
      console.log("getBadgeById res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);


// Badge Slice
const badgeSlice = createSlice({
  name: "badge",
  initialState: {
    allBadges: [],
    allBadgesByFilter: [],
    badgesByFilter: [],
    badgeById: null,
    totalPages: 0,
    totalItems: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBadges.fulfilled, (state, action) => {
        state.allBadges = action.payload.content || action.payload;
      })
      .addCase(getAllBadgesByFilter.fulfilled, (state, action) => {
        state.allBadgesByFilter = action.payload.content || action.payload;
      })      
      .addCase(getBadgesByFilter.fulfilled, (state, action) => {
        state.badgesByFilter = action.payload.content || action.payload;
        state.totalPages = action.payload.page?.totalPages || 0;
        state.totalItems = action.payload.page?.totalElements || 0;
      })
      .addCase(getBadgeById.fulfilled, (state, action) => {
        console.log(action.payload);
        state.badgeById = action.payload;
      });      
  },
});

export default badgeSlice.reducer;
