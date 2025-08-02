import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { AxiosToken } from '../API/Api'
interface AuthRoleProp{
  allowRole:string[]
}
interface User{
  rule:string
}

const AuthRole = ({allowRole}:AuthRoleProp) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>({
    rule:""
  });
  const navigate = useNavigate();
  const cookie = new Cookies();
  const token = cookie.get("auth")

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    AxiosToken.get("/auth/profile")
    .then((response)=>{
      setUser(response.data);
      setIsLoading(false);
    })

  }, [navigate]);

  if (isLoading) null ; 

  return allowRole.includes(user?.rule) ? <Outlet /> : navigate("/",{replace:true});
};

export default AuthRole;
