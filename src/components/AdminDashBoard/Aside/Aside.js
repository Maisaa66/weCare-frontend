import React from "react";
import "./Aside.css";
export default function Aside() {
  return (
    <>
    
      <ul className="nav nav-tabs ">
        <li className="nav-item  col-5">
          <a className="nav-link " href="#">
            Top 5
          </a>
        </li>
        <li className="nav-item col-6">
          <a className="nav-link " href="#">
            Worst 5
          </a>
        </li>
      </ul>
      <div className="m-3 col-12 d-flex p-2 align-items-center bg-white rounded-5 shadow-sm">
        <i className="px-3">img</i>
        <div className="text-start">
          <h6 className="fs-12">name</h6>
          <div className="ratingBox">
            <p>
              4.9 <i className=" ps-1 text-warning fa-solid fa-star"></i>
            </p>
          </div>
        </div>
      </div>
      <div className="m-3 col-12 d-flex p-2 align-items-center bg-white rounded-5 shadow-sm">
        <i className="px-3">img</i>
        <div className="text-start">
          <h6 className="fs-12">name</h6>
          <div className="ratingBox">
            <p>
              4.9 <i className=" ps-1 text-warning fa-solid fa-star"></i>
            </p>
          </div>
        </div>
      </div>
      <div className="m-3 col-12 d-flex p-2 align-items-center bg-white rounded-5 shadow-sm">
        <i className="px-3">img</i>
        <div className="text-start">
          <h6 className="fs-12">name</h6>
          <div className="ratingBox">
            <p>
              4.9 <i className=" ps-1 text-warning fa-solid fa-star"></i>
            </p>
          </div>
        </div>
      </div>
      <div className="m-3 col-12 d-flex p-2 align-items-center bg-white rounded-5 shadow-sm">
        <i className="px-3">img</i>
        <div className="text-start">
          <h6 className="fs-12">name</h6>
          <div className="ratingBox">
            <p>
              4.9 <i className=" ps-1 text-warning fa-solid fa-star"></i>
            </p>
          </div>
        </div>
      </div>
      <div className="m-3 col-12 d-flex p-2 align-items-center bg-white rounded-5 shadow-sm">
        <i className="px-3">img</i>
        <div className="text-start">
          <h6 className="fs-12">name</h6>
          <div className="ratingBox">
            <p>
              4.9 <i className=" ps-1 text-warning fa-solid fa-star"></i>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
