import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
export default function ReqDetails() {
  let [user, setUser] = useState({});
  let { id } = useParams();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    console.log(id);
    axios
      .get(`https://wecare-api-pzwn.onrender.com/api/v1/providers/${id}`, {
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

  {
    if (!user) {
      return (
        <>
          <i class="fa fa-spinner fa-5x fa-spin" aria-hidden="true"></i>
        </>
      );
    } else {
      return (
        <div className="h-500 overflow-y-scroll m-2">
          {user?.documents?.map((img) => (
            <img src={img} alt="" className="w-50" />
          ))}
        </div>
      );
    }
  }
  // {user ? return(
  //   <div className="h-500 overflow-y-scroll">
  //     {user?.documents?.map((img) => (
  //       <img src={img} alt="" className="w-50" />
  //     ))}
  //   </div>
  // ) : (
  //   <i class="fa fa-spinner fa-5x fa-spin" aria-hidden="true"></i>
  // )}
  // );
}
