import React from "react";
import classes from "./ProviderCard.module.css";
import RequestForm from "../../../components/UI/RequestForm/RequestForm";
import { Link } from "react-bootstrap-icons";
import { Link as RouterLink } from "react-router-dom";
import { setProfileId } from "../../../Redux Store/slices/userSlice";
import { useDispatch } from "react-redux";
const ProviderCard = ({ fname, lname, title, image, experties, hourlyRate, rating, id, key }) => {
  const dispatch = useDispatch();;
  
  return (
    <div className="col-lg-3 p-0 mt-2" key={key}>
      <div className={`text-center ${classes.card_box}`}>
        <div className={`${classes.member_card} pt-2 pb-2`}>
          {/* <div className="d-flex justify-content-around align-items-center"> */}
          {/* <div className="d-flex flex-column"> */}
            <div className={`${classes.thumb_lg} mb-2 mx-auto`}>
            <RouterLink to="/providerProfile"  onClick={()=>{dispatch(setProfileId(id))}}>
            <img src={image} className="rounded-circle img-thumbnail" alt="profile-image" />
          </RouterLink>
            </div>
          <div>
            <RouterLink to="/providerProfile" onClick={()=>{dispatch(setProfileId(id))}} className="text-dark">{fname + " " + lname}</RouterLink>
            <p className={classes.text_muted}>
              {title} <span>| </span>
              <span className={classes.text_pink}>{rating}</span>
            </p>
          </div>
          {/* </div> */}

          {/* <button
            type="button"
            className={`btn btn-rounded waves-effect w-md waves-light ${classes.button_color}`}
          >
            Order Now
          </button> */}
          <RequestForm
            providerId={id}
            hourlyRate= {hourlyRate}
          ></RequestForm>
          {/* </div> */}

          <hr className="mb-0" />

          <div className="mt-4">
            <h6 className="text-truncate">Experties: {experties}</h6>

            <div className="row justify-content-center">
              <div className="col-4">
                <div className="mt-3">
                  <h4>${hourlyRate}</h4>
                  <p className="mb-0 text-muted">Hourly Rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
