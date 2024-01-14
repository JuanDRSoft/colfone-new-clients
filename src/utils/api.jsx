export const URL_BASE = "http://localhost:7777";
// export const URL_BASE = "https://colfone-backend-czyhs.ondigitalocean.app";

export const formatearNumero = (numero) => {
  return numero
    ?.toString()
    .replace(/\./g, ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
