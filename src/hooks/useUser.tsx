import { useEffect, useState } from "react"
import Cookies from "universal-cookie";
import { AxiosToken } from "../API/Api"

export const  useUser = () => {
    const [user,setUser] = useState([]);
    const [error,setError] = useState(true);
    const cookie = new Cookies();
    const token = cookie.get("auth")
  useEffect(()=>{
    if(!token) return
           AxiosToken.get("/auth/profile")
           .then((response)=>{
             setUser(response.data);
             setError(false)
           }).catch(()=>setError(true))
  },[token])

  return  {user,error} ;
}

