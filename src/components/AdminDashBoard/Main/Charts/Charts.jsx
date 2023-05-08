import axios from "axios";
import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";
import { Chart } from "chart.js";
import LineChart from "./LineChart";
import Doughnut from "./Doughnut";
import { useSelector } from "react-redux";


export default function Charts() {
  const token = useSelector((state) => state.user.token);

  let [MyStats, setMyStats] = useState(null);
  useEffect(() => {
    axios
      .get(
        "https://wecare-api-pzwn.onrender.com/api/v1/stats?start=2023-04-30&end=2023-05-07",
        {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setMyStats(res.data.stats);
      });

    // if(MyStats){
    //     setServiceLocations({
    //         labels: MyStats.serviceLocationsStats.map((data)=>data.label),
    //         datasets:[{
    //             label:"Service Locations",
    //             data: MyStats && MyStats.serviceLocationsStats.map((data)=>data.count),
    //             backgroundColor:['green','blue']
    //         }]

    //     })
    // }
  }, []);

  const serviceLocations = {
    labels: MyStats?.serviceLocationsStats?.map((l) => l.label),
    datasets: [
      {
        label: "Service Locations",
        data: MyStats?.serviceLocationsStats?.map((d) => d.count),
        backgroundColor: ["#5ca795", "rgb(14, 116, 82, 0.2)"],
      },
    ],
  };
  const serviceType = {
    labels: MyStats?.serviceTypeStats?.map((l) => l.label),
    datasets: [
      {
        label: "Service Types",
        data: MyStats?.serviceTypeStats?.map((d) => d.count),
        backgroundColor: ["#5ca795", "rgb(14, 116, 82, 0.2)", "orange"],
      },
    ],
  };
  const providersOverPassedWeek = {
    labels: MyStats?.providersOverPassedWeek?.map((l) => l.label),
    datasets: [
      {
        label: "Providers over passed week",
        data: MyStats?.providersOverPassedWeek?.map((d) => d.count),
        backgroundColor: ["#5ca795", "rgb(14, 116, 82, 0.2)"],
      },
    ],
  };
  const usersOverPassedWeek = {
    labels: MyStats?.usersOverPassedWeek?.map((l) => l.label),
    datasets: [
      {
        label: "Users over passed week",
        data: MyStats?.usersOverPassedWeek?.map((d) => d.count),
        backgroundColor: ["#5ca795", "rgb(14, 116, 82, 0.2)"],
      },
    ],
  };

  return (
    <div className="row m-auto w-75">
      <div className="col-lg-6 col-12 p-2 ">
        <div className="w-100 shadow rounded-5">
          <LineChart chartData={providersOverPassedWeek}></LineChart>
        </div>
      </div>
      <div className="col-lg-6 col-12 p-2 ">
        <div className="w-100 shadow rounded-5">
        <LineChart chartData={usersOverPassedWeek}></LineChart>
        </div>
      </div>
      <div className="col-lg-6 col-12 p-2 ">
        <div className="w-100 shadow rounded-5">
        <BarChart chartData={serviceLocations} />
        </div>
      </div>
      <div className="col-lg-6 col-12 p-2 ">
        <div className="w-100 shadow rounded-5">
        <div className="w-75">
          <Doughnut chartData={serviceType} />
        </div>
        </div>
      </div>
    </div>
  );
}
