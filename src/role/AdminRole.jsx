import { useEffect, useState } from "react";
import {  AxiosToken } from "../API/Api";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const AdminRole = () => {
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const cookie = new Cookies();
  const token = cookie.get("auth")
  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await AxiosToken(`/auth/profile`);
        setUserType(res.data.rule);
        if (res.data.rule !== "admin") {
          navigate("/");
        } else {
          setLoading(false); 
        }
      } catch (error) {
        console.error("Erreur de récupération du profil", error);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [token, navigate]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  return <Outlet />;
};

export default AdminRole;
