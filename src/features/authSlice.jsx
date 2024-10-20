import { createAsyncThunk } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase()
    }
})

export default authSlice.reducer;