import React from "react";
import "../styles/Homepage.css";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <>
      <video autoPlay muted loop id="myVideo">
        <source src="/assests/videos/bg.mp4" type="video/mp4" />
      </video>
      <div className="content">
        <div className="card w-25">
          <img src="./assests/images/job-1.png.jpg" alt="logo" />
          <hr />

          <div className="card-body " style={{ marginTop: "-60px" }}>
            <h5 className="card-title">India No.1 Carrer Platform</h5>
            <p>
              "Connecting Talent with Opportunity: Your Gateway to the Perfect
              Job"
            </p>
            <div className="d-flex justify-content-between mt-5">
              <p>
                Not a User? Register <Link to="/register">Here!!</Link>{" "}
              </p>
              <p>
                <Link to="/login" className="myBtn">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
