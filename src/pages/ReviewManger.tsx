import { useEffect, useState } from "react"
import { AxiosToken } from "../API/Api"
import { Check, Eye, Star, X } from "lucide-react"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import ReviewTextDialog from "@/components/ReviewTextDialog"
import Swal from "sweetalert2"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


const ReviewManger = () => {
    const [reviews, setReviews] = useState([])
    const [page, setPage] = useState(1)
    const [change, setChange] = useState(0)
    const [open, setOpen] = useState(0)
    const [review, setReview] = useState(false)
    const [loading, setLoading] = useState(true)
        useEffect(() => {
              AxiosToken.get(`/review/all/${page}`).then((res) => setReviews(res.data))
              .finally(()=>setLoading(false))
            }, [page,change])
          
            const totalPages = reviews?.totalPage || 1
          
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
             const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      accept: 'bg-green-100 text-green-800 border-green-300',
      refuse: 'bg-red-100 text-red-800 border-red-300'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full capitalize text-xs font-medium border ${styles[status]}`}>
        {status === "pending" ? "en Attend" : status === "accept" ? "approve" : "annuler" }
      </span>
    );
  };
    const handleStatusUpdate = async (id,status)=>{
       Swal.fire({
          title: "Es-tu sûr?",
          text: `Vous souhaitez mettre à jour cette Avis pour ${status ? "Approve" : "Annuler"}`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Oui",
          cancelButtonText: "Non"
        }).then(async (result) => {
          if (result.isConfirmed) {
        try{
        await AxiosToken.put(`/review/update/status/${id}`,{status})
        setChange(prev => prev +1)
            }
            catch{
              console.error("err");
            }
          Swal.fire({
          title: "Mis à jour !",
          text: "Cette Avis est mise à jour.",
          icon: "success"
          })
        }
          });
    }
    const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
    const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    );
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
      <div className="bg-white rounded-lg  shadow overflow-hidden animate-fade-in delay-100">
        <ReviewTextDialog onOpenChange={setOpen} open={open} review={review} />
          <div className="overflow-x-auto">
             <div className="mb-8 animate-fade-in px-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            Gestion des Avis
                          </h1>
                          <p className="text-gray-600 mt-2 text-lg">Gérez les Avis</p>
                        </div>                   
                      </div>
                    </div>
            
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8  px-5">
                      <Card className="animate-fade-in delay-100">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-gray-600">Total actualités</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">3</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="animate-fade-in delay-200">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-gray-600">Publiées</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-green-600">
                          3
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card className="animate-fade-in delay-300">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-gray-600">Brouillons</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold text-yellow-600">
                            3
                          </div>
                        </CardContent>
                      </Card>
              </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avis
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Note
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reviews && reviews.length > 0 ? reviews?.reviews?.rows.map((review) => (
                  <tr key={review.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {review.userReviews.name} {review.userReviews.last_name}
                        </div>
                        <div className="text-sm text-gray-500">{review.userReviews.email}</div>
                        <div className="text-xs text-gray-400">{review.position}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        <Eye className=" cursor-pointer"  onClick={()=>{setOpen(true);setReview(review.review)}}/>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {renderStars(review.rating)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(review.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(review.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {review.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(review.id, 'accept')}
                              className="text-green-600 hover:text-green-900 p-1 rounded-full hover:bg-green-100"
                              title="Approuver"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(review.id, 'refuse')}
                              className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-100"
                              title="Rejeter"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        )}
                        {review.status !== 'pending' && (
                          <button
                            onClick={() => handleStatusUpdate(review.id, 'pending')}
                            className="text-gray-600 hover:text-gray-900 text-xs px-2 py-1 border border-gray-300 rounded hover:bg-gray-50"
                          >
                            Réinitialiser
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
                :
                <tr>
                      <td className="text-gray-500 text-center" colSpan={6}>Aucun avis trouvé</td>
                </tr>
              }
              </tbody>
            </table>
          </div>
          {reviews && reviews.length > 0 &&
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

export default ReviewManger;