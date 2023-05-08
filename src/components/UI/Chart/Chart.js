import React, { useState, useEffect } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { useSelector } from "react-redux";
import axios from "axios";
const Charts = function () {
  const token = useSelector((state) => state.user.token);
  const [chartData, setChartData] = useState(null);
  let providersNumData, usersNumData, serviceLocationsData, serviceTypeData;
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching");
      try {
        const response = await axios.get(
          "https://wecare-api-pzwn.onrender.com/api/v1/stats?start=2023-04-30&end=2023-05-07",
          {
            withCredentials: true,
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.data;
        const stats = data.stats;
        console.log(stats);
        setChartData(stats);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);
  //   const chartData = [
  //     { label: "Ahmed", count: 30 },
  //     { label: "Sara", count: 60 },
  //     { label: "Ayman", count: 10 },
  //   ];

  if (chartData !== null) {
    providersNumData = {
      labels: chartData.providersOverPassedWeek.map((item) => item.label),
      datasets: [
        {
          label: "Providers Over Passed Week",
          data: chartData.providersOverPassedWeek.map((item) => item.count),
          backgroundColor: [
            "#1BA494",
            "#106259",
            "#C7E6C9",
            "#53CCBE",
            "#16B3B3",
            "#048080",
            "#C0E8E8",
          ],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
    usersNumData = {
      labels: chartData.usersOverPassedWeek.map((item) => item.label),
      datasets: [
        {
          label: "Users Over Passed Week",
          data: chartData.usersOverPassedWeek.map((item) => item.count),
          backgroundColor: [
            "#1BA494",
            "#106259",
            "#C7E6C9",
            "#53CCBE",
            "#16B3B3",
            "#048080",
            "#C0E8E8",
          ],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
    
    serviceTypeData = {
      labels: chartData.serviceTypeStats.map((item) => item.label),
      datasets: [
        {
          label: "Service Types",
          data: chartData.serviceTypeStats.map((item) => item.count),
          backgroundColor: [
            "#1BA494",
            "#106259",
            "#C7E6C9",
            "#53CCBE",
            "#16B3B3",
            "#048080",
            "#C0E8E8",
            "#476980",
            "#BC5090",
            "#EB5F5E",
          ],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
    serviceLocationsData = {
      labels: chartData.serviceLocationsStats.map((item) => item.label),
      datasets: [
        {
          label: "Service Locations",
          data: chartData.serviceLocationsStats.map((item) => item.count),
          backgroundColor: ["#1BA494", "#106259", "#C7E6C9", "#53CCBE"],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  }
 
  if (chartData !== null) {
    return (
      <div className="container">
        <div className="row m-auto w-75">
          <div className="col-lg-6 col-12 p-2 "  >
            <div className="w-100 shadow rounded-5" >
              <Bar data={providersNumData}></Bar>
            </div>
          </div>
          <div className="col-lg-6 col-12 p-2 ">
            <div className="w-100 shadow rounded-5">
              <Bar data={usersNumData}></Bar>
            </div>
            
          </div>
          <div className="col-lg-6 col-12 p-2 ">
            <div className="w-100 shadow rounded-5" >
              <div className="w-50 m-auto ">
                <Pie data={serviceTypeData} ></Pie>
              </div>
              
            </div>
          </div>
          <div className="col-lg-6 col-12 p-2 ">
            <div className="w-100 shadow rounded-5">
              <div className="w-50 m-auto">
                <Pie data={serviceLocationsData} ></Pie>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className=" d-flex h-400 align-items-center justify-content-center">
        <i class="fa fa-spinner fa-5x fa-spin" aria-hidden="true"></i>
      </div>
    );
  }
};

export default Charts;
