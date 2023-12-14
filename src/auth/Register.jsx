import React from "react";
import { Link } from "react-router-dom";
import Logo from "/logo.png";

const Register = () => {
  return (
    <div className="w-screen flex justify-center pt-5 pb-10 bg-[#1E3050]">
      <div className="w-[90%] p-5">
        <div className="flex justify-center">
          <img src={Logo} className="max-w-[55%] w-full" />
        </div>

        <Link to="/">
          <p className="font-semibold text-white flex justify-end items-center gap-2 mt-4 mb-4">
            Ya tengo una cuenta
            <i class="fas fa-arrow-circle-right text-2xl"></i>
          </p>
        </Link>

        <h1 className="text-white font-bold text-center text-2xl">Registro</h1>

        <p className="text-center text-white mt-2 font-semibold">
          Llena los campos con tus datos
        </p>

        <form className="mt-5">
          <input
            className="bg-white p-1 mb-4 w-full rounded pl-4"
            placeholder="Nombres"
            type="text"
          />
          <input
            className="bg-white p-1 mb-4 w-full rounded pl-4"
            placeholder="Apellidos"
            type="text"
          />
          <input
            className="bg-white p-1 mb-4 w-full rounded pl-4"
            placeholder="WhatsApp"
            type="text"
          />
          <input
            className="bg-white p-1 mb-4 w-full rounded pl-4"
            placeholder="País"
            type="text"
          />
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
          <input
            className="bg-white p-1 mb-4 w-full rounded pl-4"
            placeholder="Confirmar Contraseña"
            type="password"
          />
        </form>

        <div className="flex justify-center mt-4">
          <button className="bg-[#F24C3C] text-white font-semibold rounded w-[70%] flex justify-center items-center gap-2 p-1">
            Continuar
            <i class="fas fa-arrow-circle-right text-2xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
