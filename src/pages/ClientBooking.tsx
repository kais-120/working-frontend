import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { CreditCard, MessageSquareText, QrCode} from "lucide-react"
import { useEffect, useState } from "react"
import { AxiosToken,SOCKET_URL } from "../API/Api"
import ReviewDialog from "@/components/ReviewDialog"
import CodeQrDialog from "@/components/CodeQrDialog"
import { useUser } from "@/hooks/useUser"
import { io } from "socket.io-client"


const ClientBooking = () => {
    const [bookings, setBookings] = useState([])
    const [page, setPage] = useState(1)
    const [reviewOpen,setReviewOpen] = useState(false)
    const [codeQrOpen,setCodeQrOpen] = useState(false)
    const [payment,setPayment] = useState([])
    const [loadingPage,setLoadingPage] = useState(true)
    const [change,setChange] = useState(0)
    const {user,loading} = useUser()
    const date = new Date(Date.now() + 1000 * 60 * 60 * 24)
      useEffect(() => {
          AxiosToken.get(`/booking/me/${page}`).then((res) => setBookings(res.data))
          .finally(()=>setLoadingPage(false))
        }, [page,change])
      
        const totalPages = bookings?.totalPage || 1
      
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
        }
        const handlePayment = async (amount,booking_id,payment_access)=>{
          if(payment_access === "pending"){
          try{
            const response = await AxiosToken.post("/payment/create",{
              amount,
              booking_id
            });
            window.location.href = response.data.payUrl
          }catch{
            console.error("error");
          }
          }
        }
      
  useEffect(()=>{
    if(!loading){
      const socket = io(SOCKET_URL);
      socket.on("connect",()=>{
        console.log("user connect")
        socket.emit("join-room", user?.id);
      });
      socket.on("booking-update",()=>{
        setChange(prev => prev + 1)
      })
    }
  },[loading])
    if (loadingPage) {
          return (
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
    );
  }
  return (
     <div>
      <ReviewDialog open={reviewOpen} onOpenChange={setReviewOpen} />
      {codeQrOpen &&
      <CodeQrDialog open={codeQrOpen} onOpenChange={setCodeQrOpen} payment={payment} />
      }
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Mes Réservations</h2>
          <p className="text-sm text-gray-600">Consultez et gérez vos réservations personnelles</p>
        </div>
      </div>
     <div>
        {bookings && bookings?.bookings?.rows.length < 1 ?
        <span className="text-gray-600 text-center">il y'a pas de Réservations</span>
        :
        bookings?.bookings?.rows.map((item)=>(

        
        <Card key={item.id} className="w-full md:w-[75%] mb-3 animate-fade-in delay-100">
  <CardHeader>
    <div className="flex flex-col md:flex-row justify-between gap-2">
      <div className="flex items-center">
        <CardTitle className="me-2">{item.membership}</CardTitle>
        <Badge variant={item.status}>
          {item.status === "pending"
            ? "En Attend"
            : item.status === "accept"
            ? "Approve"
            : "Refuse"}
        </Badge>
      </div>

      {item.status === "accept" && (
        <div className="mt-2 md:mt-0 w-full md:w-auto">
            {item.payment_access === "pending" ? (
              <Button
                className="bg-blue-500 hover:bg-blue-500/90 text-white w-full md:w-auto"
                onClick={() => handlePayment(item.price, item.id, item.payment_access)}>
                    <CreditCard className="me-2" />
                    Payer
                  </Button>
            ) : (
              <Button
              className="bg-blue-500 hover:bg-blue-500/90 text-white w-full md:w-auto"
              onClick={() => {
                  setCodeQrOpen(true);
                  setPayment(item);
                }}
              >
              <QrCode/>
              </Button>
            )}
        </div>
      )}
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

      {(date > new Date(new Date(item.date_start).toDateString()) &&
        item.payment_access === "accept") && (
        <>
          <span className="font-medium">Avis:</span>
          <span>
            <MessageSquareText onClick={() => setReviewOpen(true)} />
          </span>
        </>
      )}
    </div>
  </CardContent>
</Card>

        ))
        }
     </div>
    {bookings?.bookings?.rows.length > 0 &&
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
      </Pagination>}
    </div>
  )
}

export default ClientBooking