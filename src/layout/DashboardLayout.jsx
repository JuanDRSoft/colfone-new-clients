import React, { useEffect } from "react";
import Logo from "/logo.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (auth) {
      if (!token) {
        navigate("/");
      }
    }
  }, [auth]);

  return (
    <div>
      <div className="fixed top-0 left-0 bg-[#1E3050] w-full p-2 flex items-center shadow-xl">
        <div className="w-full">
          <Link to="/dashboard">
            <i class="fas fa-home text-xl text-white"></i>
          </Link>
        </div>

        <div className="w-full flex justify-center">
          <img src={Logo} className="w-20" />
        </div>

        <div className="w-full text-end">
          <i class="fas fa-bell text-xl text-white"></i>
        </div>
      </div>

      <div className="pt-10 h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
