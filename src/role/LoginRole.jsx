import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const LoginRole = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cookie = new Cookies();
  const token = cookie.get("auth");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(true);
    } else {
      navigate("/");
    }

    setIsLoading(false);
  }, [navigate]);

  if (isLoading) return null;

  return isAuthenticated ? <Outlet /> : null;
};

export default LoginRole;
