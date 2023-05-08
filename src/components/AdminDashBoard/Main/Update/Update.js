import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function () {
  const token = useSelector((state) => state.user.token);
  const { pathname } = useLocation();
  const urlType = pathname.split("/")[2];

  let { id } = useParams();
  let [user, setUser] = useState({});
  // console.log(useParams());
  useEffect(() => {
    console.log(useParams);
    axios
      .get(`https://wecare-api-pzwn.onrender.com/api/v1/${urlType}/${id}`, {
        withCredentials: true,
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch(
        `https://wecare-api-pzwn.onrender.com/api/v1/${urlType}/${id}`,
        user,
        {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleUpdate} className="py-3 d-flex flex-column">
        <input
          type="text"
          className="my-2 form-control"
          value={user.firstName}
          onChange={(e) => setUser({ ...user, firstName: e.target.value })}
        />
        <input
          type="text"
          className="my-2 form-control"
          value={user.lastName}
          onChange={(e) => setUser({ ...user, lastName: e.target.value })}
        />
        <input
          type="text"
          className="my-2 form-control"
          value={user.phoneNum}
          onChange={(e) => setUser({ ...user, phoneNum: e.target.value })}
        />
        <input
          type="email"
          className="my-2 form-control"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input type="submit" className="btn btn-success my-2" value="Update" />
      </form>
    </div>
  );
}
