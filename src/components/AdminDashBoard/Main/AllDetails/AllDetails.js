import React, { useEffect, useState } from "react";
import axios from "axios";
import img from "../../../../assets/images/user.jpg";

import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Provider, useSelector } from "react-redux";

export default function () {
  const token = useSelector((state) => state.user.token);

  const { pathname } = useLocation();
  const urlType = pathname.split("/")[2];
  console.log(urlType);
  let { id } = useParams();
  let [user, setUser] = useState({});

  useEffect(() => {
    console.log(id);
    axios
      .get(`https://wecare-api-pzwn.onrender.com/api/v1/${urlType}/${id}`, {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="d-flex w-50 align-items-center m-auto p-2">
        <img
          src={`${user.profileImg ? user.profileImg : img}`}
          className="w-25 rounded-circle"
        />
        <div>
          <h3 className="text-main ps-3 ">
            {user.firstName} {user.lastName}
          </h3>
          <h6 className="d-block">{user.title ? user.title : null}</h6>
        </div>
      </div>
      <ul
        className={`list-group text-start w-75 m-auto shadow ${
          urlType !== "users" ? "overflow-y-scroll h-300" : null
        }`}
      >
        <li className="list-group-item">
          <span className="text-main pe-2">ID: </span>
          {id}
        </li>
        <li className="list-group-item">
          <span className="text-main pe-2">Phone number: </span>
          {user.phoneNum}
        </li>
        <li className="list-group-item">
          <span className="text-main pe-2">Email: </span>
          {user.email}
        </li>
        <li className="list-group-item">
          <span className="text-main pe-2">Gender: </span>
          {user.gender}
        </li>
        {urlType == 'providers' && user.status != 'pending'?
        <li className="list-group-item">
          <span className="text-main pe-2">Rating : </span>
          {user.rating}
        </li>:null
      }
        
        <li className="list-group-item">
          <span className="text-main pe-2">NationalID: </span>
          {user.nationalID}
        </li>
        <li className="list-group-item">
          <span className="text-main pe-2">Number of requests: </span>
          {user.requests?.length}
        </li>
        {urlType == "providers" ? (
          <>
            <li className="list-group-item">
              <span className="text-main pe-2">Service type</span>
              {user.serviceType}
            </li>
            <li className="list-group-item">
              <span className="text-main pe-2">Status: </span>
              {user.status}
            </li>
            <li className="list-group-item">
              <span className="text-main pe-2">Hourly rate: </span>
              {user.hourlyRate}
            </li>
            <li className="list-group-item">
              <span className="text-main pe-2">Night shift: </span>
              {user.nightShift ? "Yes" : "No"}
            </li>
            <li className="list-group-item">
              <span className="text-main pe-2">Total earnings: </span>
              {user.totalEarnings}
            </li>
            <li className="list-group-item">
              <span className="text-main pe-2">Experiance: </span>
              {user.experties}
            </li>
          </>
        ) : null}
      </ul>
    </>
  );
}
