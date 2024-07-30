import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputForm from "../component/shared/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import Spinner from "../component/shared/Spinner";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  //redux state
  const { loading } = useSelector((state) => state.alerts);

  //hooks

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!name || !lastname || !email || !lastname) {
        return toast.error("Please Provide All Fields");
      }
      dispatch(showLoading());
      const { data } = await axios.post("/api/v1/auth/register", {
        name,
        lastname,
        email,
        password,
      });
      dispatch(hideLoading());
      if (data.success) {
        toast.success("Register Successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Invalid Form detail Please try again");
      console.log(error);
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
              htmlFor="name"
              labelText={"Name"}
              type={"text"}
              value={name}
              handleChange={(e) => setName(e.target.value)}
              name={"name"}
            />
            <InputForm
              htmlFor="lastname"
              labelText={"LastName"}
              type={"text"}
              value={lastname}
              handleChange={(e) => setlastName(e.target.value)}
              name={"lastname"}
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
                Already Register <Link to="/login">Login</Link>{" "}
              </p>
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;

//-------------------------------------------------------------------------------------------------------------------------------------------------
//     {/* <div className="mb-1">
//       <label htmlFor="name" className="form-label">
//         Name
//       </label>
//       <input type="text" className="form-control" name="name" />
//     </div> */}
//     {/* <div className="mb-1">
//       <label htmlFor="lastname" className="form-label">
//         LastName
//       </label>
//       <input
//         type="text"
//         className="form-control"
//         name="name"
//         value={values.lastname}
//         onChange={handleChange}
//       />
//     </div> */}
//     {/* <div className="mb-1">
//       <label htmlFor="email" className="form-label">
//         Email address
//       </label>
//       <input
//         type="email"
//         className="form-control"
//         name="email"
//         value={values.email}
//         onChange={handleChange}
//       />
//       <div id="emailHelp" className="form-text">
//         We'll never share your email with anyone else.
//       </div>
//     </div>
//     <div className="mb-1">
//     <label htmlFor="password" className="form-label">
//         Password
//       </label>
//       <input
//         type="password"
//         className="form-control"
//         name="password"
//         value={values.password}
//         onChange={handleChange}
//       />
//     </div> */}
//   //   const [values, setValues] = useState({
//   //     name: "",
//   //     lastname: "",
//   //     email: "",
//   //     password: "",
//   //   });
//   //   //handle input
//   //   const handleChange = (e) => {
//   //     const value = e.target.value;
//   //     setValues({
//   //       ...values,
//   //       [e.target.name]: value,
//   //     });
//   //   };
