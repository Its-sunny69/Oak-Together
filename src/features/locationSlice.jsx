import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_SERVER_API_URL;
const userId = 202;

export const getAllLocations = createAsyncThunk(
  "location/getAllLocations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/locations`
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to get all location",
        });
      }

      const data = await response.json();
      console.log("getAllLocations res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getLocationById = createAsyncThunk(
  "location/getLocationById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/locations/location-id/${id}`
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to get location by id",
        });
      }

      const data = await response.json();
      console.log("getLocationById res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const getLocationsUsingFilter = createAsyncThunk(
  "location/getLocationsUsingFilter",
  async (params, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/locations/filter?${params}`
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to get location using filter",
        });
      }

      const data = await response.json();
      console.log("getLocationsUsingFilter res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const postLocation = createAsyncThunk(
  "location/postLocation",
  async (postLocationObj, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/locations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postLocationObj),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to post location",
        });
      }

      const data = await response.json();
      console.log("postLocation res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const updateLocationById = createAsyncThunk(
  "location/updateLocationById",
  async (updateLocationObj, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/locations/location-id/${updateLocationObj.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateLocationObj.updatedLocation),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to update location",
        });
      }

      const data = await response.json();
      console.log("updateLocationById res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const waterLocationWithId = createAsyncThunk(
  "location/waterLocationWithId",
  async (paramsObj, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/locations/location-id/${paramsObj.id}/watered?${paramsObj.params}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message:
            errorData.message || "Failed to update water status of location",
        });
      }

      const data = await response.json();
      console.log("waterLocationWithId res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const deactivateLocationWithId = createAsyncThunk(
  "location/deactivateLocationWithId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${apiUrl}/user-profiles/user-id/${userId}/locations/location-id/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Get error details
        return rejectWithValue({
          message: errorData.message || "Failed to delete location",
        });
      }

      const data = await response.json();
      console.log("deactivateLocationWithId res:", data);
      return data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

const locationSlice = createSlice({
  name: "location",
  initialState: {
    allLocations: [],
    locationById: null,
    locationsUsingFilter: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllLocations.fulfilled, (state, action) => {
        state.allLocations = action.payload;
      })
      .addCase(getLocationById.fulfilled, (state, action) => {
        state.locationById = action.payload;
      })
      .addCase(getLocationsUsingFilter.fulfilled, (state, action) => {
        state.locationsUsingFilter = action.payload;
      })
      .addCase(postLocation.fulfilled, (state, action) => {
        state.allLocations.push(action.payload);
      })
      .addCase(updateLocationById.fulfilled, (state, action) => {
        const index = state.allLocations.findIndex(
          (location) => location.id == action.payload.id
        );

        if (index !== -1) {
          state.allLocations[index] = {
            ...state.allLocations[index],
            name: action.payload.name,
            description: action.payload.description,
            type: action.payload.type,
            position: {
              ...state.allLocations[index].position,
              address: action.payload.position.address,
            },
            waterAvailability: action.payload.waterAvailability,
            space: action.payload.space,
          };
        }
      })
      .addCase(waterLocationWithId.fulfilled, (state, action) => {
        const index = state.allLocations.findIndex(
          (location) => location.id == action.payload.id
        );

        if (index !== -1) {
          state.allLocations[index] = {
            ...state.allLocations[index],
            lastWatered: action.payload.lastwatered,
            // points: action.payload.points  //comming soon..
          };
        }
      })
      .addCase(deactivateLocationWithId.fulfilled, (state, action) => {
        const locationId = action.payload.id;

        state.allLocations = state.allLocations.filter(
          (location) => location.id !== locationId
        );
      });
  },
});

export default locationSlice.reducer;
