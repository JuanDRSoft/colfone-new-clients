import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { useEffect, useState } from "react";
import Error from "./pages/Error";
import ForgotPass from "./auth/ForgotPass";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthProvider";
import useAuth from "./hooks/useAuth";
import AddFounds from "./pages/AddFounds";

function App() {
  const [mobile, setMobile] = useState(false);

  function activarPantallaCompleta() {
    var elemento = document.documentElement; // Elemento raíz, por ejemplo, el elemento <html>

    if (elemento.requestFullscreen) {
      elemento.requestFullscreen();
    } else if (elemento.mozRequestFullScreen) {
      // Para Firefox
      elemento.mozRequestFullScreen();
    } else if (elemento.webkitRequestFullscreen) {
      // Para Chrome, Safari y Opera
      elemento.webkitRequestFullscreen();
    } else if (elemento.msRequestFullscreen) {
      // Para Internet Explorer y Edge
      elemento.msRequestFullscreen();
    }
  }

  function simularClic() {
    // Selecciona el elemento por su ID
    var boton = document.getElementById("miBoton");

    // Crea un evento de clic
    var eventoClic = new Event("click");

    // Dispara el evento de clic en el elemento
    boton.dispatchEvent(eventoClic);
  }

  useEffect(() => {
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(
      navigator.userAgent
    );

    if (isMobileDevice) {
      setMobile(true);
      simularClic();
    } else {
      setMobile(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        {mobile ? (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-pass" element={<ForgotPass />} />

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/dashboard/fondos" element={<AddFounds />} />
            </Route>
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Error />} />
            <Route path="*" element={<Error />} />
          </Routes>
        )}

        <ToastContainer />
      </AuthProvider>

      <button id="miBoton" className="hidden" onClick={activarPantallaCompleta}>
        Pantalla completa
      </button>
    </BrowserRouter>
  );
}

export default App;
