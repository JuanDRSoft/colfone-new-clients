import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { storage } from "../../firebase";
import { toast } from "react-toastify";

const AddFounds = () => {
  const [data, setData] = useState([]);
  const [method, setMethod] = useState({});
  const [tab, setTab] = useState(0);
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [img, setImg] = useState(null);

  const { payments, wallet, handleWallet, auth } = useAuth();

  const currencies = [
    { label: "Colombia", value: "COP" },
    { label: "Venezuela", value: "VES" },
    { label: "Estados Unidos", value: "USD" },
    { label: "México", value: "MXN" },
  ];

  useEffect(() => {
    setLoading(true);
    if (payments.length && auth._id) {
      const filter = payments.filter((e) => e.countrie == auth.countries);
      setData(filter);
      setLoading(false);
    }
  }, [auth, payments]);

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

  return (
    <div className="bg-[#F24C3C] h-screen p-5 pb-20">
      <div className="bg-white text-center p-2 rounded-lg text-[#1E3050]">
        <h1 className="font-bold text-4xl">$ {wallet?.value}</h1>
        <span className="font-semibold">Fondos disponibles</span>
      </div>

      <div className="text-center p-2 rounded-lg bg-[#1E3050] mt-4">
        <h1 className="font-bold text-2xl text-white">Fondos a depositar</h1>
        <span className="font-semibold text-white">
          en la moneda: {getCurrency(auth.countries)}
        </span>
        <div className="px-10 mt-2 mb-2">
          <input
            type="number"
            className="w-full rounded-lg p-1 text-center font-bold"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <span className=" text-white">Valor minimo de deposito de $20.000</span>
      </div>

      <div className="text-center p-2 rounded-lg bg-[#1E3050] mt-4 relative">
        <h1 className="font-bold text-2xl text-white">Donde depositar</h1>

        {method.img && (
          <i
            class="fas fa-arrow-left absolute text-white top-4 left-3"
            onClick={() => {
              setMethod({});
              setTab(0);
            }}
          ></i>
        )}

        <span className="font-semibold text-white">
          {tab == 0 && "Seleccione un medio de pago"}
        </span>

        {tab == 0 && (
          <div className="grid gap-2 mt-3 px-2 pb-2">
            {data.map((e) => (
              <button
                className="bg-white h-20 rounded-lg flex justify-center items-center hover:bg-[#F29627] duration-500"
                onClick={() => {
                  setMethod(e);
                  setTab(1);
                }}
              >
                <img src={e.img} className="w-auto h-10" />
              </button>
            ))}
          </div>
        )}

        {tab == 1 && (
          <div className="bg-white mt-3 p-4 rounded-lg">
            <div className="flex justify-center mt-3">
              <img src={method.img} width="100px" />
            </div>

            <p className="mt-4 font-semibold">
              Realice el pago en la app de {method.entity} a esta cuenta:{" "}
            </p>
            <p className="mt-2">{method.data.split("Nombre")[0]}</p>

            <p className="mt-2">
              Nombre{method.data.split("Nombre")[1].split("Nota")[0]}
            </p>

            <p className="mt-2">
              {method.data.split("Nota")[1] &&
                `Nota ${method.data.split("Nota")[1]}`}
            </p>

            <p className="mt-2">Valor a pagar: {Number(value)}</p>

            <button
              className="bg-[#1E3050] text-white font-semibold uppercase p-2 mt-4 w-full rounded-lg"
              onClick={() => setTab(2)}
            >
              Ya pague
            </button>
          </div>
        )}

        {tab == 2 && (
          <div className="bg-white p-2 mt-3 rounded-lg flex flex-col items-center">
            <span className="font-semibold">
              Por favor sube tu comprobante de pago
            </span>

            <label
              htmlFor="fileInput"
              className="bg-[#1E3050] text-white font-bold py-2 px-4 rounded cursor-pointer mt-2"
            >
              Subir imagen <i class="fas fa-cloud-upload-alt"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {image && (
              <img
                src={img}
                alt="Preview"
                className="mt-4 max-w-[50%] rounded shadow-md"
              />
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
        )}
      </div>
    </div>
  );
};

export default AddFounds;
