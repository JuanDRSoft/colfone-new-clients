import React from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { cerrarSesionAuth, wallet } = useAuth();

  const formatearNumero = (numero) => {
    return numero
      ?.toString()
      .replace(/\./g, ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="grid h-full">
      <section className="bg-[#F24C3C] h-full p-5 grid items-center">
        <div className="bg-white flex items-center justify-between p-2 px-5 rounded-lg text-[#1E3050]">
          <div>
            <p className="font-bold text-4xl">
              ${formatearNumero(wallet?.value)}
            </p>
            <span className="font-semibold">Fondos disponibles</span>
          </div>

          <i class="fas fa-wallet text-5xl"></i>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <Link
            to="/dashboard/fondos"
            className="flex items-center justify-between bg-[#1E3050] text-white p-2 px-4 rounded-lg"
          >
            <p className=" font-bold leading-tight">Agregar fondos</p>
            <i class="fas fa-plus-circle text-3xl"></i>
          </Link>

          <div className="flex items-center justify-between bg-[#1E3050] text-white p-2 px-4 rounded-lg">
            <p className=" font-bold leading-tight">Historial de fondos</p>
            <i class="fas fa-list-alt text-3xl"></i>
          </div>
        </div>
      </section>

      <section className="bg-[#26A699] h-full p-5 grid items-center">
        <div className="bg-white flex items-center justify-between p-2 px-5 rounded-lg text-[#1E3050]">
          <div>
            <p className="font-bold text-4xl">5</p>
            <span className="font-semibold">Ordenes activas</span>
          </div>

          <i class="fas fa-signal text-5xl"></i>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <Link
            to="/dashboard/ordenes"
            className="flex items-center gap-1 justify-between bg-[#1E3050] text-white p-2 px-4 rounded-lg"
          >
            <p className=" font-bold leading-tight">Nueva orden</p>
            <i class="fas fa-plus-circle text-3xl"></i>
          </Link>

          <div className="flex items-center justify-between bg-[#1E3050] text-white p-2 px-4 rounded-lg">
            <p className=" font-bold leading-tight">Todas las ordenes</p>
            <i class="fas fa-list-alt text-3xl"></i>
          </div>
        </div>
      </section>

      <section className="bg-[#F29627] h-full p-5 grid items-center">
        <div className="bg-white flex items-center justify-between p-2 px-5 rounded-lg text-[#1E3050]">
          <div>
            <p className="font-bold text-4xl">302</p>
            <span className="font-semibold">Servicios disponibles</span>
          </div>

          <i class="fas fa-rocket text-5xl"></i>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex items-center justify-between bg-[#1E3050] text-white p-2 px-4 rounded-lg">
            <p className=" font-bold leading-tight">Noticias</p>
            <i class="fas fa-newspaper text-3xl"></i>
          </div>

          <div className="flex items-center justify-between bg-[#1E3050] text-white p-2 px-4 rounded-lg">
            <p className=" font-bold leading-tight">Listas de precios</p>
            <i class="fas fa-list-alt text-3xl"></i>
          </div>
        </div>
      </section>

      <section className="bg-[#1E3050] h-full p-5 grid items-center">
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex items-center justify-between bg-white text-[#1E3050] p-2 px-4 rounded-lg">
            <p className=" font-bold leading-tight">Referidos</p>
            <i class="fas fa-donate text-3xl"></i>
          </div>

          <div className="flex items-center justify-between bg-white text-[#1E3050] p-2 px-4 rounded-lg">
            <p className=" font-bold leading-tight">Mi cuenta</p>
            <i class="fas fa-user-circle text-3xl"></i>
          </div>

          <div className="flex items-center justify-between bg-white text-[#1E3050] p-2 px-4 rounded-lg">
            <p className=" font-bold leading-tight">Soporte</p>
            <i class="fab fa-whatsapp text-3xl"></i>
          </div>

          <div
            className="flex items-center justify-between bg-white text-[#1E3050] p-2 px-4 rounded-lg"
            onClick={cerrarSesionAuth}
          >
            <p className=" font-bold leading-tight">Logout</p>
            <i class="fas fa-sign-out-alt text-3xl"></i>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
