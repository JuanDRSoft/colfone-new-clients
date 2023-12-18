import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/logo.png";
import { toast } from "react-toastify";
import axios from "axios";
import { URL_BASE } from "../utils/api";

const Register = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [countries, setCountries] = useState([]);
  const [countrie, setCountrie] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    if (countrie) {
      const find = countries.find((e) => e.translations.spa.common == countrie);

      const prefix = find?.idd.root + find?.idd.suffixes[0];
      setPhone(prefix);
    }
  }, [countrie]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      const body = {
        name,
        email,
        lastname,
        phone,
        countries: countrie,
        password,
      };

      const data = await axios.post(`${URL_BASE}/api/clients`, body);
      toast.success("Registrado Correctamente");

      setLoading(false);
      navigate("/login");
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(error.response.data.msg);
        setLoading(false);
      } else {
        console.log(error);
        setLoading(false);
      }
    }
  };

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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="bg-white p-1 mb-4 w-full rounded pl-4"
            placeholder="Apellidos"
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />

          <select
            className="bg-white p-1 mb-4 w-full rounded pl-4"
            value={countrie}
            onChange={(e) => setCountrie(e.target.value)}
          >
            <option>Selecciona un país</option>
            {countries.map((option) => (
              <option>{option.translations.spa.common}</option>
            ))}
          </select>

          <input
            className="bg-white p-1 mb-4 w-full rounded pl-4"
            placeholder="WhatsApp"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            className="bg-white p-1 mb-4 w-full rounded pl-4"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-white p-1 mb-4 w-full rounded pl-4"
            placeholder="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="bg-white p-1 mb-4 w-full rounded pl-4"
            placeholder="Confirmar Contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </form>

        <div className="flex justify-center mt-4">
          <button
            onClick={onSubmit}
            className="bg-[#F24C3C] text-white font-semibold rounded w-[70%] flex justify-center items-center gap-2 p-1"
          >
            {loading ? (
              <i class="fas fa-spinner text-2xl animate-spin"></i>
            ) : (
              <>
                Continuar
                <i class="fas fa-arrow-circle-right text-2xl"></i>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
