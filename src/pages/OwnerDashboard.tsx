import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  MapPin,
  Calendar,
  Euro,
  Users,
  Settings,
  BarChart3,
  TrendingUp,
  Activity,
} from "lucide-react";
import AddSpaceDialog from "../components/AddSpaceDialog";
import axios from "axios";
import { API_URL } from "../API/Api";
import { useToast } from '../components/ui/use-toast';

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("spaces");
  const [data, setData] = useState([]);
  const [space,setSpace] = useState([]);

  // Mock data
  const { toast } = useToast();
  const [ownerSpaces, setOwnerSpaces] = useState([
    {
      id: 1,
      name: "Salle de réunion Premium",
      location: "Centre-ville Djerba",
      price: 25,
      occupancy: 0,
      status: "active",
      reservations: 0,
      coordinates: { latitude: 33.8869, longitude: 10.609 },
    },
    {
      id: 2,
      name: "Bureau privé moderne",
      location: "Zone touristique",
      price: 35,
      occupancy: 0,
      status: "active",
      reservations: 0,
      coordinates: { latitude: 33.875, longitude: 10.62 },
    },
  ]);

  const reservations = [
    {
      id: 1,
      space: "Salle de réunion Premium",
      client: "Ahmed Ben Ali",
      date: "2024-01-15",
      duration: "2h",
      amount: 50,
      status: "confirmed",
    },
    {
      id: 2,
      space: "Bureau privé moderne",
      client: "Sarah Trabelsi",
      date: "2024-01-16",
      duration: "4h",
      amount: 140,
      status: "pending",
    },
  ];

  const monthlyEarnings = {
    income: 0,
    expenses: 0,
    spendings: 0,
    totals: 0,
    total: 0,
    thisMonth: 0,
    lastMonth: 0,
    growth: 0,
  };
  useEffect(()=>{
    axios.get(`${API_URL}/auth/space/get`,{
      headers:{
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
      }
    }).then((data)=>setSpace(data.data));
  },[])

  function handleSpaceAdded(space: any): void {
    setOwnerSpaces((prevSpaces) => [
      ...prevSpaces,
      {
        ...space,
        id: prevSpaces.length
          ? Math.max(...prevSpaces.map((s) => s.id)) + 1
          : 1,
        reservations: 0,
        occupancy: 0,
        status: "pending",
      },
    ]);
    useEffect(() => {
      axios
        .get(`${API_URL}/auth/space/get`, {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        })
        .then((response) => setData(response))
        .catch((err) => console.error(err));
    }, []);
  };
  const handleDelete = async (spaceId: string) => {
    try {
      await axios.delete(`${API_URL}/auth/space/delete/${spaceId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      });
      setSpace((prevSpaces) => prevSpaces.filter((s) => s._id !== spaceId));
      toast({
        title: "Espace supprimé",
        description: "L'espace a été supprimé avec succès.",
      });
    } catch (error) { 
      console.error("Erreur lors de la suppression de l'espace:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer l'espace. Veuillez réessayer.",
        variant: "destructive",
      });
    }       
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="mb-8 animate-slide-in-from-top">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Dashboard Propriétaire
              </h1>
              <p className="text-gray-600 mt-2 text-lg">
                Gérez vos espaces et réservations
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-500">En ligne</span>
              <a href="/" className="text-sm text-gray-500 cursor-pointer">Accueil</a>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 animate-slide-in-from-left delay-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">
                Revenus
              </CardTitle>
              <div className="p-2 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Activity className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-800">
                Dt {monthlyEarnings.income}
              </div>
              
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-red-50 to-red-100 border-red-200 animate-slide-in-from-left delay-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-700">
                Dépenses
              </CardTitle>
              <div className="p-2 bg-red-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-800">
                Dt {monthlyEarnings.expenses}
              </div>
              <div className="flex items-center mt-2">
                <div className="h-4 w-4 text-red-500 mr-1">▲</div>
                <p className="text-xs text-red-600 font-medium">
                  0% vs mois dernier
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-green-50 to-green-100 border-green-200 animate-slide-in-from-left delay-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">
                Dépenses
              </CardTitle>
              <div className="p-2 bg-green-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-800">
                Dt {monthlyEarnings.spendings}M
              </div>
              <div className="flex items-center mt-2">
                <div className="h-4 w-4 text-green-500 mr-1">▼</div>
                <p className="text-xs text-green-600 font-medium">
                  0% vs mois dernier
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 animate-slide-in-from-left delay-400">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700">
                Total
              </CardTitle>
              <div className="p-2 bg-yellow-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-800">
                Dt {monthlyEarnings.totals}
              </div>
              <div className="flex items-center mt-2">
                <span className="text-xs text-gray-600 font-medium">
                  0% total
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6 animate-fade-in delay-500"
        >
          <TabsList className="bg-white shadow-lg border rounded-xl p-1.5 hover:shadow-xl transition-shadow duration-300">
            <TabsTrigger
              value="spaces"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white transition-all duration-300 rounded-lg px-6"
            >
              Mes Espaces
            </TabsTrigger>
            <TabsTrigger
              value="reservations"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white transition-all duration-300 rounded-lg px-6"
            >
              Réservations
            </TabsTrigger>
            
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-green-500 data-[state=active]:text-white transition-all duration-300 rounded-lg px-6"
            >
              Statistiques
            </TabsTrigger>
          </TabsList>

          <TabsContent value="spaces" className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Gestion des espaces
              </h2>
              <AddSpaceDialog onSpaceAdded={handleSpaceAdded} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {space.map((space, index) => (
                <Card
                  key={space._id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm animate-slide-in-from-bottom"
                  style={{ animationDelay: `Dt{index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg group-hover:text-green-600 transition-colors duration-300">
                        {space.name}
                      </CardTitle>
                      <Badge
                        variant={
                          space.available === true ? "succed" : "secondary"
                        }
                        className="hover:scale-105 transition-transform duration-200"
                      >
                        {space.available === true ? "disponible" : "occupé"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <img className="w-full h-[200px] object-cover rounded-md" src={`http://localhost:5000/uploads/${space.image}`} alt="espace"/>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                        <span className="text-sm">Prix/heure:</span>
                        <span className="font-bold text-green-600">
                          {space.price}Dt
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                      onClick={()=>handleDelete(space._id)}
                        variant="outline"
                        size="sm"
                        className="flex-1 hover:bg-green-50 transition-colors duration-300"
                      >
                        Supprimer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reservations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Réservations en cours</CardTitle>
                <CardDescription>
                  Gérez les réservations de vos espaces
                </CardDescription>
              </CardHeader>
              
            </Card>
          </TabsContent>

          <TabsContent value="earnings" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenus totaux</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {monthlyEarnings.total}Dt
                  </div>
                  <p className="text-sm text-gray-500">Tous les temps</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ce mois-ci</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {monthlyEarnings.thisMonth}Dt
                  </div>
                  <p className="text-sm text-red-500">
                    {monthlyEarnings.growth}% vs mois dernier
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mois dernier</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {monthlyEarnings.lastMonth}Dt
                  </div>
                  <p className="text-sm text-gray-500">Janvier 2024</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Détail des paiements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reservations.map((reservation) => (
                    <div
                      key={reservation.id}
                      className="flex justify-between items-center p-3 border rounded"
                    >
                      <div>
                        <p className="font-medium">{reservation.space}</p>
                        <p className="text-sm text-gray-500">
                          {reservation.date} - {reservation.client}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{reservation.amount}Dt</p>
                        <Badge
                          variant={
                            reservation.status === "confirmed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {reservation.status === "confirmed"
                            ? "Payé"
                            : "En attente"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Statistiques de performance</CardTitle>
                <CardDescription>Analyse de vos espaces</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Performance par espace</h3>
                    {ownerSpaces.map((space) => (
                      <div
                        key={space.id}
                        className="flex justify-between items-center p-3 border rounded"
                      >
                        <div>
                          <p className="font-medium">{space.name}</p>
                          <p className="text-sm text-gray-500">
                            {space.reservations} réservations
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{space.occupancy}%</p>
                          <p className="text-sm text-gray-500">
                            Taux d'occupation
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Tendances</h3>
                    <div className="p-4 border rounded">
                      <p className="font-medium">Meilleur jour de la semaine</p>
                      <p className="text-2xl font-bold"></p>
                      <p className="text-sm text-gray-500">
                        0% des réservations
                      </p>
                    </div>
                    <div className="p-4 border rounded">
                      <p className="font-medium">Durée moyenne</p>
                      <p className="text-2xl font-bold">0h</p>
                      <p className="text-sm text-gray-500">Par réservation</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OwnerDashboard;
