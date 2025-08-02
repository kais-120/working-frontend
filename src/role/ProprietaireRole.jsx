import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../API/Api";
import { Outlet, useNavigate } from "react-router-dom";

const AdminRole = () => {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("auth");
    setToken(storedToken);
    if (!storedToken) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserType(res.data.type);
        if (res.data.type !== "Propriétaire") {
          navigate("/");
        } else {
          setLoading(false); // accès autorisé
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
