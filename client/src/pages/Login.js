import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../component/shared/InputForm.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import Spinner from "../component/shared/Spinner";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  //hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //redux state
  const { loading } = useSelector((state) => state.alerts);

  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(showLoading());
      const { data } = await axios.post("api/v1/auth/login", {
        email,
        password,
      });
      if (data.success) {
        dispatch(hideLoading());
        localStorage.setItem("token", data.token);
        toast.success("login success");
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid credential please login again");
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="form-container">
          <form className="card p-2" onSubmit={handleSubmit}>
            <img
              src="./assests/images/job-1.png.jpg"
              alt="logo"
              height={150}
              width={290}
            />

            <InputForm
              htmlFor="email"
              labelText={"Email"}
              type={"email"}
              value={email}
              handleChange={(e) => setemail(e.target.value)}
              name={"email"}
            />
            <InputForm
              htmlFor="password"
              labelText={"Password"}
              type={"password"}
              value={password}
              handleChange={(e) => setpassword(e.target.value)}
              name={"password"}
            />

            <div className="d-flex justify-content-between">
              <p>
                Not a User <Link to="/register">Register Here</Link>{" "}
              </p>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
