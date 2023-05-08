import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setProviderType,
  setProviderData,
} from "../../Redux Store/slices/providerSlice";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Filter from "../Filter/Filter";
import ProviderCard from "./ProviderCard/ProviderCard";
import NavBar from "../../components/Layout/NavBar/NavBar";

import classes from "./Provider.module.css";

const Provider = () => {
  // Get the provider type from the URL
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const provider = query.get("provider");

  // const [provider, setProvider] = useState("");

  // state for checking if the data is loaded or not
  const [loading, setLoading] = useState(true);

  // Redux
  const dispatch = useDispatch();
  const data = useSelector((state) => state.provider.providersData);
  // console.log("data", data);

  useEffect(() => {
    axios
      .get(
        `https://wecare-api-pzwn.onrender.com/api/v1/providers?serviceType=${provider.toLowerCase()}`
      )
      .then((res) => {
        console.log(res.data.data.providers);
        const data = res.data.data.providers.filter((provider) => {
          return provider.status === "approved";
        });
        // set the provider type and data in the redux store to be used in the filter component
        dispatch(setProviderType(provider));
        dispatch(setProviderData(data));
        setLoading(false);
      });
  }, [provider]);

  // if provider data is not loaded yet, show a spinner
  if (loading)
    return (
      <div className="spinner-grow text-success mt-5" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );

  if (!data.length) {
    return (
      <>
        <NavBar bgColor="white" />
        <div className="position-relative">
          <h1 className={`text-center mt-3 ${classes.header}`}>{provider}</h1>
          <div className={`${classes["img-container"]}`}>
            <img
              src="./Images/providerSection.jpg"
              alt=""
              className={`${classes["img-object"]}`}
            />
          </div>
        </div>
        <Filter />
        <div className="container">
          <div className="row mt-5">
            <h1 className="text-center mt-5">No Providers Found</h1>
          </div>
        </div>
      </>
    );
  }

  if (data) {
    return (
      <>
        <NavBar bgColor="white" />
        <div className="position-relative">
          <h1 className={`text-center mt-3 ${classes.header}`}>{provider}</h1>
          <div className={`${classes["img-container"]}`}>
            <img
              src="./Images/providerSection.jpg"
              alt=""
              className={`${classes["img-object"]}`}
            />
          </div>
        </div>
        <Filter />
        <div className="container">
          <div className="row mt-5">
            {data.map((provider) => {
              return (
                <ProviderCard
                  key={provider._id}
                  fname={provider.firstName}
                  lname={provider.lastName}
                  title={provider.title}
                  image={provider.profileImg}
                  experties={provider.experties}
                  hourlyRate={provider.hourlyRate}
                  rating={provider.rating}
                  id={provider._id}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
};

export default Provider;
