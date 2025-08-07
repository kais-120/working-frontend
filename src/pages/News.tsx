
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Clock, CalendarCheck } from 'lucide-react';
import { AxiosToken,IMAGE_URL } from '../API/Api';


const News = () => {
  const [news,setNews] = useState([])
  useEffect(()=>{
    AxiosToken.get("/news/public")
    .then((response)=>{setNews(response.data)})
  },[])

  // const [news] = useState([
  //   {
  //     id: 1,
  //     title: 'Ouverture du nouvel espace créatif',
  //     content: 'Nous sommes ravis d\'annoncer l\'ouverture de notre tout nouvel espace créatif équipé des dernières technologies pour stimuler votre créativité et productivité.',
  //     author: 'Équipe Djerba Coworking',
  //     date: '2024-01-15',
  //     category: 'Nouveautés',
  //     image: '/lovable-uploads/d5bf582a-786b-4331-902e-0486651d6a50.png',
  //     status: 'published'
  //   },
  //   {
  //     id: 2,
  //     title: 'Nouveau service de conciergerie',
  //     content: 'Pour améliorer votre expérience, nous avons mis en place un service de conciergerie disponible 24h/24 pour répondre à tous vos besoins professionnels.',
  //     author: 'Direction',
  //     date: '2024-01-10',
  //     category: 'Services',
  //     image: '/lovable-uploads/55374106-adde-4f99-8b09-d47b1a4df394.png',
  //     status: 'published'
  //   },
  //   {
  //     id: 3,
  //     title: 'Événement networking mensuel',
  //     content: 'Rejoignez-nous chaque premier vendredi du mois pour notre événement networking. Une occasion unique de rencontrer d\'autres entrepreneurs et de développer votre réseau.',
  //     author: 'Community Manager',
  //     date: '2024-01-08',
  //     category: 'Événements',
  //     image: '/lovable-uploads/ff5afd0c-a922-43ae-8255-22c5b4335d0a.png',
  //     status: 'published'
  //   }
  // ]);


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-coworking-primary to-blue-600 text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in">
              Actualités
            </h1>
            <p className="text-xl leading-relaxed mb-8 animate-fade-in delay-200">
              Découvrez les dernières nouveautés et événements de Djerba Coworking
            </p>
            
          </div>
        </div>
      </section>

      {/* News Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-8">
              {news && news.length < 1 ?
                <span>Aucun Actualités </span>
                :
              news.map((article, index) => (
                <Card key={article.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                  <div className="md:flex">
                    {article.image && (
                      <div className="md:w-1/3">
                        <img 
                          src={`${IMAGE_URL}/${article.image}`} 
                          alt={article.title}
                          className="w-full h-48 md:h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                        />
                      </div>
                    )}
                    <div className={article.image ? "md:w-2/3" : "w-full"}>
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2 capitalize">
                          <Badge className={getCategoryColor(article.category)}>
                            {article.category}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(article.updatedAt)}
                          </div>
                        </div>
                        <CardTitle className="text-2xl group-hover:text-coworking-primary transition-colors duration-300">
                          {article.title}
                        </CardTitle>
                        {(article.category === "événements" || article.category === "promotions") &&  
                        <CardDescription className="flex items-center gap-4 text-gray-600">
                          <div className="flex items-center">
                            <CalendarCheck className="h-4 w-4 mr-1" />
                            {formatDate(article.date_start)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {article.time_start}
                          </div>
                        </CardDescription>
                        }
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {article.content}
                        </p>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
              {news.length > 4 && 
            <div className="text-center mt-12">
              <Button variant="outline" className="px-8 py-3">
                Charger plus d'actualités
              </Button>
            </div>
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
