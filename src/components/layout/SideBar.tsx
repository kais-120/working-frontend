import { User, LayoutDashboard, Users, CalendarCheck, CreditCard, Star, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUser } from "@/hooks/useUser";

export default function Sidebar() {
  const isMobile = useIsMobile();
     const {loading,user} = useUser();
     

  let data = [];

  if (user.rule === "client") {
    data = [
      { link: "booking", label: "Réservations", icon: <CalendarCheck /> },
    ];
  } else {
    data = [
      { link: "", label: "Statistiques", icon: <BarChart3 /> },
      ...(user.rule === "admin"
        ? [{ link: "users", label: "Utilisateurs", icon: <Users /> }]
        : []),
      { link: "manger/booking", label: "Réservations", icon: <LayoutDashboard /> },
      { link: "verify-payment", label: "Vérification Paiement", icon: <CreditCard  /> },
      ...(user.rule === "admin"
        ? [{ link: "reviews", label: "Avis", icon: <Star /> }]
        : []),
    ];
  }

  data.push({ link: "profile", label: "Profil", icon: <User /> });

  return (
    <div
      className={cn(
        "!sticky top-0 left-0 h-screen w-80 bg-white text-gray-600 shadow-md p-4 space-y-4 transform transition-transform duration-300 ease-in-out z-50",
        "md:translate-x-0 md:relative md:block",
        isMobile ? "w-22" : "w-80"
      )}
    >
      {
        !isMobile &&
      <h2 className="text-xl font-bold mb-6">Djerba Coworking</h2>
      }
      <nav className="space-y-2">
        {loading ?
        <div className="flex items-center justify-center min-w-full  min-h-screen">
          <div className="animate-spin rounded-full h-5  w-5 border-b-2 border-gray-600"></div>
        </div>
        :
        data.map((item, index) =>
          !isMobile ? (
            <SidebarItem key={index} to={item.link} icon={item.icon} label={item.label} />
          ) : (
            <SidebarItemMobile key={index} to={item.link} icon={item.icon} />
          )
        )
      }
      </nav>
    </div>
  );
}

function SidebarItem({ icon, label, to }) {
  return (
    <NavLink
    end
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-2 p-2 rounded hover:text-coworking-primary hover:bg-slate-200 cursor-pointer ${
          isActive ? "text-coworking-primary bg-slate-200" : ""
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

function SidebarItemMobile({ icon, to }) {
  return (
    <NavLink
    end
      to={to}
      className={({ isActive }) =>
        `flex w-16 justify-center items-center space-x-2 p-2 rounded hover:text-coworking-primary hover:bg-slate-200 cursor-pointer ${
          isActive ? "text-coworking-primary bg-slate-200" : ""
        }`
      }
    >
      {icon}
    </NavLink>
  );
}
