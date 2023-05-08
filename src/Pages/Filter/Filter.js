import React, { useEffect, useState } from "react";
import Select from "./Select/Select";
import axios from "axios";
import classes from "./Filter.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  resetQuries,
  setGenderQuery,
  setLocationQuery,
  setNightShiftQuery,
  setPriceQuery,
  setProviderData,
  setRateQuery,
} from "../../Redux Store/slices/providerSlice";

const Filter = () => {
  const dispatch = useDispatch();

  const providerType = useSelector((state) => state.provider.type);
  const rateQuery = useSelector((state) => state.provider.rateQuery);
  const priceQuery = useSelector((state) => state.provider.priceQuery);
  const ganderQuery = useSelector((state) => state.provider.genderQuery);
  const locationQuery = useSelector((state) => state.provider.locationQuery);
  const nightShiftQuery = useSelector(
    (state) => state.provider.nightShiftQuery
  );
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    dispatch(resetQuries());
  }, []);

  const rateHandler = (e) => {
    dispatch(setRateQuery(e.target.value[1]));
  };

  const priceHandler = (e) => {
    if (e.target.value === "High-to-Low") {
      dispatch(setPriceQuery("-hourlyRate"));
    } else if (e.target.value === "Low-to-High") {
      dispatch(setPriceQuery("hourlyRate"));
    }
  };

  const genderHandler = (e) => {
    dispatch(setGenderQuery(e.target.value.toLowerCase()));
  };

  const locationHandler = (e) => {
    dispatch(setLocationQuery(e.target.value));
  };

  // nightshift
  const nsHandler = (e) => {
    dispatch(setNightShiftQuery(e.target.checked));
  };

  const filterHandler = () => {
    axios
      .get(
        `https://wecare-api-pzwn.onrender.com/api/v1/providers?serviceType=${providerType.toLowerCase()}${
          rateQuery ? `&rating[gte]=${rateQuery}` : ""
        }${priceQuery ? `&sort=${priceQuery}` : ""}${
          ganderQuery ? `&gender=${ganderQuery}` : ""
        }${locationQuery ? `&address.governate=${locationQuery}` : ""}${
          nightShiftQuery ? `&nightShift=${nightShiftQuery}` : ""
        }`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const providers = res.data.data.providers;
        const data = providers.filter((provider) => {
          return provider.status === "approved";
        });
        dispatch(setProviderData(data));
      });
  };

  return (
    <>
      <div
        className={`mt-5 container  py-4 ${classes.filter} shadow text-light`}
      >
        <h1>Filter</h1>
        <div className="row d-flex flex-column flex-md-row">
          <Select
            size="col-6 col-md-3"
            defaultText="Rate"
            values={["+4", "+3", "+2", "+1"]}
            onChange={rateHandler}
          ></Select>
          <Select
            size="col-6 col-md-3"
            defaultText="Price"
            values={["High-to-Low", "Low-to-High"]}
            onChange={priceHandler}
          ></Select>
          <Select
            size="col-6 col-md-3"
            defaultText="Gender"
            values={["Male", "Female"]}
            onChange={genderHandler}
          ></Select>
          <Select
            size="col-6 col-md-3"
            defaultText="Location"
            values={["Cairo", "Alexandria"]}
            onChange={locationHandler}
          ></Select>
          <div className="d-flex justify-content-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                onChange={nsHandler}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Night Shift
              </label>
            </div>
          </div>
        </div>
        <button
          className={`btn mt-2 ${classes.button}`}
          onClick={filterHandler}
        >
          Apply
        </button>
      </div>
    </>
  );
};

export default Filter;
