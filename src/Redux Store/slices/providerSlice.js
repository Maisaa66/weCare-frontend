import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProvider = createAsyncThunk(
  "provider/addProvider",
  async (userData) => {
    try {
      const response = await axios.post(
        "https://wecare-api-pzwn.onrender.com/api/v1/providers/signup",
        userData
      );
      return response.data;
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const providerSlice = createSlice({
  name: "providerSlice",
  initialState: {
    type: "",
    rateQuery: "",
    priceQuery: "",
    genderQuery: "",
    locationQuery: "",
    nightShiftQuery: "",
    providersData: [],
  },
  reducers: {
    //set user type
    setProviderType: (state, action) => {
      state.type = action.payload;
    },
    setProviderData: (state, action) => {
      state.providersData = action.payload;
    },
    setRateQuery: (state, action) => {
      state.rateQuery = action.payload;
    },
    setPriceQuery: (state, action) => {
      state.priceQuery = action.payload;
    },
    setGenderQuery: (state, action) => {
      state.genderQuery = action.payload;
    },
    setLocationQuery: (state, action) => {
      state.locationQuery = action.payload;
    },
    setNightShiftQuery: (state, action) => {
      state.nightShiftQuery = action.payload;
    },
    resetQuries: (state) => {
      state.rateQuery = "";
      state.priceQuery = "";
      state.genderQuery = "";
      state.locationQuery = "";
      state.nightShiftQuery = "";
    },
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(addProvider.fulfilled, (state, action) => {
      // Add user to the state array
      // const navigate = useNavigate();
      // navigate("/signup/stepthree");
      // const expires = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toUTCString(); // 2 days from now
      // document.cookie = `jwt=${action.payload.cookie}; expires=${expires};`;
      // state.user.push(action.payload.data);
      return action.payload.data;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  setProviderType,
  setProviderData,
  setGenderQuery,
  setLocationQuery,
  setPriceQuery,
  setRateQuery,
  setNightShiftQuery,
  resetQuries,
} = providerSlice.actions;

export default providerSlice.reducer;
