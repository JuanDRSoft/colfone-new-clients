import React, { Fragment, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { storage } from "../../firebase";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";

const AddFounds = () => {
  const [data, setData] = useState([]);
  const [method, setMethod] = useState({});
  const [tab, setTab] = useState(0);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [img, setImg] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { payments, wallet, handleWallet, auth } = useAuth();

  const currencies = [
    { label: "Colombia", value: "COP" },
    { label: "Venezuela", value: "VES" },
    { label: "Estados Unidos", value: "USD" },
    { label: "México", value: "MXN" },
  ];

  const getPayments = () => {
    const filter = payments?.filter((e) => e.countrie == auth?.countries);
    return filter?.map((e) => (
      <button
        className="bg-white h-20 rounded-lg flex justify-center items-center hover:bg-[#F29627] duration-500"
        onClick={() => {
          if (value < 20000) {
            toast.error("El valor debe ser mayor a 20.000");
            return;
          }
          setMethod(e);
          setTab(1);
        }}
      >
        <img src={e.img} className="w-auto h-10" />
      </button>
    ));
  };

  const initial = () => {
    setMethod({});
    setImage(null);
    setImg(null);
    setTab(0);
  };

  const handleSubmit = (img, initial) => {
    const newValue = Number(value) + Number(wallet?.value || 0);

    const data = {
      id: wallet ? wallet?._id : "",
      client: auth._id,
      currency: getCurrency(auth.countries) || "USD",
      historial: wallet
        ? [
            ...wallet?.historial,
            { value, date: new Date(), state: "UNPAID", img },
          ]
        : [{ value, date: new Date(), state: "UNPAID", img }],
    };
    handleWallet(data, () => {
      setValue(0);
      initial();
    });

    setValue("");
  };

  const handleUpload = (e) => {
    setLoading(true);
    const uploadTask = storage.ref(`payments/${e.name}`).put(e);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("payments")
          .child(e.name)
          .getDownloadURL()
          .then((url) => {
            if (value == 0) {
              toast.error("El valor es igual a 0");
              return;
            }
            setLoading(false);
            handleSubmit(url, initial);
          });
      }
    );
  };

  const getCurrency = (value) => {
    const find = currencies.find((e) => e.label == value);

    return find ? find.value : "";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatearNumero = (numero) => {
    return numero
      ?.toString()
      .replace(/\./g, ",")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="bg-[#F24C3C] h-screen p-5 pb-20">
      {tab == 0 && (
        <div className="bg-white text-center p-2 rounded-lg text-[#1E3050]">
          <h1 className="font-bold text-4xl">
            $ {formatearNumero(wallet?.value)}
          </h1>
          <span className="font-semibold">Fondos disponibles</span>
        </div>
      )}

      {tab == 0 && (
        <div className="text-center p-2 rounded-lg bg-[#1E3050] mt-4">
          <h1 className="font-bold text-2xl text-white">Fondos a depositar</h1>
          <span className="font-semibold text-white">
            en la moneda: {getCurrency(auth.countries)}
          </span>
          <div className="px-10 mt-2 mb-2 relative">
            <input
              type="number"
              className="w-full rounded-lg p-1 text-center font-bold text-lg"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <p className="absolute top-0 font-bold text-2xl left-14">$</p>
          </div>
          <span className=" text-white">
            Valor minimo de deposito de $20.000
          </span>
        </div>
      )}

      <div className="text-center p-2 rounded-lg bg-[#1E3050] mt-4 relative">
        <h1 className="font-bold text-2xl text-white">
          {tab == 0 && "Donde Depositar"}
          {tab == 1 && "Como Depositar"}
        </h1>

        {method.img && (
          <i
            class="fas fa-arrow-left absolute text-white top-4 left-3"
            onClick={() => {
              setImage(null);
              setImg(null);
              setMethod({});
              setTab(0);
            }}
          ></i>
        )}

        <span className="font-semibold text-white">
          {tab == 0 && "Seleccione un medio de pago"}
        </span>

        {tab == 0 && (
          <div className="grid gap-2 mt-3 px-2 pb-2">{getPayments()}</div>
        )}

        {tab == 1 && (
          <div className="bg-white mt-3 p-4 rounded-lg">
            <div className="flex justify-center mt-3">
              <img src={method.img} className="w-auto h-10" />
            </div>
          </div>
        )}
      </div>

      {tab == 1 && (
        <div className="bg-[#1E3050] p-4 rounded-lg text-center mt-2 text-white">
          <p className="font-semibold">
            1. Realice el pago en la app de {method.entity} a la siguiente
            información:{" "}
          </p>
          <p className="mt-4">
            <span className="font-semibold">Cuenta No:</span>
            <br />
            <span className="text-2xl font-bold">
              {method.data.split("Nombre")[0].split(":")[1]}
              <i class="fas fa-copy ml-1"></i>
            </span>
          </p>

          <p className="mt-3">
            <span className="font-semibold">Nombre:</span>
            <br />
            <span className="font-bold text-2xl">
              {method.data.split("Nombre:")[1].split("Nota")[0]}
            </span>
          </p>

          <p className="mt-2">
            {method.data.split("Nota")[1] &&
              `Nota ${method.data.split("Nota")[1]}`}
          </p>

          <p className="mt-2">
            <span className="font-semibold">Valor a pagar:</span>
            <br />
            <span className="font-bold text-2xl">
              $ {formatearNumero(Number(value))}
            </span>
          </p>
        </div>
      )}

      {tab == 1 && (
        <div className="bg-[#1E3050] text-white p-2 mt-3 rounded-lg flex flex-col items-center">
          <span className="font-semibold text-center">
            2. Adjuntar la captura de la transacción aqui
          </span>

          <label
            htmlFor="fileInput"
            className="bg-white text-[#1E3050] font-bold py-2 px-4 rounded cursor-pointer mt-2"
          >
            {image ? (
              image.name
            ) : (
              <>
                Subir imagen <i class="fas fa-cloud-upload-alt"></i>
              </>
            )}
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {image && (
            <div>
              <button
                className="bg-white p-2 mt-3 text-[#1E3050] font-bold px-4 rounded"
                onClick={() => setIsOpen(true)}
              >
                Ver Imagen <i class="fas fa-eye"></i>
              </button>

              <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-10"
                  onClose={() => setIsOpen(false)}
                >
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-black/25" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                      >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                          <div className="mt-2">
                            <img src={img} />

                            <button
                              onClick={() => setIsOpen(false)}
                              className="bg-red-500 mt-5 w-full p-1 rounded font-bold text-white"
                            >
                              Cerrar
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </div>
          )}
        </div>
      )}

      {image && (
        <button
          onClick={() => handleUpload(image)}
          className="bg-[#1E3050] text-white font-bold py-2 px-4 rounded cursor-pointer mt-2 w-full"
        >
          Enviar
        </button>
      )}
    </div>
  );
};

export default AddFounds;
