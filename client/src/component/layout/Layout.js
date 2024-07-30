import React from "react";
import "../../styles/Layout.css";
import { userMenu } from "./Menu/UserMenu";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
function Layout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarMenu = userMenu;

  //logout handler
  const handlelogout = () => {
    localStorage.clear();
    toast.success("LogOut Successfully");
    navigate("/login");
  };
  return (
    <>
      <div className="row">
        <div className="col-md-3 sidebar">
          <div className="logo">
            <h6>Job Portal</h6>
          </div>
          <hr />
          <p className="text-center">Welcome: username</p>
          <hr />

          <div className="menu">
            {sidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div className={`menu-item ${isActive && "active"}`}>
                  <i className={menu.icon}></i>
                  <Link to={menu.path}>{menu.name}</Link>
                </div>
              );
            })}
            <div className={`menu-item `} onClick={handlelogout}>
              <i className="fa fa-sign-out"></i>
              <Link to="/login">Logout</Link>
            </div>
          </div>
        </div>
        <div className="col-md-9">{children}</div>
      </div>
    </>
  );
}

export default Layout;
