import React, { useEffect, useState } from "react";
import { formatearNumero } from "../../utils/api";
import axios from "axios";

const ChanelInfo = (setYoutubeData) => {
  const [CanalData, setCanalData] = useState(null);
  const [CanalUrl, setCanalUrl] = useState("");

  useEffect(() => {
    function extractUsernameFromUrl(url) {
      const usernameRegex =
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/@([^\/?]+)/i;
      const usernameMatch = url.match(usernameRegex);
      return usernameMatch ? usernameMatch[1] : null;
    }

    function extractId(url) {
      const channelRegex =
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/channel\/([^\/\n\s]+)/i;
      const channelMatch = url.match(channelRegex);
      return channelMatch ? channelMatch[1] : null;
    }

    const username = extractUsernameFromUrl(CanalUrl);
    const id = extractId(CanalUrl);
    const apiKey = "AIzaSyC7XUuqDaZaEVzTQt1D3A9d0VBjdSVZSd4";

    if (username) {
      const fetchData = async () => {
        try {
          // Realiza la solicitud a la API de YouTube
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/search?part=id,snippet&maxResults=1&type=channel&q=@${username}&key=${apiKey}`
          );

          // Actualiza el estado con los datos del video
          const data = response?.data.items[0].snippet.channelId;
          // setCanalData(response?.data.items[0]);

          const response2 = await axios.get(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${data}&key=${apiKey}`
          );

          setCanalData(response2?.data.items[0]);
          setYoutubeData(response2?.data.items[0]);
          console.log(response2);
        } catch (error) {
          console.error("Error al obtener datos del video:", error);
        }
      };

      fetchData();
    } else if (id) {
      const fetchData = async () => {
        try {
          // Realiza la solicitud a la API de YouTube
          const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${id}&key=${apiKey}`
          );

          // Actualiza el estado con los datos del video
          console.log(response?.data.items[0]);
          setCanalData(response?.data.items[0]);
          setYoutubeData(response2?.data.items[0]);
        } catch (error) {
          console.error("Error al obtener datos del video:", error);
        }
      };

      fetchData();
    } else if (CanalUrl == "") {
      setCanalData(null);
    }
  }, [CanalUrl]);

  return (
    <div className="bg-[#1E3050] mt-5 rounded-lg p-2">
      <h1 className="text-white text-center font-semibold text-lg">
        Ingresa el link del canal
      </h1>

      <div className="px-5 mt-2">
        <input
          className="bg-white w-full rounded-full mb-3 p-1 pl-3"
          value={CanalUrl}
          onChange={(e) => setCanalUrl(e.target.value)}
          placeholder="https://youtube.com/channel/UCIwFjwMjI0y7PDBVEO9-bkQ"
        />

        <div className="flex justify-center">
          <img
            src={CanalData?.snippet.thumbnails.medium.url}
            width={CanalData?.snippet.thumbnails.medium.width}
            height={CanalData?.snippet.thumbnails.medium.height}
            className="w-32 h-32 rounded-full"
          />
        </div>

        <h1 className="text-white font-semibold text-sm text-center mt-1">
          {CanalData?.snippet.title}
        </h1>

        <div className="grid mt-5 gap-3 mb-5">
          <div className="bg-orange-400 rounded-xl p-1">
            <p className="text-white text-center font-semibold">
              Vistas:{" "}
              {CanalData
                ? formatearNumero(CanalData?.statistics.viewCount)
                : "N/D"}
            </p>
          </div>

          <div className="bg-orange-400 rounded-xl p-1">
            <p className="text-white text-center font-semibold">
              Suscriptores:{" "}
              {CanalData
                ? formatearNumero(CanalData?.statistics.subscriberCount)
                : "N/D"}
            </p>
          </div>

          <div className="bg-orange-400 rounded-xl p-1">
            <p className="text-white text-center font-semibold">
              Videos:{" "}
              {CanalData
                ? formatearNumero(CanalData?.statistics.videoCount)
                : "N/D"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChanelInfo;
