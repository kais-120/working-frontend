import { useEffect, useState } from 'react';
import { QrCode, Calendar, Clock, User, CreditCard, CheckCircle, AlertCircle, Camera } from 'lucide-react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { AxiosToken } from "../../API/Api"


// Mock Scanner Component


 

const Button = ({ children, onClick, variant = "primary" }) => {
  const baseClasses = "px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const VerifyPayment = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [error, setError] = useState(false);
  const [payment, setPayment] = useState(null);
  const [reference, setReference] = useState("");

  const handleScan = (result) => {
    if (result) {
      setError(false);
      setShowScanner(false);
      setReference(result[0].rawValue)
    } else {
      setError(true);
      setPayment(null);
    }
  };useEffect(() => {
  if (!reference) return;

  AxiosToken.post("/payment/verify/payment",
     { references: reference }
  )
    .then((response) => setPayment(response.data))
    .catch(() => setError(true));
}, [reference]);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: 'TND'
    }).format(amount / 1000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'failed': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen animate-fade-in delay-100">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h1 className="text-2xl font-bold text-center">Vérification de Paiement</h1>
          <p className="text-center text-blue-100 mt-2">Scannez le code QR pour vérifier votre paiement</p>
        </div>

        {/* Scanner Button */}
        <div className="p-6">
          <div className="flex mb-4 justify-center">
            <Button onClick={() => setShowScanner(prev => !prev)}>
              <QrCode className="me-2"/>
              {showScanner ? 'Fermer Scanner' : 'Scanner Code QR'}
            </Button>
          </div>

          {/* Scanner */}
          {showScanner && <Scanner onScan={handleScan} />}

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700 font-medium">Cette référence n'est pas valide</span>
              </div>
            </div>
          )}

          {/* Payment Details */}
          {payment && (
            <div className="mt-6 space-y-6">
              {/* Payment Status */}
              <div className="text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full border ${getStatusColor(payment[0].status)}`}>
                  {getStatusIcon(payment[0].status)}
                  <span className="ml-2 font-medium capitalize">{payment[0].status === 'pending' ? 'En attente' : payment[0].status}</span>
                </div>
              </div>

              {/* Amount */}
              <div className="text-center">
                <p className="text-gray-600 text-sm">Montant</p>
                <p className="text-3xl font-bold text-gray-900">{formatAmount(payment[0].amount)}</p>
              </div>

              {/* Payment Reference */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Référence:</span>
                  <span className="font-mono text-sm bg-white px-2 py-1 rounded border">
                    {payment[0].references}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">date de paiment:</span>
                  <span className="font-mono text-sm bg-white px-2 py-1 rounded border">
                    {formatDate(payment[0].payment_date)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">temp de paiment:</span>
                  <span className="font-mono text-sm bg-white px-2 py-1 rounded border">
                    {formatTime(payment[0].payment_date)}
                  </span>
                </div>
              </div>

              {/* User Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Informations Client
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Nom complet</p>
                    <p className="font-medium">{payment[0].bookingPayment.users.name} {payment[0].bookingPayment.users.last_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Email</p>
                    <p className="font-medium">{payment[0].bookingPayment.users.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Téléphone</p>
                    <p className="font-medium">{payment[0].bookingPayment.users.phone}</p>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Détails de la Réservation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-sm">Date de début</p>
                    <p className="font-medium">{formatDate(payment[0].bookingPayment.date_start)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Heure</p>
                    <p className="font-medium">{payment[0].bookingPayment.time_start}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Durée</p>
                    <p className="font-medium capitalize">{payment[0].bookingPayment.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Date de paiement</p>
                    <p className="font-medium">{formatDate(payment[0].payment_date)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Type d'abonnement</p>
                    <p className="font-medium">{payment[0].bookingPayment.membership}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t pt-6 flex gap-4">
                <Button variant="secondary" onClick={() => {setPayment(null); setError(false);}}>
                  Nouvelle Vérification
                </Button>
                <Button onClick={() => window.print()}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Imprimer Reçu
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyPayment