import Sidebar from '@/components/layout/SideBar'
import TopBar from '@/components/layout/TopBar'
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { AxiosToken } from "../API/Api";
interface User {
  rule:string
}

const Dashboard = () => {
   const [user, setUser] = useState<User>({
    rule:""
   });
    const cookie = new Cookies();
    const token = cookie.get("auth")
  
    useEffect(() => {
      AxiosToken.get("/auth/profile")
      .then((response)=>{
        setUser(response.data);
      })
  
    }, [token]);
  return (
    <div className="flex min-h-screen w-full">
    <Sidebar user={user.rule} />

    <div className="flex flex-col flex-1 max-h-screen overflow-y-auto">
      <TopBar user={user.rule} />

      <main className="flex-1 p-5 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  </div>
  )
}

export default Dashboard