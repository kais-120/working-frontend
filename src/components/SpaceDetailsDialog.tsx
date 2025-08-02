
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/frontend/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/frontend/components/ui/card';
import { MapPin, Users, Euro, Calendar, Clock } from 'lucide-react';

interface SpaceDetailsDialogProps {
  space: {
    id: number;
    name: string;
    location: string;
    price: number;
    occupancy: number;
    status: string;
    reservations: number;
    coordinates: { latitude: number; longitude: number };
    description?: string;
    capacity?: number;
  };
  children: React.ReactNode;
}

const SpaceDetailsDialog = ({ space, children }: SpaceDetailsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-600">{space.name}</DialogTitle>
          <DialogDescription className="flex items-center gap-1 text-gray-600">
            <MapPin className="h-4 w-4" />
            {space.location}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informations principales */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <Euro className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Prix par heure</p>
                    <p className="font-bold text-blue-600">{space.price}€</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Capacité</p>
                    <p className="font-bold text-green-600">{space.capacity || 8} personnes</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-600">Réservations</p>
                    <p className="font-bold text-yellow-600">{space.reservations}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Taux d'occupation</p>
                    <p className="font-bold text-purple-600">{space.occupancy}%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {space.description || "Espace de travail moderne et fonctionnel, parfait pour les réunions d'équipe, les sessions de brainstorming ou le travail collaboratif. Équipé avec toutes les commodités nécessaires pour assurer productivité et confort."}
              </p>
            </CardContent>
          </Card>

          {/* Coordonnées GPS */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Localisation GPS</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Latitude</p>
                    <p className="font-mono font-bold text-gray-800">{space.coordinates.latitude}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Longitude</p>
                    <p className="font-mono font-bold text-gray-800">{space.coordinates.longitude}</p>
                  </div>
                </div>
                
                <div className="pt-3">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open(`https://www.google.com/maps?q=${space.coordinates.latitude},${space.coordinates.longitude}`, '_blank')}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Voir sur Google Maps
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques détaillées */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Statistiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="text-gray-600">Revenus mensuels estimés</span>
                  <span className="font-bold text-green-600">{Math.round(space.price * space.reservations * 2.5)}€</span>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="text-gray-600">Durée moyenne de réservation</span>
                  <span className="font-bold text-blue-600">3.2 heures</span>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span className="text-gray-600">Note moyenne</span>
                  <span className="font-bold text-yellow-600">4.8/5 ⭐</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SpaceDetailsDialog;
