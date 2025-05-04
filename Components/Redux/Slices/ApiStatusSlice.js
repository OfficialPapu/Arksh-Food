import { createSlice } from "@reduxjs/toolkit";

const ApiStatusSlice = createSlice({
  name: "ApiStatus",
  initialState: {},
  reducers: {
    SetApiFetched: (state, action) => {
      const key = action.payload;
      state[key] = true;
    },
    ResetApiFetched: (state, action) => {
      const key = action.payload;
      state[key] = false;
    },
    ResetAllApis: () => {
      return {};
    },
  },
});

export const { SetApiFetched, ResetApiFetched, ResetAllApis } =
  ApiStatusSlice.actions;

export default ApiStatusSlice.reducer;
