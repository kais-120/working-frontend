/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar as CalendarIcon, Clock, Users, LayoutGrid, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import axios from "axios";
import { API_URL } from "../API/Api";

interface Space {
  id: string;
  name: string;
  type: string;
  capacity: number;
  pricePerDay: number;
  pricePerHour: number;
  description: string;
  image: string;
  amenities: string[];
}

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [numGuests, setNumGuests] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const storedToken = localStorage.getItem('auth');
      setToken(storedToken);
    }
  , []);
  
  const { toast } = useToast();
  const navigate = useNavigate();

  // Animation refs
  const [heroRef, heroVisible] = useIntersectionObserver<HTMLElement>();
  const [filterRef, filterVisible] = useIntersectionObserver<HTMLElement>();
  const [spaceGridRef, spaceGridVisible] = useIntersectionObserver<HTMLElement>();
  const [formRef, formVisible] = useIntersectionObserver<HTMLElement>();
  const [policiesRef, policiesVisible] = useIntersectionObserver<HTMLElement>();

  // Preload spaces for animation
  useEffect(() => {
    const img = new Image();
    spaces.forEach(space => {
      img.src = space.image;
    });
  }, []);

  const spaces: Space[] = [
    {
      id: "6835d4c2281d742092b25cbf",
      name: "Espace Commun",
      type: "open-space",
      capacity: 15,
      pricePerDay: 15,
      pricePerHour: 3,
      description: "Un espace de travail ouvert et partagé, idéal pour les freelances et les nomades digitaux qui cherchent une ambiance collaborative.",
      image: "img/IMG-20240227-WA0026-12.jpg",
      amenities: ["WiFi haut débit", "Prises électriques", "Café inclus", "Climatisation", "Tables partagées"]
    },
    {
      id: "6835d4c2281d742092b25cbf",
      name: "Salle de Réunion - Small",
      type: "meeting-room",
      capacity: 6,
      pricePerDay: 80,
      pricePerHour: 20,
      description: "Salle de réunion confortable et équipée pour 6 personnes. Parfaite pour les entretiens, les brainstormings ou les petites présentations.",
      image: "img/IMG-20240227-WA0012.jpgf_.jpg",
      amenities: ["WiFi haut débit", "Écran de projection", "Tableau blanc", "Visioconférence", "Eau minérale"]
    },
    
    {
      id: "6835d4c2281d742092b25cbf",
      name: "Bureau Privé - S",
      type: "private-office",
      capacity: 2,
      pricePerDay: 35,
      pricePerHour: 8,
      description: "Bureau fermé pour 1 à 2 personnes, parfait pour la confidentialité et la concentration. Idéal pour la confidentialité et la concentration. Idéal pour les appels vidéo et les entretiens.",
      image: "img/IMG-20240227-WA0011.jpg",
      amenities: ["WiFi haut débit", "Bureau dédié", "Porte verrouillable", "Fenêtre", "Imprimante partagée"]
    },
    {
      id: "6835d4c2281d742092b25cbf",
      name: "Bureau Privé - m",
      type: "private-office",
      capacity: 4,
      pricePerDay: 35,
      pricePerHour: 8,
      description: "Bureau fermé pour 2 à 4 personnes, parfait pour la confidentialité et la concentration. Idéal pour la confidentialité et la concentration. Idéal pour les appels vidéo et les entretiens.",
      image: "img/469399569_122196003398223967_7314290643945878836_n.jpg",
      amenities: ["WiFi haut débit", "Bureau dédié", "Porte verrouillable", "Fenêtre", "Imprimante partagée"]
    },
    
    {
      id: "6835d4c2281d742092b25cbf",
      name: "Espace Événementiel",
      type: "event-space",
      capacity: 30,
      pricePerDay: 250,
      pricePerHour: 60,
      description: "Grand espace modulable pour vos événements professionnels, ateliers ou présentations. Capacité jusqu'à 30 personnes selon la configuration.",
      image: "img/469979390_122196693290223967_571954813380669522_n.jpg",
      amenities: ["WiFi haut débit", "Projecteur", "Système son", "Configurations flexibles", "Espace traiteur"]
    },
    {
  id: "pergola-gazon-2025",
  name: "Pergola avec Gazon",
  type: "outdoor-relax-space",
  capacity: 6,
  pricePerDay: 20,
  pricePerHour: 4,
  description: "Nouveauté chez Djerba Coworking ! Profitez d’un espace extérieur unique sous pergola, entouré de verdure. Un coin convivial et relaxant parfait pour travailler autrement, partager un café, ou laisser les enfants jouer en toute tranquillité. L’endroit idéal pour allier détente, nature et productivité.",
  image: "img/506634069_122245292678223967_4419388014276913923_n.jpg",
  amenities: [
    "WiFi extérieur",
    "Gazon synthétique",
    "Balançoire détente",
    "Espace adapté aux familles",
    "Coin café en plein air",
    "Ambiance naturelle et ombragée"
  ]
}

  ];

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", 
    "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const durations = [
    { value: "1h", label: "1 heure" },
    { value: "2h", label: "2 heures" },
    { value: "4h", label: "Demi-journée (4h)" },
    { value: "8h", label: "Journée complète (8h)" }
  ];

  const spaceTypes = [
    { value: "all", label: "Tous les espaces" },
    { value: "open-space", label: "Espace commun" },
    { value: "private-office", label: "Bureau privé" },
    { value: "meeting-room", label: "Salle de réunion" },
    { value: "event-space", label: "Espace événementiel" }
  ];

  const filteredSpaces = selectedType && selectedType !== "all" 
    ? spaces.filter(space => space.type === selectedType)
    : spaces;

  const handleSpaceSelection = (space: Space) => {
    setSelectedSpace(space);
    window.scrollTo({ top: document.getElementById('booking-form')?.offsetTop, behavior: 'smooth' });
  };

  const calculateTotalPrice = () => {
    if (!selectedSpace || !selectedDuration) return 0;

    if (selectedDuration === "8h") {
      return selectedSpace.pricePerDay;
    } else {
      const hours = parseInt(selectedDuration);
      return selectedSpace.pricePerHour * hours;
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !selectedDuration || !selectedSpace) {
      toast({
        title: "Information manquante",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Préparer les détails de la réservation pour la page de paiement
    const bookingDetails = {
      space: selectedSpace,
      date: selectedDate,
      time: selectedTime,
      duration: selectedDuration,
      guests: numGuests,
      totalPrice: calculateTotalPrice()
    };
      await axios.post(`${API_URL}/auth/booking/add`,{
        spaceId:bookingDetails.space.id,
        date:bookingDetails.date,
        Nombre_personnes:bookingDetails.guests,
      },
      {
        headers :{
        Authorization: `Bearer ${window.localStorage.getItem("auth")}`,
      }}
      )
      .then((response)=>console.log(response))
      .catch((err)=>console.error(err))
      
    
    // Simuler un traitement de la réservation et passer à la page de paiement
    setTimeout(() => {
      toast({
        title: "Réservation préparée",
        description: `Votre réservation pour ${selectedSpace.name} le ${format(selectedDate, 'dd/MM/yyyy')} à ${selectedTime} est prête. Passez au paiement.`,
      });
      setIsSubmitting(false);
      
      // Naviguer vers la page de paiement avec les détails de la réservation
      navigate('/payment', { state: { bookingDetails } });
    }, 1500);
  };

  return (
    <div>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className={`bg-gradient-to-r from-coworking-primary to-blue-700 text-white py-20 
          ${heroVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000 ease-out`}
      >
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-text-reveal">Réservation d'espace</h1>
          <p className="text-xl text-blue-100 max-w-2xl animate-fade-in">
            Réservez l'espace qui correspond à vos besoins, quand vous en avez besoin.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section 
        ref={filterRef}
        className={`py-8 bg-gray-50 
          ${filterVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} 
          transition-all duration-700 ease-out`}
      >
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gradient">Nos espaces disponibles</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {spaceTypes.map(type => (
                <button
                  key={type.value}
                  className={`px-4 py-2 rounded-full text-sm font-medium button-hover-effect ${
                    selectedType === type.value 
                      ? 'bg-coworking-primary text-white' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedType(type.value)}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Spaces Grid */}
      <section 
        ref={spaceGridRef}
        className={`py-12 
          ${spaceGridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} 
          transition-all duration-1000 ease-out`}
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSpaces.map((space, index) => (
              <div 
                key={space.id} 
                className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 hover:-translate-y-2
                  opacity-0 animate-[fade-in_0.6s_ease-out_forwards]`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={space.image} 
                    alt={space.name} 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                  />
                  
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gradient">{space.name}</h3>
                  
                  <div className="flex items-center mb-3 text-gray-600 text-sm">
                    <Users size={16} className="mr-1" />
                    <span>Capacité: {space.capacity} personnes</span>
                    <span className="mx-2">|</span>
                    <LayoutGrid size={16} className="mr-1" />
                    <span className="capitalize">{space.type.replace('-', ' ')}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {space.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {space.amenities.slice(0, 3).map((amenity, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        {amenity}
                      </span>
                    ))}
                    {space.amenities.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full hover:bg-gray-200 transition-colors">
                        +{space.amenities.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <button
                    className="w-full btn-primary group relative overflow-hidden"
                    onClick={() => handleSpaceSelection(space)}
                  >
                    <button disabled={!token} className="relative z-10">
                      <span className='flex items-center justify-center'>
                        Réserver <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" size={18} />
                    </span>
                    </button>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
     
      <section 
        id="booking-form" 
        ref={formRef}
        className={`py-16 bg-gray-50 
          ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} 
          transition-all duration-1000 ease-out`}
      >
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-gradient">Réserver votre espace</h2>
              <p className="text-gray-600">
                Complétez le formulaire ci-dessous pour finaliser votre réservation.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
              <form onSubmit={handleSubmit}>
                {/* Selected Space */}
                <div className="mb-6 group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-coworking-primary transition-colors">
                    Espace sélectionné
                  </label>
                  
                  {selectedSpace ? (
                    <div className="flex items-start p-4 border border-gray-200 rounded-md bg-gray-50 hover:border-coworking-primary transition-colors shine-effect">
                      <img 
                        src={selectedSpace.image} 
                        alt={selectedSpace.name}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-gradient">{selectedSpace.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {selectedSpace.pricePerDay}Dt/jour ou {selectedSpace.pricePerHour}Dt/heure
                        </p>
                        <button
                          type="button"
                          className="text-coworking-primary text-sm font-medium mt-2 hover:underline"
                          onClick={() => setSelectedSpace(null)}
                        >
                          Changer d'espace
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 border border-dashed border-gray-300 rounded-md bg-gray-50 text-center group-hover:border-coworking-primary transition-colors">
                      <p className="text-gray-500">
                        Veuillez sélectionner un espace dans la liste ci-dessus
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Date Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Date */}
<div className="group relative z-10"> {/* z-10 pour garantir une bonne superposition */}
  <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-coworking-primary transition-colors">
    Date *
  </label>
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={cn(
          "w-full justify-start text-left font-normal border-gray-300 group-hover:border-coworking-primary transition-colors",
          !selectedDate && "text-gray-500"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {selectedDate ? (
          format(selectedDate, "dd MMMM yyyy", { locale: fr })
        ) : (
          <span>Sélectionnez une date</span>
        )}
      </Button>
    </PopoverTrigger>
    <PopoverContent
      className="w-auto p-0 pointer-events-auto z-50 bg-white shadow-lg border rounded-md"
      align="start"
    >
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        disabled={(date) => date < new Date()}
        initialFocus
        locale={fr}
        className="p-3"
      />
    </PopoverContent>
  </Popover>
</div>

                  
                  {/* Time */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-coworking-primary transition-colors">
                      Heure d'arrivée *
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          className={`py-2 px-2 text-sm rounded-md button-hover-effect ${
                            selectedTime === time
                              ? "bg-coworking-primary text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Duration & Guests Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Duration */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-coworking-primary transition-colors">
                      Durée *
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {durations.map((duration) => (
                        <button
                          key={duration.value}
                          type="button"
                          className={`py-2 px-4 text-sm rounded-md button-hover-effect ${
                            selectedDuration === duration.value
                              ? "bg-coworking-primary text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          onClick={() => setSelectedDuration(duration.value)}
                        >
                          {duration.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Number of Guests */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-coworking-primary transition-colors">
                      Nombre de personnes
                    </label>
                    <div className="flex border border-gray-300 rounded-md group-hover:border-coworking-primary transition-colors">
                      <button
                        type="button"
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                        onClick={() => setNumGuests(Math.max(1, numGuests - 1))}
                      >
                        -
                      </button>
                      <span className="flex-1 text-center py-2">{numGuests}</span>
                      <button
                        type="button"
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                        onClick={() => {
                          const maxCapacity = selectedSpace?.capacity || 20;
                          setNumGuests(Math.min(maxCapacity, numGuests + 1));
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Additional Notes */}
                <div className="mb-6 group">
                  <label className="block text-sm font-medium text-gray-700 mb-2 group-hover:text-coworking-primary transition-colors">
                    Remarques additionnelles
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-coworking-primary focus:border-coworking-primary group-hover:border-coworking-primary transition-colors"
                    rows={3}
                    placeholder="Besoins spécifiques, équipements..."
                  ></textarea>
                </div>
                
                {/* Summary */}
                {selectedSpace && selectedDuration && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-md hover-scale shine-effect">
                    <h4 className="font-semibold mb-2 text-gradient">Récapitulatif</h4>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">{selectedSpace.name}</span>
                      <span>{calculateTotalPrice()}Dt</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>
                        {selectedDuration === "8h" ? "Journée complète" : `${selectedDuration}`}
                      </span>
                      <span>
                        {numGuests} personne{numGuests > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="border-t border-gray-300 mt-2 pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-gradient">{calculateTotalPrice()}Dt</span>
                    </div>
                  </div>
                )}
                
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full btn-primary flex justify-center items-center pulse-animation"
                  disabled={!selectedSpace || !selectedDate || !selectedTime || !selectedDuration || isSubmitting}
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
                    'Procéder au paiement'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section 
        ref={policiesRef}
        className={`py-16 
          ${policiesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} 
          transition-all duration-1000 ease-out`}
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gradient">Nos conditions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tout ce que vous devez savoir sur nos politiques de réservation et d'annulation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-xl font-bold mb-3 text-gradient">Politique de réservation</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center"><span className="mr-2 bg-coworking-primary bg-opacity-10 text-coworking-primary rounded-full p-1">•</span> Réservation possible jusqu'à 30 minutes avant l'heure souhaitée.</li>
                <li className="flex items-center"><span className="mr-2 bg-coworking-primary bg-opacity-10 text-coworking-primary rounded-full p-1">•</span> Paiement requis pour confirmer la réservation.</li>
                <li className="flex items-center"><span className="mr-2 bg-coworking-primary bg-opacity-10 text-coworking-primary rounded-full p-1">•</span> Arrivée possible 15 minutes avant l'heure réservée.</li>
                <li className="flex items-center"><span className="mr-2 bg-coworking-primary bg-opacity-10 text-coworking-primary rounded-full p-1">•</span> Présentation d'une pièce d'identité requise lors de la première visite.</li>
              </ul>
            </div>
            
            
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
              <h3 className="text-xl font-bold mb-3 text-gradient">À savoir</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center"><span className="mr-2 bg-coworking-primary bg-opacity-10 text-coworking-primary rounded-full p-1">•</span> Wifi haut débit inclus dans toutes les réservations.</li>
                <li className="flex items-center"><span className="mr-2 bg-coworking-primary bg-opacity-10 text-coworking-primary rounded-full p-1">•</span> Café et thé offerts à tous les utilisateurs.</li>
                <li className="flex items-center"><span className="mr-2 bg-coworking-primary bg-opacity-10 text-coworking-primary rounded-full p-1">•</span> Possibilité de prolonger sur place selon disponibilité.</li>
                <li className="flex items-center"><span className="mr-2 bg-coworking-primary bg-opacity-10 text-coworking-primary rounded-full p-1">•</span> Services supplémentaires disponibles sur demande.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
     
    </div>
  );
};

export default Booking;
