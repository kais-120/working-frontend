import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Check, Eye, X } from "lucide-react"
import { useEffect, useState } from "react"
import { AxiosToken } from "../API/Api"
import BookingUserDetailsDialog from "@/components/BookingUserDetailsDialog"
import Swal from 'sweetalert2'
import { Input } from "@/components/ui/input"


const BookingManger = () => {
     const [bookings, setBookings] = useState([])
     const [filterBookings, setFilterBookings] = useState([])
      const [page, setPage] = useState(1)
      const [open, setOpen] = useState(false)
      const [user, setUser] = useState([])
      const [custom, setCustom] = useState([])
      const [change, setChange] = useState(0);
      const [search,setSearch] = useState("");
      const [loading, setLoading] = useState(true)
      useEffect(() => {
        if(search.trim().length > 0) return;
          AxiosToken.get(`/booking/all/${page}`).then((res) => {
            setBookings(res.data)
            setFilterBookings(res.data)
          }).finally(()=>setLoading(false))
        }, [page,change,search])
      
        const totalPages = filterBookings?.totalPage || 1
      
        const getPages = () => {
          const pages = []
          if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) pages.push(i)
          } else {
            pages.push(1)
            if (page > 3) pages.push("...")
            const start = Math.max(2, page - 1)
            const end = Math.min(totalPages - 1, page + 1)
            for (let i = start; i <= end; i++) pages.push(i)
            if (page < totalPages - 2) pages.push("...")
            pages.push(totalPages)
          }
          return pages
        };
        useEffect(()=>{
          if(search.trim().length < 1) return;
          const delaySearch = setTimeout(()=>{
            AxiosToken.get(`/booking/search/${page}?ref=${search}`)
            .then((response)=>setFilterBookings(response.data))
          },300)
          return () => clearTimeout(delaySearch)
        },[search,page])
   const handleUpdateStatus = async (status, id, membership) => {
  Swal.fire({
    title: "Es-tu sûr?",
    text: `Vous souhaitez mettre à jour cette réservation pour ${status ? "Approve" : "Annuler"}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Oui",
    cancelButtonText: "Non"
  }).then(async (result) => {
    if (result.isConfirmed) {
      if (membership === "personnalisé" && status === "accept") {
        const value = await Swal.fire({
          title: "Donner prix",
          input: "text",
          inputLabel: "Prix",
          inputPlaceholder: "Donner prix",
          inputValidator: (value) => {
            if (!value) {
              return "Veuillez entrer un prix";
            }
            if (isNaN(value)) {
              return "Le prix doit être un nombre";
            }
            if (Number(value) <= 0) {
              return "Le prix doit être supérieur à 0";
            }
            return null;
          }
        });

        if (value.value) {
          try {
            await AxiosToken.put(`/booking/update/status/${id}`, {
              status,
              membership,
              price: Number(value.value),
            });
            setChange((prev) => prev + 1);
            Swal.fire({
              title: "Mis à jour !",
              text: "Cette réservation est mise à jour.",
              icon: "success"
            });
          } catch (err) {
            console.error("Erreur lors de la mise à jour:", err);
          }
        }

      } else {
        // Pour les autres cas (non personnalisé ou "annuler")
        try {
          await AxiosToken.put(`/booking/update/status/${id}`, {
            status,
            membership
          });
          setChange((prev) => prev + 1);
          Swal.fire({
            title: "Mis à jour !",
            text: "Cette réservation est mise à jour.",
            icon: "success"
          });
        } catch (err) {
          console.error("Erreur lors de la mise à jour:", err);
        }
      }
    }
  });
};
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
     <div>
        <BookingUserDetailsDialog open={open} onOpenChange={setOpen} user={user} custom={custom} />
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Gestion des Réservations</h2>
          <p className="text-sm text-gray-600">Gérer les comptes Réservations</p>
        </div>
      </div>
        <Input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="rechercher on refrence de paiment"/>
     <div className="mt-5">
        {filterBookings && filterBookings?.bookings?.count === 0 ? 
        <span className="text-center text-gray-500">Aucun Réservation trouvé</span>
        : filterBookings?.bookings?.rows.map((item)=>(
        <Card key={item.id} className="w-full md:w-[75%] mb-3">
            <CardHeader>
                <div className="flex flex-col md:flex-row justify-between gap-2">
                    <div className="flex items-center">
                        <CardTitle className="me-2">{item.membership}</CardTitle>
                        <Badge variant={item.status}>{item.status === "pending" ? "En Attend" : item.status === "accept" ? "Approve" : "refuse" }</Badge>
                    </div>
                    <div className="grid grid-cols-3">
                        {item.status === "pending" &&
                        <>
                        <Button
                        className="bg-green-500  hover:bg-green-500/90 me-2 text-white"
                        onClick={()=>handleUpdateStatus("accept",item.id,item.membership)}
                        >
                            <Check className="me-2"  />
                            Approve
                        </Button>
                        <Button
                        onClick={()=>handleUpdateStatus("refuse",item.id,item.membership)}
                        className="bg-red-500 hover:bg-red-500/90 me-2 text-white"
                        >
                            <X className="me-2" />
                            Annuler
                        </Button>
                        </>
                        }
                        <Button
                        className="bg-blue-500 hover:bg-blue-500/90 text-white"
                        onClick={()=>{setOpen(true);setUser(item.users);setCustom(item.CustomMembership)}}
                        >
                            <Eye className="me-2" />
                            Voir
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
    <div className="grid grid-cols-2 gap-y-1 text-sm">
      <span className="font-medium">Date de Réservations:</span>
      <span>{new Date(item.createdAt).toLocaleDateString("fr")}</span>

      <span className="font-medium">Date de Début:</span>
      <span>{new Date(item.date_start).toLocaleDateString("fr")}</span>

      <span className="font-medium">Heure de Début:</span>
      <span>
        {new Date("2000-01-01T" + item.time_start).toLocaleTimeString("fr", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>

      <span className="font-medium">Durée:</span>
      <span>{item.duration}</span>

      <span className="font-medium">Tarif:</span>
      <span>{item.price} TND</span>

    </div>
  </CardContent>
            
        </Card>
        ))
        }
     </div>
        {filterBookings?.bookings?.count > 0 &&
      <Pagination className="mt-6">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => page > 1 && setPage((prev) => prev - 1)}
              className={page === 1 ? "pointer-events-none cursor-not-allowed opacity-50" : ""}
            />
          </PaginationItem>

          {getPages().map((p, i) =>
            p === "..." ? (
              <PaginationItem key={i}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={p}>
                <PaginationLink
                  isActive={page === p}
                  onClick={() => setPage(p)}
                  className="cursor-pointer"
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              onClick={() => page < totalPages && setPage((prev) => prev + 1)}
              className={page === totalPages ? "pointer-events-none cursor-not-allowed opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      }
    </div>
  )
}

export default BookingManger