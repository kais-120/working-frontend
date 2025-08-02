
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, User } from 'lucide-react';

interface SpaceDetailsDialogProps {
  user:{
    name:string,
    last_name:string,
    email:string,
    phone:string,
  },
  children: React.ReactNode;
  onOpenChange:(open: boolean) => void,
  open:boolean,
  custom:object
}

const BookingUserDetailsDialog = ({ user, children, open,onOpenChange,custom }: SpaceDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger  asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">{user.name}</DialogTitle>
          
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informations principales */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations générales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                  <User className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm text-gray-600">Nom Prénom</p>
                    <p className="font-bold text-yellow-600 capitalize">{user.name} {user.last_name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-bold text-blue-600">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Numero de Telephone</p>
                    <p className="font-bold text-green-600">{user.phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Informations principales */}
          {custom.length > 0 && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Abonnement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4"><strong>Disponibilité: </strong>{custom[0].offered}</p>
            <p className="mb-4"><strong>Accès aux salles de réunion: </strong>{custom[0].access_meeting ? "Oui" : "Non"}</p>
            <p className="mb-4"><strong>Accès 24/7:</strong>{custom[0].access ? "Oui" : "Non"}</p>
            <p className="mb-4"><strong>Invitation aux évènements et au réseau d'investisseurs: </strong>{custom[0].invitation ? "Oui" : "Non"}</p>
            <div className="space-y-2 me-3">
              <h4 className="font-semibold ">Équipements inclus: </h4>
              <div className="grid grid-cols-2 gap-2">
                {custom[0].MembershipEquipments.map(equipment => (
                  <div key={equipment.id} className="p-2 bg-gray-50 rounded">
                    {equipment.equipment}
                  </div>
                ))}
                
              </div>
            </div>
          </CardContent>
        </Card>
      )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingUserDetailsDialog;
