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
    <div className="grid bg-[#1E3050]">
      <section className="h-full p-5 grid items-center">
        <div className="text-center text-white">
          <p className="font-bold text-4xl">
            ${formatearNumero(wallet?.value)}
          </p>
          <span className="font-semibold">Fondos disponibles</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4 px-1">
          <Link
            to="/dashboard/fondos"
            className="flex items-center justify-between bg-pink-600 text-white p-2 px-4 rounded-lg"
          >
            <p className=" font-bold leading-tight">Agregar fondos</p>
            <i class="fas fa-plus-circle text-3xl"></i>
          </Link>

          <div className="flex items-center justify-between bg-pink-600 text-white p-2 px-4 rounded-lg">
            <p className=" font-bold leading-tight">Historial de fondos</p>
            <i class="fas fa-list-alt text-3xl"></i>
          </div>
        </div>
      </section>

      <section className="grid items-center px-1">
        <div className="grid">
          <Link
            to="/dashboard/ordenes"
            className="flex items-center gap-5 justify-between bg-[#1E3050] text-[#1E3050] px-4 rounded-lg"
          >
            <div className="bg-green-500 p-3 w-14 h-14 flex justify-center items-center rounded-xl">
              <i class="fas fa-plus-circle text-3xl"></i>
            </div>
            <div className="bg-green-500 p-3 w-full h-14 flex items-center justify-between rounded-xl">
              <p className=" font-bold leading-tight text-lg">Nueva orden</p>
              <i class="fas fa-arrow-circle-right text-3xl"></i>
            </div>
          </Link>

          <div className="flex items-center gap-5 justify-between bg-[#1E3050] text-[#1E3050] mt-3 px-4 rounded-lg">
            <div className="bg-green-500 p-3 w-14 h-14 flex justify-center items-center rounded-xl">
              <i class="fas fa-list-alt text-3xl"></i>
            </div>

            <div className="bg-green-500 p-3 w-full h-14 flex items-center justify-between rounded-xl">
              <p className=" font-bold leading-tight text-lg">
                Todas las ordenes
              </p>
              <i class="fas fa-arrow-circle-right text-3xl"></i>
            </div>
          </div>
        </div>
      </section>

      <section className="grid items-center px-1 mt-3">
        <div className="grid">
          <Link
            to="/dashboard/ordenes"
            className="flex items-center gap-5 justify-between bg-[#1E3050] text-[#1E3050] px-4 rounded-lg"
          >
            <div className="bg-blue-400 p-3 w-14 h-14 flex justify-center items-center rounded-xl">
              <i class="fas fa-rocket text-3xl"></i>
            </div>
            <div className="bg-blue-400 p-3 w-full h-14 flex items-center justify-between rounded-xl">
              <p className=" font-bold leading-tight text-lg">
                Servicios y precios
              </p>
              <i class="fas fa-arrow-circle-right text-3xl"></i>
            </div>
          </Link>

          <div className="flex items-center gap-5 justify-between bg-[#1E3050] text-[#1E3050] mt-3 px-4 rounded-lg">
            <div className="bg-yellow-500 p-3 w-14 h-14 flex justify-center items-center rounded-xl">
              <i class="fas fa-shopping-cart text-3xl"></i>
            </div>

            <div className="bg-yellow-500 p-3 w-full h-14 flex items-center justify-between rounded-xl">
              <p className=" font-bold leading-tight text-lg">
                Carrito de compras
              </p>
              <i class="fas fa-arrow-circle-right text-3xl"></i>
            </div>
          </div>

          <div className="flex items-center gap-5 justify-between bg-[#1E3050] text-[#1E3050] mt-3 px-4 rounded-lg">
            <div className="bg-orange-500 p-3 w-14 h-14 flex justify-center items-center rounded-xl">
              <i class="fas fa-bullhorn text-3xl"></i>
            </div>

            <div className="bg-orange-500 p-3 w-full h-14 flex items-center justify-between rounded-xl">
              <p className=" font-bold leading-tight text-lg">Novedades</p>
              <i class="fas fa-arrow-circle-right text-3xl"></i>
            </div>
          </div>

          <div className="flex items-center gap-5 justify-between bg-[#1E3050] text-[#1E3050] mt-3 px-4 rounded-lg">
            <div className="bg-orange-500 p-3 w-14 h-14 flex justify-center items-center rounded-xl">
              <i class="fas fa-donate text-3xl"></i>
            </div>

            <div className="bg-orange-500 p-3 w-full h-14 flex items-center justify-between rounded-xl">
              <p className=" font-bold leading-tight text-lg">Ganar Dinero</p>
              <i class="fas fa-arrow-circle-right text-3xl"></i>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#1E3050] px-5 grid items-center">
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="flex items-center justify-between bg-white text-[#1E3050] p-2 px-4 rounded-lg">
            <p className=" font-bold leading-tight">Mi cuenta</p>
            <i class="fas fa-user-circle text-3xl"></i>
          </div>

          <div className="flex items-center justify-between bg-white text-[#1E3050] p-2 px-4 rounded-lg">
            <p className=" font-bold leading-tight">Soporte</p>
            <i class="fab fa-whatsapp text-3xl"></i>
          </div>

          {/* <div
            className="flex items-center justify-between bg-white text-[#1E3050] p-2 px-4 rounded-lg"
            onClick={cerrarSesionAuth}
          >
            <p className=" font-bold leading-tight">Logout</p>
            <i class="fas fa-sign-out-alt text-3xl"></i>
          </div> */}
        </div>
      </section>

      <section className="px-10 grid items-center mt-20 mb-10">
        <p className="text-center text-white text-xs">
          Colfone no esta afiliado ni respaldado por ninguna de las empresas,
          plataformas o sitios web para los que ofrece servicios.
        </p>
      </section>
    </div>
  );
};

export default Dashboard;
