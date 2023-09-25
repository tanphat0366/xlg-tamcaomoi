import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  name: "",
  USDT: 0,
  created_at: "",
  public_address: "",
  status: "",
  is_staff: "",
  feature: [],
  api_key: "",
  is_logged_ms: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.USDT = action.payload.USDT;
      state.created_at = action.payload.created_at;
      state.public_address = action.payload.public_address;
      state.status = action.payload.status;
      state.is_staff = action.payload.is_staff;
      state.feature = action.payload.feature;
      state.api_key = action.payload.api_key;
      state.is_logged_ms = action.payload.is_logged_ms;
    },
  },
});

export const { setProfile } = authSlice.actions;

export default authSlice.reducer;
