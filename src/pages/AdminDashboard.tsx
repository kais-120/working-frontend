import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  TrendingUp, 
  Euro,
  Clock,
  Award,
  Activity
} from 'lucide-react';
import { AxiosToken } from "../API/Api";

const AdminDashboard = () => {
  const [stats, setStats] = useState();
  const [loading, setLoading] = useState(true);

  // Analytics data
  const [topMemberships, setTopMemberships] = useState([]);
  const [latestBookings, setLatestBookings] = useState([]);
  const [revenueAnalysis, setRevenueAnalysis] = useState([]);
  const [quickStatistics, setQuickStatistics] = useState([]);

  useEffect(() => {
    AxiosToken.get("/dashboard/overall")
      .then(response => {
        setStats(response.data)
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });
  }
  , []);
  useEffect(() => {
    AxiosToken.get("/dashboard/quick_statistics")
      .then(response => {
        setQuickStatistics(response.data)
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });
  }
  , []);
  useEffect(() => {
    AxiosToken.get("/dashboard/calculate_revenue")
      .then(response => {
        setRevenueAnalysis(response.data)
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });
  }
  , []);
  useEffect(() => {
    AxiosToken.get("/dashboard/membership_stats")
      .then(response => {
        setTopMemberships(response.data)
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });
  }
  , []);
  useEffect(() => {
    AxiosToken.get("/dashboard/last_booking")
      .then(response => {
        setLatestBookings(response.data)
      })
      .catch(error => {
        console.error('Error fetching stats:', error);
      });
  }
  , []);

  useEffect(() => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status) => {
    const colors = {
      accept: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      refuse: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={colors[status] || colors.pending}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getMembershipColor = (membership) => {
    const colors = {
      Premium: 'bg-purple-100 text-purple-800 border-purple-200',
      Standard: 'bg-blue-100 text-blue-800 border-blue-200',
      Basic: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[membership] || colors.Basic;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord - Analytics</h1>
          <p className="text-gray-600">Analyse des données de réservation et performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Utilisateurs</CardTitle>
              <div className="p-2 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Users className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-800">{stats?.user?.totalUsers}</div>
              {stats?.user?.userPercentageGrowth &&
                <p className="text-xs text-blue-600 mt-1">+{stats?.user?.userPercentageGrowth}% ce mois</p>
              }
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Total Réservations</CardTitle>
              <div className="p-2 bg-green-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-800">{stats?.booking?.totalBookings}</div>
              {
                stats?.booking.bookingPercentageGrowth &&
              <p className="text-xs text-green-600 mt-1">+{stats?.booking.bookingPercentageGrowth}% ce mois</p>
              }
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-700">Revenus Totaux</CardTitle>
              <div className="p-2 bg-yellow-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Euro className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-800">{(stats?.payment?.totalValue / 1000).toFixed(1)} TND</div>
              {
                stats?.payment.paymentPercentageGrowth &&
              <p className="text-xs text-green-600 mt-1">+{stats?.payment.paymentPercentageGrowth}% ce mois</p>
              }
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Équipe Admin</CardTitle>
              <div className="p-2 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Activity className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-800">{stats?.totalAdmin}</div>
              <p className="text-xs text-purple-600 mt-1">Membres actifs</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Analysis & Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Analyse des Revenus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Cette semaine</p>
                      <p className="text-2xl font-bold text-green-600">{(revenueAnalysis?.week?.total)/1000} TND</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-800">
                        {revenueAnalysis?.week?.growth ? `${revenueAnalysis?.week?.growth}+%`  : "--"}
                      </Badge>
                    </div>
                  </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Cette mois</p>
                      <p className="text-2xl font-bold text-green-600">{(revenueAnalysis?.month?.total)/1000} TND</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-800">
                        {revenueAnalysis?.month?.growth ? `${revenueAnalysis?.month?.growth}+%`  : "--"}
                      </Badge>
                    </div>
                  </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Ce trimestre</p>
                      <p className="text-2xl font-bold text-green-600">{(revenueAnalysis?.quarter?.total)/1000} TND</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-800">
                        {revenueAnalysis?.quarter?.growth ? `${revenueAnalysis?.quarter?.growth}+%`  : "--"}
                      </Badge>
                    </div>
                  </div>
                   
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                Statistiques Rapides
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Award className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="font-medium">Membership le plus populaire</p>
                      <p className="text-sm text-gray-600">{quickStatistics?.bookingCounts?.[0]?.membership}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Euro className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="font-medium">Revenue moyen par réservation</p>
                      <p className="text-sm text-gray-600">{(quickStatistics?.revenue)/1000} TND</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-8 w-8 text-yellow-600" />
                    <div>
                      <p className="font-medium">Croissance mensuelle</p>
                      <p className="text-sm text-gray-600">{quickStatistics?.paymentGrowth ? `+${quickStatistics?.paymentGrowth}+% ce mois` : "--"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Memberships */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Analyse des Memberships
            </CardTitle>
            <CardDescription>Performance des différents types de membership</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topMemberships.map((membership, index) => (
                <div key={index} className="p-6 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full ${index === 0 ? "bg-gradient-to-r from-purple-500 to-purple-600" : index === 1 ? "bg-gradient-to-r from-blue-500 to-blue-600" : "bg-gradient-to-r from-green-500 to-green-600"} flex items-center justify-center`}>
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{membership.membership}</h3>
                        <p className="text-gray-600">{membership.users} utilisateurs</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-lg font-bold">
                      {membership.percent}%
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Revenus</p>
                      <p className="text-xl font-bold text-green-600">{(membership.revenue)/1000} TND</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Moyenne</p>
                      <p className="text-xl font-bold text-blue-600">{(membership.average)/1000} TND</p>
                    </div>
                  </div>
                  
                  {/* Progress bar */}
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${index === 0 ? "bg-gradient-to-r from-purple-500 to-purple-600" : index === 1 ? "bg-gradient-to-r from-blue-500 to-blue-600" : "bg-gradient-to-r from-green-500 to-green-600"}`}
                      style={{ width: `${membership.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Latest Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Dernières Réservations
            </CardTitle>
            <CardDescription>Activité récente des réservations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {latestBookings.map((booking) => (
               <div
  key={booking.id}
  className="flex flex-col md:flex-row justify-between md:p-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors gap-4"
>
  {/* Left side: User + Membership */}
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
      <Users className="h-6 w-6 text-white" />
    </div>
    <div>
      <h3 className="font-semibold text-gray-900">
        {booking.users.name + " " + booking.users.last_name}
      </h3>
      <div className="flex items-center gap-2 mt-1">
        <Badge className={getMembershipColor(booking.membership)}>
          {booking.membership}
        </Badge>
      </div>
    </div>
  </div>

  {/* Right side: Booking info */}
  <div className="text-left md:text-right">
    <div className="flex flex-wrap items-center gap-2 mb-2">
      <Calendar className="h-4 w-4 text-gray-500" />
      <span className="text-sm text-gray-600">{booking.date_start}</span>
      <Clock className="h-4 w-4 text-gray-500 ml-2" />
      <span className="text-sm text-gray-600">{booking.time_start}</span>
    </div>
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-lg font-bold text-green-600">
        {booking.price} TND
      </span>
      {getStatusBadge(booking.status)}
    </div>
  </div>
</div>

              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;