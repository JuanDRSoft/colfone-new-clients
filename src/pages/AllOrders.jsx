import React from "react";
import useAuth from "../hooks/useAuth";

const AllOrders = () => {
  const { sales, plataforms, services } = useAuth();

  const colores = [
    "bg-red-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-orange-500",
  ];

  function obtenerColorAleatorio() {
    const indiceAleatorio = Math.floor(Math.random() * colores.length);
    return colores[indiceAleatorio];
  }

  const name = (red, service, product) => {
    if (red) {
      const plataform = plataforms.find((e) => e._id == red);
      return plataform?.name;
    } else if (service) {
      const serviceFilter = services.find((e) => e._id == service);
      return serviceFilter?.name;
    }
  };

  return (
    <div className="h-screen p-5 bg-[#1E3050]">
      <h1 className="text-white font-bold text-2xl text-center">Ordenes</h1>

      <div className="grid mt-5">
        {sales.map((e) => (
          <div className={`${obtenerColorAleatorio()} p-3 rounded-lg`}>
            <div className="flex justify-center gap-3">
              <div className="flex gap-2">
                Estado:
                <p className="font-bold">{e.state}</p>
              </div>
              <div className="flex gap-2">
                Orden No:
                <p className="font-bold">{e.orderId}</p>
              </div>
            </div>

            <div className="text-center mt-3">
              <p className="font-bold text-xl">{name(e.red)}</p>
              <p className="font-bold text-lg">
                {e.amount} {name("", e.service)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
