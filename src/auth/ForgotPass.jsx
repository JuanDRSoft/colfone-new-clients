import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/logo.svg";
import axios from "axios";
import { URL_BASE } from "../utils/api";
import { toast } from "react-toastify";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [tab, setTab] = useState(1);
  const [user, setUser] = useState({});
  const [code, setCode] = useState("");
  const [newPass, setNewPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const send = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${URL_BASE}/api/clients/forgot-password`,
        { email }
      );
      setUser(data);

      if (user) {
        setTab(2);
        setLoading(false);
        toast.success("Revisa tu correo electronico:" + email);
      }
    } catch (error) {
      toast.error("El email no se encuentra registrado");
      setLoading(false);
      console.log(error);
    }
  };

  const verify = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (user.password == code) {
      setTab(3);
      setLoading(false);
    } else {
      setMsg("El codigo no coincide");
      setType("error");
      setOpenAlert(true);
      setLoading(false);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.put(`${URL_BASE}/api/clients/${user._id}`, {
        password: newPass,
      });

      toast.success("Contraseña actualizada");

      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center pt-16 bg-[#1E3050]">
      <div className="w-[90%] p-5">
        <div className="flex justify-center">
          <img src={Logo} className="max-w-[55%] w-full" />
        </div>

        <Link to="/register">
          <p className="font-semibold text-white flex justify-end items-center gap-2 mt-4 mb-2">
            Crear una cuenta
            <i class="fas fa-arrow-circle-right text-2xl"></i>
          </p>
        </Link>

        <Link to="/">
          <p className="font-semibold text-white flex justify-end items-center gap-2 mb-4">
            Iniciar sesión
            <i class="fas fa-arrow-circle-right text-2xl"></i>
          </p>
        </Link>

        <h1 className="text-white font-bold text-center text-2xl">
          Restaurar Contraseña
        </h1>

        <p className="text-center text-white mt-2 font-semibold">
          {tab == 1 && "Ingresa el correo electronico"}
          {tab == 2 && "Ingresa el codigo"}
          {tab == 3 && "Ingresa la nueva contraseña que deseas"}
        </p>

        {tab == 1 && (
          <form className="mt-5">
            <input
              className="bg-white p-1 mb-4 w-full rounded pl-4 text-lg"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex justify-center mt-4">
              <button
                onClick={send}
                className="bg-[#F24C3C] text-xl text-white font-semibold rounded w-[70%] flex justify-center items-center gap-2 p-1"
              >
                Enviar Código
                <i class="fas fa-arrow-circle-right text-2xl"></i>
              </button>
            </div>
          </form>
        )}

        {tab == 2 && (
          <form className="mt-5">
            <input
              className="bg-white p-1 mb-4 text-lg w-full rounded pl-4"
              placeholder="Codigo"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <div className="flex justify-center mt-4">
              <button
                onClick={verify}
                className="bg-[#F24C3C] text-xl text-white font-semibold rounded w-[70%] flex justify-center items-center gap-2 p-1"
              >
                Confirmar Codigo
                <i class="fas fa-arrow-circle-right text-2xl"></i>
              </button>
            </div>
          </form>
        )}

        {tab == 3 && (
          <form className="mt-5">
            <div className="relative">
              <input
                className="bg-white p-1 mb-4 w-full text-lg rounded pl-4"
                placeholder="Nueva Contraseña"
                type={showPassword ? "text" : "password"}
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />

              {showPassword ? (
                <i
                  class="fas fa-eye-slash absolute top-2 right-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              ) : (
                <i
                  class="fas fa-eye absolute top-2 right-2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              )}
            </div>

            <div className="flex justify-center mt-4">
              <button
                onClick={resetPassword}
                className="bg-[#F24C3C] text-xl text-white font-semibold rounded w-[70%] flex justify-center items-center gap-2 p-1"
              >
                Confirmar Codigo
                <i class="fas fa-arrow-circle-right text-2xl"></i>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPass;
