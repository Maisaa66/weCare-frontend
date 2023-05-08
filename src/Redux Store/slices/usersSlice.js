import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { useSelector } from "react-redux";

export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (urlType) => {
    // const token = useSelector((state) => state.user.token);
    const token = document.cookie.split("=")[1];
    let { data } = await axios.get(
      `https://wecare-api-pzwn.onrender.com/api/v1/${urlType}`,
      {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.data.users) {
      return data.data.users;
    }
    if (data.data.providers) {
      return data.data.providers;
    }
  }
);
export const getTopRating = createAsyncThunk(
  "users/getTopRating",
  async (urlType) => {
    // const token = useSelector((state) => state.user.token);
    const token = document.cookie.split("=")[1];

    let { data } = await axios.get(
      `https://wecare-api-pzwn.onrender.com/api/v1/${urlType}?rating[gte]=4.8`,
      {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.data.users) {
      return data.data.users;
    }
    if (data.data.providers) {
      return data.data.providers;
    }
  }
);
export const getWorstRating = createAsyncThunk(
  "users/getWorstRating",
  async (urlType) => {
    // const token = useSelector((state) => state.user.token);
    const token = document.cookie.split("=")[1];

    let { data } = await axios.get(
      `https://wecare-api-pzwn.onrender.com/api/v1/${urlType}?rating[lte]=2`,
      {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (data.data.users) {
      return data.data.users;
    }
    if (data.data.providers) {
      return data.data.providers;
    }
  }
);

let myinitialState = { users: [], topUsr: [], wrstUsr: [] };
let usersSlice = createSlice({
  name: "users",
  initialState: myinitialState,
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getTopRating.fulfilled, (state, action) => {
      state.topUsr = action.payload;
    });
    builder.addCase(getWorstRating.fulfilled, (state, action) => {
      state.wrstUsr = action.payload;
    });
  },
});

export let usersReducer = usersSlice.reducer;
