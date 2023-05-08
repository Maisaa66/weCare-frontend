import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import myimg from "../../../../assets/images/user.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../../Redux Store/slices/usersSlice";

export default function Requests() {
  const token = useSelector((state) => state.user.token);

  const handleUpdateStatus = async (id, newStatus) => {
    console.log(id);
    await axios
      .patch(
        `https://wecare-api-pzwn.onrender.com/api/v1/providers/${id}`,
        { status: newStatus },
        {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(getAllUsers("providers"));
      })
      .catch((err) => console.log(err));
  };

  let dispatch = useDispatch();
  let { users } = useSelector((state) => state.usersReducer);
  useEffect(() => {
    dispatch(getAllUsers("providers")).then(() => {});
  }, []);

  return (
    <div className="row justify-content-center ">
      <h4 className="text-main">
        Pending requests
        <span className="badge rounded-pill ms-2  bg-main">
          {users.filter((prov) => prov.status === "pending").length}{" "}
        </span>
      </h4>
      {users.map((prov) => {
        if (prov.status == "pending") {
          return (
            <div className="card col-lg-3 m-2">
              <div className="d-flex align-items-center py-3">
                <img
                  src={`${prov.profileImg ? prov.profileImg : myimg}`}
                  className="card-img-top w-25 rounded-circle"
                  alt="..."
                />
                <div>
                  <h6 className="ps-3">
                    {prov.firstName} {prov.lastName}
                  </h6>
                  <p className="ps-3 fs-12 text-main">{prov.title}</p>
                </div>
              </div>
              <div >
                <Link
                  className="btn btn-warning m-1"
                  to={`/admin/providers/${prov._id}`}
                >
                  Show Details
                </Link>
                <Link
                  className="btn btn-warning m-1 "
                  to={`/admin/requests/${prov._id}`}
                >
                  Show DOCS
                </Link>
              </div>

              <div>
                <button
                  className="btn btn-success m-2 "
                  onClick={() => handleUpdateStatus(prov._id, "approved")}
                >
                  {" "}
                  Accept{" "}
                </button>
                <button
                  className="btn btn-primary  m-2"
                  onClick={() => handleUpdateStatus(prov._id, "suspended")}
                >
                  {" "}
                  Suspend{" "}
                </button>
                <button
                  className="btn btn-danger  m-2"
                  onClick={() => handleUpdateStatus(prov._id, "rejected")}
                >
                  {" "}
                  Decline{" "}
                </button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}
