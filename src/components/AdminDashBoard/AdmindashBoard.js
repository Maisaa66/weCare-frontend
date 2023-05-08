import React, { useEffect } from "react";
import classes from "./AdminDashBoard.module.css";
import Nav from "./Nav/Nav";
import * as ReactDOM from "react-dom";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect, useNavigate, Navigate } from "react-router-dom";
import { getAllUsers } from "../../Redux Store/slices/usersSlice";

function AdmindashBoard() {

  const isAuthenticated = useSelector((state) => state.user.isAdmin);
  return (
    <>
      {isAuthenticated ? (
        <div
          className={`${classes.box} d-flex px-5 overflow-hidden align-items-center`}
        >
          <div className={`shadow-lg bg-white rounded-5  ${classes.dashboard}`}>
            <Nav></Nav>
            <div className="row container-fluid py-4">
              <div className="col-12">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
}

export default AdmindashBoard;
