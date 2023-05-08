import React from "react";
import Users from "./Users/Users";
import SP from "./SP/SP";
import Update from "./Update/Update";
import AllDetails from "./AllDetails/AllDetails";
import * as ReactDOM from "react-dom";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Nav from "../Nav/Nav";

// let router=createBrowserRouter([
//  {path:'/admin',element}
// ])
export default function Main() {
  return (
    <div className="">
     {/* <Update></Update> */}
      {/* <Users></Users> */}
      {/* <SP></SP> */}
{/* <AllDetails></AllDetails> */}
{/* <AllRequests></AllRequests> */}
    </div>
  );
}
