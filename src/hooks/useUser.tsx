import { useEffect, useState } from "react"
import Cookies from "universal-cookie";
import { AxiosToken , SOCKET_URL } from "../API/Api"

export const  useUser = () => {
    const [user,setUser] = useState([]);
    const [auth,setAuth] = useState(false);
    const [loading,setLoading] = useState(true);
    const [expire,setExpire] = useState(false);
    const cookie = new Cookies();
    const token = cookie.get("auth")
  useEffect(()=>{
    if(!token){
      setLoading(false);
      return
    }
           AxiosToken.get("/auth/profile")
           .then((response)=>{
             setUser(response.data);
             setAuth(true)
             
           }).catch((error)=>{
            if(error.status === 403){
              setExpire(true)
            }
          })
           .finally(()=>setLoading(false))
  },[token])

  return  {user, auth, loading, expire, setExpire} ;
}

