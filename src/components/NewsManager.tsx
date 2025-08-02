
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Edit, Trash2, Eye, Calendar, User } from 'lucide-react';
import AddNewsDialog from './AddNewsDialog';

interface NewsManagerProps {
  onBack: () => void;
}

const NewsManager = ({ onBack }: NewsManagerProps) => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  
  // Mock data for news management
  const [news, setNews] = useState([
    {
      id: 1,
      title: 'Ouverture du nouvel espace créatif',
      content: 'Nous sommes ravis d\'annoncer l\'ouverture de notre tout nouvel espace créatif...',
      author: 'Équipe Djerba Coworking',
      date: '2024-01-15',
      category: 'Nouveautés',
      status: 'published',
      views: 234
    },
    {
      id: 2,
      title: 'Nouveau service de conciergerie',
      content: 'Pour améliorer votre expérience, nous avons mis en place un service de conciergerie...',
      author: 'Direction',
      date: '2024-01-10',
      category: 'Services',
      status: 'published',
      views: 156
    },
    {
      id: 3,
      title: 'Événement networking mensuel',
      content: 'Rejoignez-nous chaque premier vendredi du mois pour notre événement networking...',
      author: 'Community Manager',
      date: '2024-01-08',
      category: 'Événements',
      status: 'draft',
      views: 0
    }
  ]);

  const handleAddNews = (newNews: any) => {
    const newsWithId = {
      ...newNews,
      id: Date.now(),
      views: 0,
      date: new Date().toISOString().split('T')[0]
    };
    setNews(prev => [newsWithId, ...prev]);
    setShowAddDialog(false);
  };

  const handleDeleteNews = (id: number) => {
    setNews(prev => prev.filter(item => item.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setNews(prev => prev.map(item => 
      item.id === id 
        ? { ...item, status: item.status === 'published' ? 'draft' : 'published' }
        : item
    ));
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <Button 
                variant="outline" 
                onClick={onBack}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour aux actualités
              </Button>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="animate-fade-in delay-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total actualités</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{news.length}</div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in delay-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Publiées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {news.filter(item => item.status === 'published').length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in delay-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Brouillons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {news.filter(item => item.status === 'draft').length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in delay-400">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Vues totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {news.reduce((total, item) => total + item.views, 0)}
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
              {news.map((article, index) => (
                <div 
                  key={article.id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors animate-fade-in"
                  style={{animationDelay: `${index * 100 + 600}ms`}}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-lg">{article.title}</h3>
                      <Badge className={getStatusColor(article.status)}>
                        {article.status === 'published' ? 'Publié' : 'Brouillon'}
                      </Badge>
                      <Badge className={getCategoryColor(article.category)}>
                        {article.category}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {article.content}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(article.date).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {article.views} vues
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(article.id)}
                    >
                      {article.status === 'published' ? 'Dépublier' : 'Publier'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteNews(article.id)}
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
          onAddNews={handleAddNews}
        />
      </div>
    </div>
  );
};

export default NewsManager;
