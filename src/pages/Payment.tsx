
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard, Coffee, Calendar, CheckSquare, X } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useLocation, useNavigate } from 'react-router-dom';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const location = useLocation();
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Animation refs
  const [formRef, formVisible] = useIntersectionObserver<HTMLDivElement>();
  const [summaryRef, summaryVisible] = useIntersectionObserver<HTMLDivElement>();
  const [successRef, successVisible] = useIntersectionObserver<HTMLDivElement>();
  
  useEffect(() => {
    // Récupérer les données de réservation du state de navigation
    if (location.state?.bookingDetails) {
      setBookingDetails(location.state.bookingDetails);
    } else {
      // Rediriger vers la page de réservation si aucune donnée n'est disponible
      toast({
        title: "Aucune réservation trouvée",
        description: "Veuillez d'abord effectuer une réservation.",
        variant: "destructive",
      });
      setTimeout(() => {
        navigate('/booking');
      }, 2000);
    }
  }, [location, navigate, toast]);
  
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0; i < match.length; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  // Format expiry date
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 3) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatCardNumber(e.target.value);
    setCardNumber(value);
  };
  
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatExpiry(e.target.value);
    setExpiry(value);
  };
  
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/gi, '');
    if (value.length <= 3) {
      setCvv(value);
    }
  };
  
  const validateForm = () => {
    const cardNumberRegex = /^(\d{4}\s){3}\d{4}$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    
    if (!cardNumberRegex.test(cardNumber)) {
      toast({
        title: "Numéro de carte invalide",
        description: "Veuillez entrer un numéro de carte valide (16 chiffres).",
        variant: "destructive",
      });
      return false;
    }
    
    if (!cardName) {
      toast({
        title: "Nom manquant",
        description: "Veuillez entrer le nom sur la carte.",
        variant: "destructive",
      });
      return false;
    }
    
    if (!expiryRegex.test(expiry)) {
      toast({
        title: "Date d'expiration invalide",
        description: "Veuillez entrer une date d'expiration valide (MM/AA).",
        variant: "destructive",
      });
      return false;
    }
    
    if (cvv.length !== 3) {
      toast({
        title: "CVV invalide",
        description: "Veuillez entrer un code CVV valide (3 chiffres).",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      setPaymentSuccess(true);
      
      // Reset form
      setCardNumber('');
      setCardName('');
      setExpiry('');
      setCvv('');
    }, 2000);
  };
  
  // Calculer le prix total basé sur les détails de réservation
  const calculateTotal = () => {
    if (!bookingDetails) return 349;
    
    const { space, duration } = bookingDetails;
    
    if (!space || !duration) return 349;
    
    if (duration === '8h') {
      return space.pricePerDay;
    } else {
      const hours = parseInt(duration);
      return space.pricePerHour * hours;
    }
  };
  
  const totalAmount = calculateTotal();

  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {paymentSuccess ? (
            <div 
              ref={successRef}
              className={`bg-white p-8 rounded-lg shadow-md text-center 
                ${successVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} 
                transition-all duration-1000 ease-out`}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <CheckSquare className="text-green-500" size={32} />
              </div>
              <h1 className="text-3xl font-bold mb-4 animate-text-reveal">Paiement réussi !</h1>
              <p className="text-gray-600 mb-8 animate-fade-in">
                Votre paiement a été traité avec succès. Vous recevrez une confirmation par email.
              </p>
              <div className="mb-8 hover-scale">
                <div className="border border-gray-200 rounded-md p-6 max-w-sm mx-auto shine-effect">
                  <p className="text-gray-500 mb-2">Montant payé</p>
                  <p className="text-3xl font-bold">{totalAmount},00 Dt</p>
                  <p className="text-gray-500 text-sm mt-2">Référence de transaction : TRX{Math.floor(10000000 + Math.random() * 90000000)}</p>
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <a href="/" className="btn-primary button-hover-effect">
                  Retour à l'accueil
                </a>
                <a href="/booking" className="bg-white border border-coworking-primary text-coworking-primary py-2 px-4 rounded-md hover:bg-blue-50 transition-all button-hover-effect">
                  Faire une nouvelle réservation
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Payment Form Column */}
              <div 
                className={`md:col-span-3 ${formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} transition-all duration-1000 ease-out`}
                ref={formRef}
              >
                <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <h1 className="text-2xl font-bold mb-6 text-gradient">Paiement</h1>
                  
                  {/* Payment Options */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="card" 
                          name="paymentMethod" 
                          checked 
                          className="form-radio h-4 w-4 text-coworking-primary" 
                        />
                        <label htmlFor="card" className="ml-2 block text-gray-700">
                          Carte de crédit
                        </label>
                      </div>
                      
                    </div>
                    <div className="flex space-x-2 hover-scale">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-8 object-contain" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-8 object-contain" />
                 
                    </div>
                  </div>
                  
                  {/* Card Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Card Number */}
                    <div className="group">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-coworking-primary transition-colors">
                        Numéro de carte
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="cardNumber"
                          value={cardNumber}
                          onChange={handleCardNumberChange}
                          maxLength={19}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-coworking-primary focus:border-coworking-primary pl-10 hover:border-coworking-primary transition-colors"
                          required
                        />
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-coworking-primary transition-colors" size={18} />
                      </div>
                    </div>
                    
                    {/* Card Name */}
                    <div className="group">
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-coworking-primary transition-colors">
                        Nom sur la carte
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="JEAN DUPONT"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-coworking-primary focus:border-coworking-primary hover:border-coworking-primary transition-colors"
                        required
                      />
                    </div>
                    
                    {/* Expiry & CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="group">
                        <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-coworking-primary transition-colors">
                          Date d'expiration
                        </label>
                        <input
                          type="text"
                          id="expiry"
                          value={expiry}
                          onChange={handleExpiryChange}
                          placeholder="MM/AA"
                          maxLength={5}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-coworking-primary focus:border-coworking-primary hover:border-coworking-primary transition-colors"
                          required
                        />
                      </div>
                      <div className="group">
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-coworking-primary transition-colors">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          value={cvv}
                          onChange={handleCvvChange}
                          placeholder="123"
                          maxLength={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-coworking-primary focus:border-coworking-primary hover:border-coworking-primary transition-colors"
                          required
                        />
                      </div>
                    </div>
                    
                    {/* Save Card */}
                    <div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="saveCard" 
                          className="form-checkbox h-4 w-4 text-coworking-primary rounded" 
                        />
                        <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700 hover:text-coworking-primary transition-colors">
                          Sauvegarder cette carte pour les prochains paiements
                        </label>
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full btn-primary flex justify-center items-center pulse-animation"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Traitement en cours...
                        </>
                      ) : (
                        `Payer ${totalAmount},00 Dt`
                      )}
                    </button>
                  </form>
                  
                  {/* Security Note */}
                  <div className="mt-6 flex items-center justify-center text-sm text-gray-500 hover-scale">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Paiement sécurisé avec cryptage SSL
                  </div>
                </div>
              </div>
              
              {/* Order Summary Column */}
              <div 
                className={`md:col-span-2 ${summaryVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'} transition-all duration-1000 ease-out`}
                ref={summaryRef}
              >
                <div className="bg-white p-6 rounded-lg shadow-md sticky top-24 hover:shadow-lg transition-all duration-300">
                  <h2 className="text-xl font-bold mb-4 text-gradient">Récapitulatif</h2>
                  
                  <div className="border-b border-gray-200 pb-4 mb-4">
                    {bookingDetails ? (
                      <>
                        <div className="flex items-center mb-4">
                          <div className="bg-coworking-primary bg-opacity-10 p-2 rounded-md mr-3">
                            <Coffee className="text-coworking-primary" size={24} />
                          </div>
                          <div>
                            <h3 className="font-semibold">{bookingDetails.space?.name || "Espace Coworking"}</h3>
                            <p className="text-sm text-gray-600">{bookingDetails.space?.description?.substring(0, 40) + "..." || "Accès à l'espace de coworking"}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-coworking-primary bg-opacity-10 p-2 rounded-md mr-3">
                            <Calendar className="text-coworking-primary" size={24} />
                          </div>
                          <div>
                            <h3 className="font-semibold">Durée</h3>
                            <p className="text-sm text-gray-600">
                              {bookingDetails.duration === '8h' ? 'Journée complète' : `${bookingDetails.duration} heures`}
                            </p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center mb-4">
                          <div className="bg-coworking-primary bg-opacity-10 p-2 rounded-md mr-3">
                            <Coffee className="text-coworking-primary" size={24} />
                          </div>
                          <div>
                            <h3 className="font-semibold">Adhésion Pro</h3>
                            <p className="text-sm text-gray-600">Accès 24/7, salles de réunion & plus</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="bg-coworking-primary bg-opacity-10 p-2 rounded-md mr-3">
                            <Calendar className="text-coworking-primary" size={24} />
                          </div>
                          <div>
                            <h3 className="font-semibold">Durée</h3>
                            <p className="text-sm text-gray-600">1 mois</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sous-total</span>
                      <span>{totalAmount},00 Dt</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">TVA (20%)</span>
                      <span>Incluse</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mb-6">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-gradient">{totalAmount},00 Dt</span>
                    </div>
                  </div>
                  
                  {/* Promo Code */}
                  <div className="mb-6 group">
                    <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 mb-1 group-hover:text-coworking-primary transition-colors">
                      Code promo
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="promoCode"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-coworking-primary focus:border-coworking-primary group-hover:border-coworking-primary transition-colors"
                        placeholder="Entrez votre code"
                      />
                      <button
                        type="button"
                        className="bg-gray-100 text-gray-700 px-4 py-2 rounded-r-md border border-gray-300 border-l-0 hover:bg-gray-200 transition-colors"
                      >
                        Appliquer
                      </button>
                    </div>
                  </div>
                  
                  {/* Cancellation Policy */}
                  <div className="bg-gray-50 p-4 rounded-md text-sm shine-effect">
                    <p className="font-semibold mb-1">Politique d'annulation :</p>
                    <p className="text-gray-600">
                      Vous pouvez annuler votre abonnement à tout moment avec un préavis de 30 jours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
