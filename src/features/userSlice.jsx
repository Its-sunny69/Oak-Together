import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const apiUrl = import.meta.env.VITE_SERVER_API_URL + "/user-profiles";

// GET all users with filters
export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/userId/${userId}/filters`);

      if (!response.ok) throw new Error("Failed to fetch users");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// GET user by Filter
export const fetchUserByFilter = createAsyncThunk(
  "users/fetchUserByFilter",
  async (userParams, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${apiUrl}/userId/${userParams.userId}/filters?${userParams.filter}`
      );

      if (!response.ok) throw new Error("Failed to fetch user by filter");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// GET user by ID
export const fetchUserById = createAsyncThunk(
  "users/fetchById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/userId/${userId}`);

      if (!response.ok) throw new Error("Failed to fetch user");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// POST user login
export const loginUser = createAsyncThunk(
  "users/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) throw new Error("Login failed");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// POST new user registration
export const registerUser = createAsyncThunk(
  "users/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Registration failed");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// POST upload profile picture
export const uploadProfilePicture = createAsyncThunk(
  "users/uploadProfilePicture",
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${apiUrl}/userId/${userId}/profile-picture`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to upload profile picture");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// DELETE deactivate user
export const deactivateUser = createAsyncThunk(
  "users/deactivate",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/userId/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to deactivate user");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// PUT update user by ID
export const updateUserById = createAsyncThunk(
  "users/updateById",
  async ({ userId, updateData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiUrl}/userId/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) throw new Error("Failed to update user");

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    token: "",
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.users.push(action.payload);
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.user = { ...state.user, profilePicture: action.payload };
      })
      .addCase(deactivateUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default userSlice.reducer;
