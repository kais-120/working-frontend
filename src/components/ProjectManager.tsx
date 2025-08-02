
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FolderPlus, Upload, FileText, Calendar, Users, Trash2, Download, Eye } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { projectService } from '../services/api';
import axios from 'axios';
import { API_URL } from '../API/Api';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    deadline: ''
  });
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isChange, setIsChange] = useState(0);
  const { toast } = useToast();
  const [token, setToken] = useState<string | null>(null);

  // Charger les projets au montage du composant
  useEffect(() => {
    const storedToken = window.localStorage.getItem("auth");
      setToken(storedToken);
  }, []);
  useEffect(() => {
    if (!token) return;
     setIsLoading(true);
      axios.get(`${API_URL}/auth/project/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => { ;
      setProjects(response.data || []);
      setIsLoading(false);
    }
    )
    .catch((error: any) => {
      console.error('Erreur lors du chargement des projets:', error);
      toast({
        title: "Erreur",
        description: error.message || "Impossible de charger les projets",
        variant: "destructive",
      })
    }
    ).finally (()=>{
      setIsLoading(false);
    })
  }, [isChange, token]);

 
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);

    try {
      if (!newProject.name.trim()) {
        toast({
          title: "Erreur",
          description: "Le nom du projet est requis",
          variant: "destructive",
        });
        return;
      }

      await axios.post(`${API_URL}/auth/project/add`,{
        name: newProject.name,
        description: newProject.description,
        deadline: newProject.deadline
      },
      {
        headers: {  
          Authorization: `Bearer ${token}`,
        }
      }
    );
    setIsChange(prev => prev + 1); // Incrémenter pour recharger les projets

      toast({
        title: "Succès",
        description: "Projet créé avec succès!",
      });

      setNewProject({ name: '', description: '', deadline: '' });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors de la création du projet",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleFileUpload = async (projectId: string) => {
    try {
      // Simuler l'upload d'un fichier
      const mockDocument = {
        name: 'document-' + Date.now() + '.pdf',
        type: 'pdf',
        size: '1.2 MB'
      };

      await projectService.addDocument(projectId, mockDocument);

      toast({
        title: "Succès",
        description: "Document uploadé avec succès!",
      });

      // loadProjects(); // Recharger pour voir le nouveau document
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors de l'upload du document",
        variant: "destructive",
      });
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await axios.delete(`${API_URL}/auth/project/delete/${projectId}`,
      {
        headers: {  
          Authorization: `Bearer ${token}`,
        }
      }
    );
    setIsChange(prev => prev + 1);
      
      toast({
        title: "Succès",
        description: "Projet supprimé avec succès!",
      });

      // loadProjects();
    } catch (error: any) {
      console.error('Erreur lors de la suppression du projet:', error);
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors de la suppression",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_cours': return 'default';
      case 'planifie': return 'secondary';
      case 'termine': return 'default';
      default: return 'secondary';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'en_cours': return 'En cours';
      case 'planifie': return 'Planifié';
      case 'termine': return 'Terminé';
      default: return status;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-bleu-50 to-pink-100">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            Gestion de Projets
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Créez et gérez vos projets avec leurs documents
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Project Form */}
          <Card className="lg:col-span-1 hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderPlus className="h-5 w-5 text-purple-500" />
                Nouveau Projet
              </CardTitle>
              <CardDescription>
                Créer un nouveau projet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Nom du projet *</Label>
                  <Input
                    id="projectName"
                    value={newProject.name}
                    onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ex: Site Web E-commerce"
                    className="border-2 border-gray-200 focus:border-purple-500 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectDescription">Description</Label>
                  <Textarea
                    id="projectDescription"
                    value={newProject.description}
                    onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Décrivez votre projet..."
                    className="border-2 border-gray-200 focus:border-purple-500 rounded-lg"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectDeadline">Date de l'ancement du projet</Label>
                  <Input
                    id="projectDeadline"
                    type="date"
                    value={newProject.deadline}
                    onChange={(e) => setNewProject(prev => ({ ...prev, deadline: e.target.value }))}
                    className="border-2 border-gray-200 focus:border-purple-500 rounded-lg"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isCreating}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl rounded-lg font-semibold transition-all duration-300"
                >
                  {isCreating ? 'Création...' : 'Créer le Projet'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Projects List */}
          <Card className="lg:col-span-2 hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Mes Projets
              </CardTitle>
              <CardDescription>
                Gérez vos projets et leurs documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {projects.map((project: any) => (
                    <div key={project._id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{project.name}</h3>
                          <p className="text-gray-600 text-sm">{project.description}</p>
                        </div>
                        <Badge variant={getStatusColor(project.status)}>
                          {getStatusText(project.status)}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Créé: {new Date(project.createdAt).toLocaleDateString()}
                        </span>
                        {project.deadline && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Échéance: {new Date(project.deadline).toLocaleDateString()}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {project.documents?.length || 0} document(s)
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleFileUpload(project._id)}
                          className="gap-1"
                        >
                          <Upload className="h-4 w-4" />
                          Upload
                        </Button>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline" className="gap-1">
                              <Eye className="h-4 w-4" />
                              Voir Documents
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl rounded-lg font-semibold transition-all duration-300">
                            <DialogHeader>
                              <DialogTitle>Documents - {project.name}</DialogTitle>
                              <DialogDescription>
                                Gérez les documents de votre projet
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4">
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Nom</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Taille</TableHead>
                                    <TableHead>Upload</TableHead>
                                    
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {project.documents?.map((doc: any) => (
                                    <TableRow key={doc.id}>
                                      <TableCell className="font-medium">{doc.name}</TableCell>
                                      <TableCell>{doc.type.toUpperCase()}</TableCell>
                                      <TableCell>{doc.size}</TableCell>
                                      <TableCell>
                                        {new Date(doc.uploadedAt).toLocaleDateString()}
                                      </TableCell>
                                      
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDeleteProject(project._id)}
                          className="gap-1 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {projects.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      Aucun projet trouvé. Créez votre premier projet !
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProjectManager;
