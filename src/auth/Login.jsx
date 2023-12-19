import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/logo.svg";
import { toast } from "react-toastify";
import axios from "axios";
import { URL_BASE } from "../utils/api";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();

  const { setAuth } = useAuth();

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(`${URL_BASE}/api/clients/login`, {
        email,
        password,
      });

      setAuth(data);
      localStorage.setItem("token", data.token);
      setLoading(false);
      navigate("/dashboard");
      toast.success(`Bienvenido ${data.name}!!`);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Contraseña o email incorrectos");
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center pt-16 bg-[#1E3050]">
      <div className="w-[90%] p-5">
        <div className="flex justify-center">
          <img src={Logo} className="max-w-[55%] w-full" />
        </div>

        <h1 className="text-white font-bold text-center text-2xl mt-20">
          Iniciar Sesión
        </h1>

        <p className="text-center text-white mt-2 font-semibold">
          Ingresa la información correspondiente
        </p>

        <form className="mt-7 mb-7">
          <input
            className="bg-white p-1 mb-4 w-full rounded pl-4 text-lg"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              className="bg-white p-1 mb-4 w-full rounded pl-4 text-lg"
              placeholder="Contraseña"
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {showPass ? (
              <i
                class="fas fa-eye-slash absolute top-2 right-2 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              ></i>
            ) : (
              <i
                class="fas fa-eye absolute top-2 right-2 cursor-pointer"
                onClick={() => setShowPass(!showPass)}
              ></i>
            )}
          </div>
        </form>

        <div className="flex justify-center mt-4">
          <button
            onClick={onLogin}
            className="bg-[#F24C3C] text-xl text-white font-semibold rounded w-[70%] flex justify-center items-center gap-2 p-1"
          >
            {loading ? (
              <i class="fas fa-spinner text-2xl animate-spin"></i>
            ) : (
              <>
                Iniciar
                <i class="fas fa-arrow-circle-right text-2xl"></i>
              </>
            )}
          </button>
        </div>

        <Link to="/forgot-pass">
          <p className="font-semibold text-white flex justify-end items-center gap-2 mt-10">
            Olvide mi contraseña
            <i class="fas fa-arrow-circle-right text-2xl"></i>
          </p>
        </Link>

        <Link to="/register">
          <p className="font-semibold text-white flex justify-end items-center gap-2 mt-4 mb-4">
            Crear una cuenta
            <i class="fas fa-arrow-circle-right text-2xl"></i>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
