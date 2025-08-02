import { Calendar, CheckCircle, CreditCard, DollarSign, Home } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AxiosToken } from '../API/Api';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const [paymentDetails,setPaymentDetails] = useState([])
  const [isLoading,setIsLoading] = useState(true)
  const navigate = useNavigate()
  const search = window.location.search;
  const ref = (search.substring((search.indexOf("=")) + 1))
  useEffect(()=>{
    try{
      AxiosToken.put("/payment/verify",{
        payment_id:ref
      }).then((response)=>setPaymentDetails(response.data.data))
    }catch{
      navigate("/",{replace:true})
    }
    finally{
      setIsLoading(false)
    }
  },[ref])
console.log(paymentDetails)
  if(isLoading){
    return "loading ..."
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-500 hover:scale-105">
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Paiement Réussi !</h1>
          <p className="text-gray-600 mb-8">Votre transaction a été traitée avec succès.</p>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Détails de la Transaction</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-gray-600">Montant</span>
                </div>
                <span className="font-semibold text-gray-900">{((paymentDetails.amount)/1000).toFixed(3)} TND</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-gray-600">Date</span>
                </div>
                <span className="font-semibold text-gray-900">{new Date(paymentDetails.createdAt).toLocaleDateString("fr")}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-gray-600">Méthode</span>
                </div>
              <span className="font-semibold text-gray-900">{paymentDetails?.transactions?.[0]?.extSenderInfo?.pan}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">ID Transaction</span>
                <span className="font-mono text-sm text-gray-900 bg-gray-200 px-2 py-1 rounded">
                  {paymentDetails.id}
                </span>
              </div>          
            </div>
          </div>
          
          <button
          onClick={()=>navigate("/")}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" />
            Retour à l'Accueil
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess