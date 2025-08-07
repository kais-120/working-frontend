
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';
import AddNewsDialog from '../../components/AddNewsDialog';
import { AxiosToken } from '../../API/Api' 
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useToast } from '@/hooks/use-toast';
import Swal from 'sweetalert2';
import UpdateNewsDialog from '@/components/UpdateNewsDialog';

const NewsManager = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [page,setPage] = useState(1);
  const [news,setNews] = useState([])
  const [dataNews,setDataNews] = useState({})
  const [loading,setLoading] = useState(true)
  const [change,setChange] = useState(0)
  const { toast } = useToast();


  const handleDeleteNews = async (id: number) => {
    Swal.fire({
           title: "Es-tu sûr?",
           text: `Vous souhaitez supprime le utitateur`,
           icon: "warning",
           showCancelButton: true,
           confirmButtonColor: "#3085d6",
           cancelButtonColor: "#d33",
           confirmButtonText: "Oui",
           cancelButtonText: "Non"
         }).then(async (result) => {
           if (result.isConfirmed) {
             try{
               AxiosToken.delete(`/news/delete/${id}`);
               setChange(prev => prev + 1)
             }
             catch{
               console.error("error")
             }
           }
         })
  };
  const totalPages = news?.totalPage || 1
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
  const handleToggleStatus = async (id: number) => {
    try{
      await AxiosToken.put(`/news/status/update/${id}`);
      setChange(prev => prev + 1)
       toast({
           title: "Succès",
          description: "Actualités est mettre à jour avec succès!",
        });
    }
    catch{
      console.error("error")
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'published' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'nouveautés':
        return 'bg-green-100 text-green-800';
      case 'services':
        return 'bg-blue-100 text-blue-800';
      case 'événements':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  useEffect(()=>{
      AxiosToken.get(`/news/all/${page}`)
      .then((response)=>setNews(response.data))
      .catch(()=>{console.error("error")})
      .finally(()=>setLoading(false))
  },[page,change])
   if (loading) {
          return (
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Gestion des Actualités
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Gérez les actualités et nouveautés</p>
            </div>
            <Button 
              onClick={() => setShowAddDialog(true)}
              className="bg-coworking-primary hover:bg-coworking-primary/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle actualité
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-fade-in delay-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total actualités</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{news?.news?.count}</div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in delay-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Publiées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
               {news?.countPublish}
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in delay-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Brouillons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {news?.countUnpublish}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* News List */}
        <Card className="animate-fade-in delay-500">
          <CardHeader>
            <CardTitle>Liste des actualités</CardTitle>
            <CardDescription>Gérez vos actualités et publications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {news && news?.news?.rows.map((article, index) => (
                <div 
                  key={article.id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors animate-fade-in"
                  style={{animationDelay: `${index * 100 + 600}ms`}}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-lg">{article?.titre}</h3>
                      <Badge className={getStatusColor(article?.status)}>
                        {article?.status === 'publish' ? 'Publié' : 'Brouillon'}
                      </Badge>
                      <Badge className={`${getCategoryColor(article?.category)} capitalize`}>
                        {article?.category}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {article?.content}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(article?.createdAt).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(article?.id)}
                    >
                      {article.status === 'publish' ? 'Dépublier' : 'Publier'}
                    </Button>
                    <Button
                    onClick={()=>{setShowUpdateDialog(true);setDataNews(article)}}
                    variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteNews(article?.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add News Dialog */}
        <AddNewsDialog 
          open={showAddDialog}
          onOpenChange={setShowAddDialog}
          onAddNews={setChange}
        />
        {
          showUpdateDialog &&
          <UpdateNewsDialog 
          open={showUpdateDialog}
          onOpenChange={setShowUpdateDialog}
          onAddNews={setChange}
          news={dataNews}
          />
        }
      </div>
       {news?.news?.count > 0 &&
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
  );
};

export default NewsManager;
