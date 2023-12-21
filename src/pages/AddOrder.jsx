import React, { useEffect, useState } from "react";
import { plataforms, servicesEx } from "../utils/data";
import useAuth from "../hooks/useAuth";
import { formatearNumero } from "../utils/api";
import { Link } from "react-router-dom";

const AddOrder = () => {
  const [plataformSelect, setPlataform] = useState("");
  const [serviceSelect, setService] = useState("");
  const [productSelect, setProduct] = useState("");
  const [tab, setTab] = useState(0);

  const [dataServices, setDataServices] = useState(servicesEx);
  const [dataProducts, setDataProducts] = useState([]);

  const { services, products, wallet } = useAuth();

  const onSelectPlataform = (e) => {
    setPlataform(e);
    setService("");

    const filter = services.filter((service) => service.plataform == e);
    setDataServices(filter);
  };

  const onSelectService = (e) => {
    setService(e.name);

    const filter = products.filter((product) => product.service == e._id);
    setDataProducts(filter);
    setTab(1);
  };

  const onSelectProduct = (e) => {
    setProduct(e);
  };

  const back = () => {
    if (tab == 1) {
      setProduct("");
    }
    setTab(tab - 1);
  };

  return (
    <div
      className={`bg-[#26A699] p-5 ${
        dataProducts.length < 8 && tab == 1 && "h-screen"
      }`}
    >
      {tab == 0 && (
        <>
          <div className="bg-[#1E3050] p-2 rounded-lg py-4">
            <h1 className="text-white font-bold text-2xl text-center">
              Nueva Orden
            </h1>
          </div>

          <div className="bg-[#1E3050] mt-5 rounded-lg p-2">
            <h1 className="text-white text-center font-semibold text-lg">
              1. Seleccionar plataforma
            </h1>

            <div className="grid grid-cols-2 gap-5 p-4">
              {plataforms.map((e) => (
                <div
                  className={`${
                    plataformSelect == e.id ? "bg-[#F29627]" : "bg-white"
                  }  rounded-lg`}
                  onClick={() => onSelectPlataform(e.id)}
                >
                  <img src={e.img} className="w-full" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#1E3050] mt-5 rounded-lg p-2">
            <h1 className="text-white text-center font-semibold text-lg">
              2. Seleccionar servicio
            </h1>

            <div className="grid  gap-3 p-4">
              {dataServices.map((e) => (
                <div
                  onClick={() => onSelectService(e)}
                  className={`${
                    serviceSelect == e.name ? "bg-[#F29627]" : "bg-white"
                  }  p-2 rounded-lg`}
                >
                  <p className="text-center font-bold text-lg text-[#1E3050] hover:text-white">
                    {e.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab == 1 && (
        <>
          <div className="bg-[#1E3050] mt-5 rounded-lg p-2">
            <h1 className="text-white text-center font-semibold text-lg">
              2. Seleccionar servicio
            </h1>

            <div className="grid gap-3 p-4 max-h-[70vh] overflow-y-scroll">
              {dataProducts.map((e) => (
                <div
                  onClick={() => onSelectProduct(e)}
                  className={`${
                    productSelect._id == e._id ? "bg-[#F29627]" : "bg-white"
                  }  p-2 rounded-lg`}
                >
                  <p className="text-center font-bold text-lg text-[#1E3050] hover:text-white">
                    {formatearNumero(e.cantidad)} {serviceSelect}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {productSelect && (
            <div className="bg-[#1E3050] mt-5 rounded-lg p-2">
              <h1 className="text-white text-center font-semibold text-lg">
                {formatearNumero(productSelect.cantidad)} {serviceSelect}
              </h1>

              <p className="text-center font-bold text-white text-4xl">
                $ {formatearNumero(productSelect[wallet.currency].toFixed(0))}{" "}
                {wallet.currency}
              </p>
            </div>
          )}
        </>
      )}

      <div className="mt-10 grid grid-cols-2 gap-5">
        {tab == 0 && (
          <Link
            to="/dashboard"
            className="text-[#1E3050] gap-2 flex justify-center items-center bg-white p-1 rounded-lg text-lg font-bold"
          >
            Cerrar
            <i class="far fa-times-circle"></i>
          </Link>
        )}

        {tab >= 1 && (
          <button
            onClick={back}
            className="text-[#1E3050] gap-2 flex justify-center items-center bg-white p-1 rounded-lg text-lg font-bold"
          >
            <i class="fas fa-arrow-circle-left"></i>
            Atras
          </button>
        )}

        <button
          onClick={() => setTab(tab + 1)}
          className="bg-[#1E3050] rounded-lg flex justify-center items-center gap-2 text-white p-1 font-bold"
        >
          Siguiente
          <i class="fas fa-arrow-circle-right"></i>
        </button>
      </div>
    </div>
  );
};

export default AddOrder;
