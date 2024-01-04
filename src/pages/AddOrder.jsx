import React, { useEffect, useState } from "react";
import { plataforms, servicesEx } from "../utils/data";
import useAuth from "../hooks/useAuth";
import { formatearNumero } from "../utils/api";
import { Link } from "react-router-dom";
import axios from "axios";
import ChanelInfo from "../Components/Orders/ChanelInfo";

const AddOrder = () => {
  const [plataformSelect, setPlataform] = useState("");
  const [serviceSelect, setService] = useState("");
  const [productSelect, setProduct] = useState("");
  const [tab, setTab] = useState(0);

  const [dataServices, setDataServices] = useState([]);
  const [dataProducts, setDataProducts] = useState([]);

  const [videoData, setVideoData] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");

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

  useEffect(() => {
    const getVideoIdFromUrl = (url) => {
      const regex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
      const match = url.match(regex);
      return match ? match[1] : null;
    };

    // Reemplaza 'TU_CLAVE_DE_API' con tu clave de API
    const apiKey = "AIzaSyC7XUuqDaZaEVzTQt1D3A9d0VBjdSVZSd4";

    // Reemplaza 'URL_DEL_VIDEO' con la URL real del video que deseas obtener

    const videoId = getVideoIdFromUrl(videoUrl);

    if (videoId) {
      const fetchData = async () => {
        try {
          // Realiza la solicitud a la API de YouTube
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`
          );

          // Actualiza el estado con los datos del video
          setVideoData(response.data.items[0]);
        } catch (error) {
          console.error("Error al obtener datos del video:", error);
        }
      };

      fetchData();
    }
  }, [videoUrl]);

  return (
    <div
      className={`bg-[#26A699] p-5 ${
        (dataProducts.length < 8 && tab == 1 && "h-screen") ||
        (dataServices.length < 1 && "h-screen")
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

          {dataServices.length > 0 && (
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
          )}
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

      {tab == 2 && serviceSelect.includes("Vistas") && (
        <>
          <div className="bg-[#1E3050] mt-5 rounded-lg p-2">
            <h1 className="text-white text-center font-semibold text-lg">
              Ingresa el link del video
            </h1>

            <div className="px-5 mt-2">
              <input
                className="bg-white w-full rounded-full mb-3 p-1 pl-3"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />

              <div className="rounded-xl overflow-hidden">
                <img
                  src={videoData?.snippet.thumbnails.medium.url}
                  width={videoData?.snippet.thumbnails.medium.width}
                  height={videoData?.snippet.thumbnails.medium.height}
                />
              </div>

              <h1 className="text-white font-semibold text-sm text-center mt-1">
                {videoData?.snippet.title}
              </h1>

              <div className="grid mt-5 gap-3 mb-5">
                <div className="bg-orange-400 rounded-xl p-1">
                  <p className="text-white text-center font-semibold">
                    Vistas:{" "}
                    {videoData
                      ? formatearNumero(videoData?.statistics.viewCount)
                      : "N/D"}
                  </p>
                </div>

                <div className="bg-orange-400 rounded-xl p-1">
                  <p className="text-white text-center font-semibold">
                    Likes:{" "}
                    {videoData
                      ? formatearNumero(videoData?.statistics.likeCount)
                      : "N/D"}
                  </p>
                </div>

                <div className="bg-orange-400 rounded-xl p-1">
                  <p className="text-white text-center font-semibold">
                    Comentarios:{" "}
                    {videoData
                      ? formatearNumero(videoData?.statistics.commentCount)
                      : "N/D"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {tab == 2 && serviceSelect.includes("Suscriptores") && <ChanelInfo />}

      {tab == 2 && (
        <>
          <div className="bg-[#1E3050] mt-5 rounded-lg p-2 px-5">
            <h1 className="text-white text-center font-semibold text-lg">
              Servicio a pagar
            </h1>
            <div className="bg-white p-2 rounded-lg py-5 mt-2 mb-4">
              <h1 className="text-[#1E3050] text-center font-semibold text-lg">
                {formatearNumero(productSelect.cantidad)} {serviceSelect}
              </h1>

              <p className="text-center font-bold text-[#1E3050] text-4xl">
                $ {formatearNumero(productSelect[wallet.currency].toFixed(0))}{" "}
                {wallet.currency}
              </p>
            </div>
          </div>

          <div className="grid mt-5 gap-3">
            <button className="text-white gap-2 flex justify-center items-center bg-[#1E3050] p-1 rounded-lg text-lg font-bold">
              Pagar Ahora
              <i class="fas fa-arrow-circle-right"></i>
            </button>

            <button className="text-[#1E3050] gap-2 flex justify-center items-center bg-white p-1 rounded-lg text-lg font-bold">
              Enviar al carrito
              <i class="fas fa-cart-plus"></i>
            </button>

            <button
              onClick={back}
              className="text-[#1E3050] gap-2 flex justify-center items-center bg-white p-1 rounded-lg text-lg font-bold"
            >
              <i class="fas fa-arrow-circle-left"></i>
              Atras
            </button>
          </div>
        </>
      )}

      {tab !== 2 && (
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
      )}
    </div>
  );
};

export default AddOrder;
