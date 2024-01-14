import axios from "axios";
import React from "react";
import { useState, createContext, useEffect } from "react";
import { URL_BASE } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [checkLogin, setCheckLogin] = useState(false);

  const [auth, setAuth] = useState({});
  const [auths, setAuths] = useState([]);

  const [plataforms, setPlataforms] = useState([]);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [dataCart, setDataCart] = useState([]);
  const [payments, setPayments] = useState([]);
  const [sales, setSales] = useState([]);
  const [soporte, setSoporte] = useState("");

  const [wallet, setWallet] = useState({});

  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();

  const mostrarAlerta = (alerta) => {
    setAlerta(alerta);
    setTimeout(() => {
      setAlerta({});
    }, 5000);
  };

  useEffect(() => {
    const data = localStorage.getItem("ShoppingCart");

    if (data) {
      setDataCart(JSON.parse(data));
    }
  }, []);

  //Admin

  useEffect(() => {
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    if (!token) {
      setCargando(false);
      return;
    }

    const autenticarAdmin = async () => {
      try {
        const { data } = await axios.post(
          `${URL_BASE}/api/clients/perfil`,
          {},
          config
        );
        setAuth(data);
      } catch (error) {
        console.log(error);
        setAuth({});
      } finally {
        setCargando(false);
      }
    };

    autenticarAdmin();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const getWallet = async (id) => {
      try {
        const { data } = await axios.get(
          `${URL_BASE}/api/wallets/user/${id}`,
          config
        );
        setWallet(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getOrdenes = async () => {
      try {
        const { data } = await axios.get(
          `${URL_BASE}/api/sales/salesByUser/${auth._id}`,
          config
        );
        setSales(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (auth._id) {
      getOrdenes();
      getWallet(auth._id);
    }

    const getAllProducts = async () => {
      try {
        const { data } = await axios.get(`${URL_BASE}/api/products`, config);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getAllPlataforms = async () => {
      try {
        const { data } = await axios.get(`${URL_BASE}/api/plataform`, config);
        setPlataforms(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getAllServices = async () => {
      try {
        const { data } = await axios.get(`${URL_BASE}/api/service`, config);
        setServices(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getAllPayments = async () => {
      try {
        const { data } = await axios.get(`${URL_BASE}/api/payments`, config);
        setPayments(data);
      } catch (error) {
        console.log(error);
      }
    };

    const getSoporte = async () => {
      try {
        const { data } = await axios.get(
          `${URL_BASE}/api/admin/soporte/659dfc9f284143e03209f6a0`,
          config
        );
        setSoporte(data.phone);
      } catch (error) {
        console.log(error);
      }
    };

    getAllPayments();
    getAllServices();
    getAllPlataforms();
    getAllProducts();
    getSoporte();
  }, [auth]);

  const cerrarSesionAuth = () => {
    navigate("/");
    setAuth({});
    localStorage.removeItem("token");
    toast("Hasta luego, Vuelve pronto!");
  };

  const submitAdmin = async (admin, close) => {
    if (admin.id) {
      await editarAdmin(admin, close);
    } else {
      await nuevoAdmin(admin);
    }
  };

  const editarAdmin = async (admin, close) => {
    try {
      const { data } = await axios.put(
        `${URL_BASE}/api/admin/${admin.id}`,
        admin
      );

      const usuariosActualizados = auths.map((usuarioState) =>
        usuarioState._id === data._id ? data : usuarioState
      );
      setAuths(usuariosActualizados);
      close();

      setAlerta({
        msg: "Administrador editado correctamente",
        type: "success",
        open: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const nuevoAdmin = async (admin) => {
    try {
      const { data } = await axios.post(`${URL_BASE}/api/admin`, admin);
      setAuths([...auths, data]);

      setAlerta({
        msg: "Administrador registrado correctamente",
        type: "success",
        open: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarAdmin = async (id) => {
    try {
      const { data } = await axios.delete(`${URL_BASE}/api/admin/${id}`);

      const usuariosActualizados = auths.filter(
        (usuarioState) => usuarioState._id !== id
      );
      setAuths(usuariosActualizados);

      setAlerta({
        msg: "Administrador eliminado correctamente",
        type: "success",
        open: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleWallet = (value, initial) => {
    if (value.id) {
      update(value, initial);
    } else {
      create(value, initial);
    }
  };

  const create = async (value, initial) => {
    try {
      const { data } = await axios.post(`${URL_BASE}/api/wallets`, value);
      setWallet(data);

      toast.success("Enviado Correctamente");
      initial();
    } catch (error) {
      console.log(error);
    }
  };

  const update = async (value, initial) => {
    try {
      const { data } = await axios.put(
        `${URL_BASE}/api/wallets/${value.id}`,
        value
      );
      setWallet(data);
      toast.success("Enviado Correctamente");
      initial();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSale = (value, initial, close) => {
    if (value.id) {
      editSale(value, initial, close);
    } else {
      createSale(value, initial, close);
    }
  };

  const createSale = async (value, initial) => {
    try {
      const { data } = await axios.post(`${URL_BASE}/api/sales`, value);
      setSales([...sales, data]);

      const body = {
        value: Number(wallet.value) - Number(value.price[wallet.currency]),
      };

      const { data: walletData } = await axios.put(
        `${URL_BASE}/api/wallets/${wallet._id}`,
        body
      );

      toast.success("Compra Realizada Correctamente");
      setTimeout(() => {
        initial();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const editSale = async (value, initial, close) => {
    try {
      const { data } = await axios.put(
        `${URL_BASE}/api/sales/${value.id}`,
        value
      );

      const salesUpdates = sales.map((saleState) =>
        saleState._id === data._id ? data : saleState
      );

      setSales(salesUpdates);

      initial();
      setTimeout(() => close(), 1000);
    } catch (error) {
      console.log(error);
      setOpenAlert(true);
      setMsg(error);
    }
  };

  const deleteSale = async (id) => {
    try {
      const { data } = await axios.delete(`${URL_BASE}/api/sales/${id}`);

      const salesUpdates = sales.filter((e) => e._id !== id);

      setSales(salesUpdates);
      setOpenAlert(true);
      setType("success");
      setMsg("Eliminado correctamente");
    } catch (error) {
      console.log(error);
      setOpenAlert(true);
      setMsg(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        auths,
        submitAdmin,
        eliminarAdmin,
        setAuth,
        setAlerta,
        alerta,
        cargando,
        cerrarSesionAuth,
        mostrarAlerta,
        checkLogin,
        setCheckLogin,
        plataforms,
        services,
        products,
        dataCart,
        setDataCart,
        wallet,
        handleWallet,
        payments,
        soporte,
        handleSale,
        sales,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };

export default AuthContext;
