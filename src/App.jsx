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

function App() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(
      navigator.userAgent
    );

    if (isMobileDevice) {
      setMobile(true);
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
    </BrowserRouter>
  );
}

export default App;
