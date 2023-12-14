import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/logo.png";

const Login = () => {
  const navigate = useNavigate();

  const onLogin = () => {
    navigate("/dashboard");
  };

  return (
    <div className="w-screen h-screen flex justify-center pt-16 bg-[#1E3050]">
      <div className="w-[90%] p-5">
        <div className="flex justify-center">
          <img src={Logo} className="max-w-[55%] w-full" />
        </div>

        <Link to="/register">
          <p className="font-semibold text-white flex justify-end items-center gap-2 mt-4 mb-4">
            Crear una cuenta
            <i class="fas fa-arrow-circle-right text-2xl"></i>
          </p>
        </Link>

        <h1 className="text-white font-bold text-center text-2xl">
          Iniciar Sesión
        </h1>

        <p className="text-center text-white mt-2 font-semibold">
          Ingresa la información correspondiente
        </p>

        <form className="mt-5">
          <input
            className="bg-white p-1 mb-4 w-full rounded pl-4"
            placeholder="Email"
            type="email"
          />
          <input
            className="bg-white p-1 mb-4 w-full rounded pl-4"
            placeholder="Contraseña"
            type="password"
          />
        </form>

        <Link to="/forgot-pass">
          <p className="font-semibold text-white flex justify-end items-center gap-2 mt-4">
            Olvide mi contraseña
            <i class="fas fa-arrow-circle-right text-2xl"></i>
          </p>
        </Link>

        <div className="flex justify-center mt-4">
          <button
            onClick={onLogin}
            className="bg-[#F24C3C] text-white font-semibold rounded w-[70%] flex justify-center items-center gap-2 p-1"
          >
            Iniciar
            <i class="fas fa-arrow-circle-right text-2xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
