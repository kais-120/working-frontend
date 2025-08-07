import { Home, RefreshCw, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Axios } from '../API/Api';
import { useNavigate } from 'react-router-dom';

const PaymentDenied = () => {
  const navigate = useNavigate()
    const search = window.location.search;
      const [isLoading,setIsLoading] = useState(true)
    const ref = (search.substring((search.indexOf("=")) + 1))
  useEffect(()=>{
      try{
        Axios.put("/payment/verify",{
          payment_id:ref
        })
      }catch{
       console.error("error")
      }
      finally{
        setIsLoading(false)
      }
    },[ref]);
    const handleReSend = async () => {
      if(!ref){
       navigate("/",{replace:true})
      }
      try{
        const response = await Axios.post(`/payment/send/payment/${ref}`);
        window.location.href = response.data.payUrl
      }catch{
        console.error("error")
      }
    }
     if(isLoading){
    return "loading ..."
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-500 hover:scale-105">
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Paiement Refusé</h1>
          <p className="text-gray-600 mb-6">Nous n'avons pas pu traiter votre paiement pour le moment.</p> 
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Ce que vous pouvez faire :</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Vérifiez les détails de votre carte et réessayez</li>
              <li>• Assurez-vous d'avoir des fonds suffisants</li>
              <li>• Essayez une autre méthode de paiement</li>
              <li>• Contactez votre banque si le problème persiste</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center"
            onClick={handleReSend}
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Réessayer
            </button>
            
            <button
            onClick={()=>navigate("/",{replace:true})}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center"
            >
              <Home className="w-5 h-5 mr-2" />
              Retour à l'Accueil
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentDenied