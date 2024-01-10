import React from "react";

const Error = () => {
  return (
    <div
      className="w-screen h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/img/fondo-error.jpg')",
        backgroundSize: "cover",
      }}
    >
      <div className="flex md:w-[40%] border p-5 rounded-xl shadow bg-white">
        <p className="text-center font-semibold">
          Este sitio esta disponible solo para dispositivos móviles.
        </p>
      </div>
    </div>
  );
};

export default Error;
