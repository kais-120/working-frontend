import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { AxiosToken } from '../API/Api'
import { error } from "node:console";
import ExpireDialog from "@/components/ExpireDialog";
interface AuthRoleProp{
  allowRole:string[]
}
interface User{
  rule:string
}

const AuthRole = ({allowRole}:AuthRoleProp) => {
  const [isLoading, setIsLoading] = useState(true);
    const [expire,setExpire] = useState(false);
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
    }).catch((error)=>{
       if(error.status === 403){
              setExpire(true)
          }
    })

  }, [navigate]);
  if (isLoading) return null ; 

  if(expire){
    return <ExpireDialog open={expire} setOpen={setExpire} />
  }


  return allowRole.includes(user?.rule) ? <Outlet /> : navigate("/",{replace:true});
};

export default AuthRole;
