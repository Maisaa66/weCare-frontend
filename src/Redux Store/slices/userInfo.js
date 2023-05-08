import { createSlice } from "@reduxjs/toolkit";

export const userInfo = createSlice({
  name: "userInfo",
  initialState: {
    type: "",
    userDetails: {},
  },
  reducers: {
    //get user type
    setUserInfo: (state, action) => {
      state.type = action.payload;
      console.log(state.type, action.payload);
    },
    setUserDetails: (state, action) => {
      state.userDetails = { ...state.userDetails, ...action.payload };
      console.log("from redux: ", state.userDetails, action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserInfo, setUserDetails } = userInfo.actions;

export default userInfo.reducer;
