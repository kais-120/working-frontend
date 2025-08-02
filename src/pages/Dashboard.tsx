import Sidebar from '@/components/layout/SideBar'
import TopBar from '@/components/layout/TopBar'
import { Outlet } from 'react-router-dom'
import { useUser } from '@/hooks/useUser';
interface User {
  rule:string
}

const Dashboard = () => {
    const {loading,user} = useUser();
    if(loading) return  (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  
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