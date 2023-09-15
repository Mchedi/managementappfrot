import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import { Footer, Navbar, Navbar2 } from "../components";

const Sub = () => {


    return (
      <>
      <Navbar2 />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 mt-5">
              <h2 className="text-center mb-4">Create Subscription</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="DurationInMonths" className="form-label">
                    Duration in Months:
                  </label>
                  <input
                    type="number"
                    id="DurationInMonths"
                    name="DurationInMonths"
                    className="form-control"
                    // value={subscriptionData.DurationInMonths}
                    // onChange={handleChange}
                  />
                </div>
               
                <div className="text-center">
                  <button
                    className="btn btn-dark"
                    type="submit"
                  >
                    purchase Subscription
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
  
export default Sub;
