import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { isExpired, decodeToken } from "react-jwt";
import { useDispatch } from "react-redux";

export const addUser = createAsyncThunk("user/addUser", async (userData) => {
  try {
    const response = await axios.post(
      "https://wecare-api-pzwn.onrender.com/api/v1/users/signup",
      userData
    );

    // console.log ("response data ", response);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
});

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (id, { getState }) => {
    // console.log("from async id1", id);
    const { user } = getState();
    console.log("user from getState()", user);
    let urlType = user.userType === "serviceProvider" ? "providers" : "users";
    try {
      // console.log("id", id);
      const response = await axios.get(
        `https://wecare-api-pzwn.onrender.com/api/v1/${urlType}/${id}`,
        {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    token: "",
    id: "",
    isAdmin: false,
    info: {},
    profileID: "",
    userType: "",
  },
  reducers: {
    setToken: (state) => {
      console.log(state);
      // get cookie from browser and get the token
      const token = document.cookie.split("=")[1];
      state.token = token;
      // decode JWT
      const decodedToken = decodeToken(token);
      state.id = decodedToken.id;
      state.isAdmin = decodedToken.isAdmin;
      state.userType = decodedToken.userType;
    },
    setInfo: (state, action) => {
      state.info = action.payload;
    },
    setProfileId: (state, action) => {
      state.profileID = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(addUser.fulfilled, (state, action) => {
      console.log("ACTION", action.payload);
      // state.token = action.payload.cookie;
      // Add user to the state array
      // const navigate = useNavigate();
      // navigate("/signup/stepthree");
      const expires = new Date(
        Date.now() + 2 * 24 * 60 * 60 * 1000
      ).toUTCString(); // 2 days from now
      document.cookie = `jwt=${action.payload.cookie}; expires=${expires};`;
      // state.user.push(action.payload.data);
      return action.payload.data;
      // console.log(action.payload);
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      // Add user to the state array
      // const navigate = useNavigate();
      // navigate("/signup/stepthree");
      console.log("action.payload.data", action.payload);
      state.info = action.payload.data;
      // state.user.push(action.payload.data);
      // return action.payload.data;
      // console.log(action.payload);
    });
  },
});

// Action creators are generated for each case reducer function

export const { setToken, setInfo, setProfileId } = userSlice.actions;
export default userSlice.reducer;
