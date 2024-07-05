import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  uid: null,
  expiresIn: null,
  comapny_id: null,
  user_context: null,
  company_id: null,
  refresh_token: null,
  refresh_expires_in: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUid: (state, action) => {
      state.uid = action.payload;
    },
    setExpiresIn: (state, action) => {
      state.expiresIn = action.payload;
    },
    setUserContext: (state, action) => {
      state.user_context = action.payload;
    },
    setCompany: (state, action) => {
      state.company_id = action.payload;
    },
    setRefresToken: (state, action) => {
      state.refresh_token = action.payload;
    },
    setRefreshExpiresIn: (state, action) => {
      state.refresh_expires_in = action.payload;
    },
  },
});

export const {
  setUser,
  setToken,
  setUid,
  setExpiresIn,
  setCompany,
  setUserContext,
  token,
  user,
  setRefresToken,
  setRefreshExpiresIn,
} = userSlice.actions;
export default userSlice.reducer;
