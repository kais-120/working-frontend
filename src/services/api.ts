import axios from 'axios';

const API_URL = 'http://localhost:5000/api/projects';

export const projectService = {
  // Récupérer tous les projets
  getAll: async () => {
    return axios.get(API_URL);
  },

  // Créer un nouveau projet
  create: async (project: {
    name: string;
    description?: string;
    deadline?: string;
  }) => {
    return axios.post(API_URL, project);
  },

  // Supprimer un projet
  delete: async (projectId: string) => {
    return axios.delete(`${API_URL}/${projectId}`);
  },

  // Ajouter un document simulé à un projet
  addDocument: async (projectId: string, document: {
    name: string;
    type: string;
    size: string;
  }) => {
    return axios.post(`${API_URL}/${projectId}/documents`, document);
  },
};
