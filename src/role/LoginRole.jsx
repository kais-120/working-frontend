import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const LoginRole = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("auth");

    if (!storedToken) {
      setIsAuthenticated(true);
    } else {
      navigate("/");
    }

    setIsLoading(false);
  }, [navigate]);

  if (isLoading) return null; // ou un spinner

  return isAuthenticated ? <Outlet /> : null;
};

export default LoginRole;
