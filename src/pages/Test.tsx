import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { BadgeCheck, XCircle, Clock } from "lucide-react"

export default function BookingCard() {
  return (
    <Card className="flex flex-row items-center gap-4 p-4 max-w-4xl">
      {/* Image */}
      <div className="w-1/3">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
          alt="booking"
          className="rounded-lg object-cover w-full h-48"
        />
      </div>

      {/* Content */}
      <div className="w-2/3 flex flex-col justify-between space-y-3">
        <CardHeader className="p-0">
          <div className="flex items-center justify-between">
            <CardTitle>Espace Coworking – Djerba</CardTitle>
            <span className="bg-yellow-400 text-white px-2 py-1 rounded text-sm font-medium flex items-center gap-1">
              <Clock size={14} /> Pending
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="grid grid-cols-2 gap-y-1 text-sm">
            <span className="font-medium">Date de Réservations:</span>
            <span>2025-08-02</span>

            <span className="font-medium">Date de Début:</span>
            <span>2025-08-02</span>

            <span className="font-medium">Heure de Début:</span>
            <span>12:00</span>

            <span className="font-medium">Durée:</span>
            <span>Mois</span>

            <span className="font-medium">Tarif:</span>
            <span>128 TND</span>

            <span className="font-medium">Client:</span>
            <span>KAis</span>
          </div>
        </CardContent>

        <CardFooter className="p-0 pt-2 gap-2">
          <Button variant="default" className="bg-green-500 hover:bg-green-600 text-white flex items-center gap-1">
            <BadgeCheck size={16} /> Approuver
          </Button>
          <Button variant="destructive" className="flex items-center gap-1">
            <XCircle size={16} /> Annuler
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}
