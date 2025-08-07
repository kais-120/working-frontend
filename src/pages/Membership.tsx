
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, X, ArrowRight, Clock, Wifi, Coffee, Users } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import MembershipDialog from '@/components/MembershipDialog';
import MembershipDialogCustom from '@/components/MembershipDialogCustom';
import { useUser } from '@/hooks/useUser';

const PricingCard = ({ title, price, period, features, notIncluded, popular = false, buttonText = "S'abonner" }) => {
  const [cardRef, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });
  const [open,setOpen] = useState(false)
  const [membership,setMembership] = useState([])
  const navigate = useNavigate()

  const {auth} = useUser()
  return (
   <div 
  ref={cardRef} 
  className={`bg-white h-full rounded-lg shadow-lg overflow-hidden transition-all duration-500 flex flex-col ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
  } ${popular ? 'ring-2 ring-coworking-primary transform hover:scale-105' : 'hover:scale-102'}`}
>
  {popular && (
    <div className="bg-coworking-primary text-white text-center py-2 font-medium shine-effect">
      Recommandé
    </div>
  )}
  {
    title === "Personnalisé" ?
    <MembershipDialogCustom selectedPlanType={buttonText} open={open} onOpenChange={setOpen} membership={{ title, price }} />
    :
    <MembershipDialog selectedPlanType={buttonText} open={open} onOpenChange={setOpen} membership={{ title, price }} />
  }

  <div className="p-6 flex flex-col flex-grow">
    <div>
      <h3 className="text-2xl font-bold mb-2 hover:text-gradient transition-colors">{title}</h3>

      <div className="mb-4">
        {title !== "Personnalisé" ? (
          <>
            <span className="text-4xl font-bold float-animation inline-block">
              {period === "jour" ? price[1]?.day : price}Dt
            </span>
            <span className="text-gray-600">/{period}</span>
          </>
        ) : (
          <p className="text-sm text-gray-500 italic mb-2">
            Choisissez les fonctionnalités selon vos besoins
          </p>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4 mb-6">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-start animate-text-reveal cursor-default"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Check
                className="text-coworking-secondary mr-2 flex-shrink-0 mt-1 pulse-animation"
                size={18}
              />
              <span>{feature}</span>
            </li>
          ))}

          {notIncluded &&
            notIncluded.map((feature, index) => (
              <li
                key={index}
                className="flex items-start text-gray-400 animate-text-reveal"
                style={{ animationDelay: `${(features.length + index) * 100}ms` }}
              >
                <X
                  className="text-gray-400 mr-2 flex-shrink-0 mt-1"
                  size={18}
                />
                <span>{feature}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>

    <Button
      onClick={() => {
        if(auth){
          setOpen(true);
          setMembership(title);
        }
        else{
          navigate("/login")
        }
      }}
      className={`mt-auto block text-center py-2 px-4 rounded-md font-medium w-full button-hover-effect cursor-pointer ${
        popular
          ? 'bg-coworking-primary text-white hover:bg-blue-600'
          : 'bg-coworking-secondary text-white hover:bg-green-600'
      } transition-colors`}
      asChild
    >
      <span>{buttonText}</span>
    </Button>
  </div>
</div>

  );
};

const Membership = () => {
  const [isMonthly, setIsMonthly] = useState(false);
  
  // Animation refs and state
  const [heroRef, heroVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });
  const [pricingToggleRef, pricingToggleVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });
  const [featuresRef, featuresVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });
  const [comparisonRef, comparisonVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });
  const [faqRef, faqVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });
  const [ctaRef, ctaVisible] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });

  // Toggle handler with animation effect
  const handleToggleChange = (checked) => {
    setIsMonthly(checked);
    toast({
      title: `Mode ${checked ? "mensuel" : "journalier"}`,
      description: `Vous consultez maintenant les tarifs ${checked ? "mensuels" : "journaliers"}`,
      variant: "default",
    });
  };

  // Daily pricing plans
  const dailyAbonnéPlan = {
    title: "Abonné",
    price: [{"hour":4},{"day":25},{"week":100}],
    period: "jour",
    features: [
      "Connexion fibre haut débit",
      "Siège confort",
      "Vue sur mer",
      "Ecrans HD",
      "Imprimante laser",
      "1 Snack & Boisson / Jour",
      "Prix dégressifs à la semaine et au mois"
    ],
    notIncluded: [
      
    ]
  };

  const dailyPrivatifPlan = {
    title: "Privatif",
    price: [{"hour":10},{"day":50},{"week":200}],
    period: "jour",
    features: [
      "Connexion fibre haut débit",
      "Siège confort",
      "Vue sur mer",
      "Ecrans HD",
      "Imprimante laser",
      "Snack & Boisson / Personne",
      "Prix dégressifs à la semaine et au mois",
      "Bureau privatif"
    ],
    notIncluded: [
      
    ]
  };

  const dailyNomadePlan = {
    title: "Nomade",
    price: [{"hour":5},{"day":35},{"week":120}],
    period: "jour",
    features: [
      "Connexion fibre haut débit",
      "Siège comfort",
      "Vue sur mer",
      "Ecran HD",
      "Imprimante laser",
      "Snack & Boisson de bienvenue"
    ],
    notIncluded: [
      
    ]
  };


  // Monthly pricing plans based on the image
  const NomadePlan = {
    title: "Nomade",
    price: 350,
    period: "mois",
    features: [
      "Connexion fibre haut débit",
      "Siège confort",
      "Ecrans HD",
      "Imprimante laser",
      "Snack & Boisson de bienvenue",
      "Prix dégressif à la semaine"
    ],
    notIncluded: [
     
    ]
  };

  const AbonnéPlan = {
    title: "Abonné",
    price: 300,
    period: "mois",
    features: [
      "Connexion fibre haut débit",
      "Siège confort",
      "Vue sur mer",
      "Ecrans HD",
      "Imprimante laser",
      "1 Snack & Boisson / Jour",
      "Prix dégressifs à la semaine et au mois"
     
    ],
    notIncluded: [
      
    ]
  };

  const privatifPlan = {
    title: "Privatif",
    price: 580,
    period: "mois",
    features: [
      "Connexion fibre haut débit",
      "Siège confort",
      "Vue sur mer",
      "Ecrans HD",
      "Imprimante laser",
      "Snack & Boisson / Personne",
      "Prix dégressifs à la semaine et au mois",
      "Bureau privatif"
    ],
    notIncluded: []
  };
  const CustomPlan = {
    title: "Personnalisé",
    price: null,
    period: null,
     features: [
  "Accès complet à tous les équipements",
  "Bureau dédié ou insonorisé",
  "Snacks & boissons inclus",
  "Accès salle de réunion & événements",
  "Services administratifs disponibles",
  "Création société sur demande"
  ],
    notIncluded: []
  };

  // Choose which plans to display based on toggle state
  const plansToDisplay = isMonthly ? 
    [AbonnéPlan,NomadePlan, privatifPlan,CustomPlan] : 
    [dailyAbonnéPlan, dailyPrivatifPlan, dailyNomadePlan,CustomPlan ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className={`bg-gradient-to-r from-coworking-primary to-blue-700 text-white py-20 transition-all duration-700 ${
          heroVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-glow">Nos formules d'adhésion</h1>
          <p className="text-xl text-blue-100 max-w-2xl animate-text-reveal">
            Des plans flexibles conçus pour s'adapter à vos besoins, que vous soyez indépendant, startup ou équipe établie.
          </p>
        </div>
      </section>

      {/* Pricing Toggle Section */}
      <section ref={pricingToggleRef} className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className={`max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm flex flex-col items-center transition-all duration-700 ${
            pricingToggleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            <h2 className="text-2xl font-bold mb-6 text-center text-gradient">Choisissez votre formule</h2>
            
            <div className="flex items-center justify-center gap-6 mb-2">
              <span className={`font-medium ${!isMonthly ? 'text-coworking-primary' : 'text-gray-500'} transition-colors duration-300`}>
                Par jour
              </span>
              
              <div className="flex items-center relative shine-effect">
                <Switch 
                  checked={isMonthly} 
                  onCheckedChange={handleToggleChange}
                  className={`transition-all duration-300 ${isMonthly ? "bg-coworking-primary" : "bg-gray-300"}`}
                />
              </div>
              
              <span className={`font-medium ${isMonthly ? 'text-coworking-primary' : 'text-gray-500'} transition-colors duration-300`}>
                Par mois
              </span>
            </div>
            
            {isMonthly && (
              <div className="flex items-center mt-2 text-sm text-green-600 animate-text-reveal">
                <span className="inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 pulse-animation" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Économisez 25% avec un abonnement mensuel
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-on-scroll" 
               ref={useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 })[0]}
               style={{animationDelay: "200ms"}}>
            <h2 className="text-3xl font-bold mb-4 text-gradient">
              Nos formules {isMonthly ? 'mensuelles' : 'journalières'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {isMonthly 
                ? "Profitez de tarifs préférentiels et de services supplémentaires avec nos formules mensuelles."
                : "Flexibilité maximale avec nos formules journalières, idéales pour les besoins ponctuels."}
            </p>
          </div>
          
          <div className={`grid grid-cols-1 ${isMonthly ? 'md:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-4'} gap-8 transition-all duration-500  items-stretch`}>
            {plansToDisplay.map((plan, index) => (
              <PricingCard 
                key={index} 
                {...plan} 
                popular={isMonthly ? index === 1 : index === 2}
                buttonText={isMonthly ? "S'abonner" : "Réserver"} 
              />
            ))}
          </div>
        
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={featuresRef}
        className={`py-16 bg-gray-50 transition-all duration-700 ${
          featuresVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gradient">Tout ce qui est inclus</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez les services et avantages disponibles avec chaque adhésion.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="text-coworking-primary mb-4 float-animation">
                <Wifi size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2 hover:text-gradient transition-colors">Infrastructure Moderne</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start animate-text-reveal" style={{ animationDelay: "100ms" }}>
                  <Check className="text-coworking-secondary mr-2 flex-shrink-0 mt-1 pulse-animation" size={16} />
                  <span>Wifi ultra-rapide </span>
                </li>
                <li className="flex items-start animate-text-reveal" style={{ animationDelay: "200ms" }}>
                  <Check className="text-coworking-secondary mr-2 flex-shrink-0 mt-1 pulse-animation" size={16} />
                  <span>Prises électriques abondantes</span>
                </li>
                <li className="flex items-start animate-text-reveal" style={{ animationDelay: "300ms" }}>
                  <Check className="text-coworking-secondary mr-2 flex-shrink-0 mt-1 pulse-animation" size={16} />
                  <span>Espaces de travail ergonomiques</span>
                </li>
                <li className="flex items-start animate-text-reveal" style={{ animationDelay: "400ms" }}>
                  <Check className="text-coworking-secondary mr-2 flex-shrink-0 mt-1 pulse-animation" size={16} />
                  <span>Salles de réunion équipées</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="text-coworking-secondary mb-4 float-animation">
                <Coffee size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2 hover:text-gradient transition-colors">Confort et Services</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start animate-text-reveal" style={{ animationDelay: "150ms" }}>
                  <Check className="text-coworking-secondary mr-2 flex-shrink-0 mt-1 pulse-animation" size={16} />
                  <span>Café et thé illimités</span>
                </li>
                <li className="flex items-start animate-text-reveal" style={{ animationDelay: "250ms" }}>
                  <Check className="text-coworking-secondary mr-2 flex-shrink-0 mt-1 pulse-animation" size={16} />
                  <span>Cuisine équipée</span>
                </li>
                <li className="flex items-start animate-text-reveal" style={{ animationDelay: "350ms" }}>
                  <Check className="text-coworking-secondary mr-2 flex-shrink-0 mt-1 pulse-animation" size={16} />
                  <span>Espace détente confortable</span>
                </li>
                <li className="flex items-start animate-text-reveal" style={{ animationDelay: "450ms" }}>
                  <Check className="text-coworking-secondary mr-2 flex-shrink-0 mt-1 pulse-animation" size={16} />
                  <span>Service d'impression</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <div className="text-coworking-accent mb-4 float-animation">
                <Users size={40} />
              </div>
              <h3 className="text-xl font-bold mb-2 hover:text-gradient transition-colors">Communauté et Plus</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start animate-text-reveal" style={{ animationDelay: "200ms" }}>
                  <Check className="text-coworking-secondary mr-2 flex-shrink-0 mt-1 pulse-animation" size={16} />
                  <span>Événements de networking</span>
                </li>
                <li className="flex items-start animate-text-reveal" style={{ animationDelay: "300ms" }}>
                  <Check className="text-coworking-secondary mr-2 flex-shrink-0 mt-1 pulse-animation" size={16} />
                  <span>Ateliers professionnels</span>
                </li>
                <li className="flex items-start animate-text-reveal" style={{ animationDelay: "400ms" }}>
                  <Check className="text-coworking-secondary mr-2 flex-shrink-0 mt-1 pulse-animation" size={16} />
                  <span>Opportunités de collaboration</span>
                </li>
                <li className="flex items-start animate-text-reveal" style={{ animationDelay: "500ms" }}>
                  <Check className="text-coworking-secondary mr-2 flex-shrink-0 mt-1 pulse-animation" size={16} />
                  <span>Avantages exclusifs</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table (Desktop Only) */}
      <section 
        ref={comparisonRef}
        className={`py-16 hidden md:block transition-all duration-700 ${
          comparisonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-7 text-gradient">Comparaison des forfaits</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un aperçu détaillé des services inclus dans chaque formule d'adhésion.
            </p>
          </div>
          
          <div className="overflow-x-auto interactive-card">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left font-bold">Fonctionnalité</th>
                  <th className="p-4 text-center font-bold ">Abonné</th>
                  <th className="p-4 text-center font-bold ">Bureau privatif</th>
                  <th className="p-4 text-center font-bold bg-blue-50">Nomade</th>
                  <th className="p-4 text-center font-bold ">Etudiant</th>
                  <th className="p-4 text-center font-bold ">Salle de réunion</th>
                  <th className="p-4 text-center font-bold ">Domicialisation entreprise</th>
                  
                  
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-4 font-medium">Prix</td>
                  <td className="p-4 text-center">4 Dt/Heure <br />25 Dt/Jour <br />100 Dt/Semaine <br />300 Dt/Mois</td>
                  <td className="p-4 text-center">10 Dt/Heure <br />50 Dt/Jour <br />200 Dt/Semaine <br />580 Dt/Mois</td>
                  <td className="p-4 text-center bg-blue-50 font-medium">5 DT/Heure <br />35 Dt/Jour <br />120 Dt/Semaine <br />350Dt/Mois</td>
                  <td className="p-4 text-center">2 Dt/Heure <br />10 Dt/Jour <br />40 Dt/Semaine <br />120 Dt/Mois</td>
                  <td className="p-4 text-center">8 Dt/personne</td>
                  <td className="p-4 text-center">50 Dt/mois</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Equipement mis à disposition</td>
                  <td className="p-4 text-center">Bureau ergonomique / Connexion fibre haut débit / Siège confort / Ecrans HD / Imprimante laser / Vue sur mer</td>
                  <td className="p-4 text-center">Bureau ergonomique / Connexion fibre haut débit / Siège confort / Ecrans HD / Imprimante laser / Rétroprojecteur / Tableau / Vue sur mer</td>
                  <td className="p-4 text-center bg-blue-50">Bureau ergonomique / Connexion fibre haut débit / Siège confort / Ecrans HD / Imprimante laser / Vue sur mer (selon disponibilités)</td>
                  <td className="p-4 text-center">Bureau ergonomique / Connexion fibre haut débit / Siège confort / Ecran HD</td>
                  <td className="p-4 text-center">Bureau ergonomique / Connexion fibre haut débit / Siège confort / Ecrans HD / Imprimante laser / Rétroprojecteur / Tableau / Kitchenette / Vue sur mer</td>
                  <td className="p-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Disponibilité</td>
                  <td className="p-4 text-center">Accès garanti à un bureau insonorisé dans l'espace de co-working</td>
                  <td className="p-4 text-center">Accès à un bureau dédié et insonorisé dans l'espace de co-working</td>
                  <td className="p-4 text-center bg-blue-50">Accès garanti à un bureau insonorisé dans l'espace de co-working</td>
                  <td className="p-4 text-center">Accès à un bureau dans l'espace dédié aux étudiants</td>
                  <td className="p-4 text-center">Accès à une salle de réunion pouvant accueillir 30 personnes</td>
                  <td className="p-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Offert</td>
                  <td className="p-4 text-center">Machine à café espresso en libre service / Snacks & Boissons.</td>
                  <td className="p-4 text-center">Machine à café espresso en libre service / Snacks & Boissons / Accès Kitchenette</td>
                  <td className="p-4 text-center bg-blue-50">Machine à café espresso en libre service / Snacks & Boissons.</td>
                  <td className="p-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="p-4 text-center">Machine à café espresso en libre service / Snacks & Boissons.</td>
                  <td className="p-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  
                </tr>
                <tr>
                  <td className="p-4 font-medium">salles de réunion</td>
                  <td className="p-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="p-4 text-center">
                    <Check className="text-coworking-secondary mx-auto" size={20} />
                  </td>
                  <td className="p-4 text-center bg-blue-50">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="p-4 text-center">Non inclus</td>
                  <td className="p-4 text-center">Accès 24/7</td>
                  <td className="p-4 text-center">Non inclus</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Invitation aux événements et au réseau d'investisseur</td>
                  <td className="p-4 text-center ">
                    <Check className="text-coworking-secondary mx-auto" size={20} />
                  </td>
                  <td className="p-4 text-center ">
                    <Check className="text-coworking-secondary mx-auto" size={20} />
                  </td>
                  <td className="p-4 text-center bg-blue-50">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="p-4 text-center">Non inclus</td>
                  <td className="p-4 text-center ">
                    <Check className="text-coworking-secondary mx-auto" size={20} />
                  </td>
                  <td className="p-4 text-center ">
                    <Check className="text-coworking-secondary mx-auto" size={20} />
                  </td>
                  
                </tr>
                <tr>
                  <td className="p-4 font-medium">Services inclus</td>
                  <td className="p-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="p-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="p-4 text-center bg-blue-50">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="p-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="p-4 text-center">
                    <X className="text-red-500 mx-auto" size={20} />
                  </td>
                  <td className="p-4 text-center">Adresse postale et correspondance courrier / Service de création d'entreprise / Comptabilité / Secrétariat téléphonique avec ligne dédiée</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Création Société Offshore</td>
                  <td className="p-4 text-center">Non inclus</td>
                  <td className="p-4 text-center">Non inclus</td>
                  <td className="p-4 text-center bg-blue-50">Non inclus</td>
                  <td className="p-4 text-center">Non inclus</td>
                  <td className="p-4 text-center">Non inclus</td>
                  <td className="p-4 text-center">Possible sur demande</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Alerte Courriers Par E-Mail</td>
                  <td className="p-4 text-center">Non inclus</td>
                  <td className="p-4 text-center">Non inclus</td>
                  <td className="p-4 text-center bg-blue-50">Non inclus</td>
                  <td className="p-4 text-center">Non inclus</td>
                  <td className="p-4 text-center">Non inclus</td>
                  <td className="p-4 text-center">inclus</td>
                </tr>
                <tr>
                  <td className="p-4"></td>
                  <td className="p-4 text-center">
                    <Link to="/booking" className="btn-secondary inline-block">Réserver</Link>
                  </td>
                  <td className="p-4 text-center">
                    <Link to="/booking" className="btn-secondary inline-block">S'abonner</Link>
                  </td>
                  <td className="p-4 text-center bg-blue-50">
                    <Link to="/booking" className="btn-primary inline-block">S'abonner</Link>
                  </td>
                  <td className="p-4 text-center">
                    <Link to="/booking" className="btn-secondary inline-block">S'abonner</Link>
                  </td>
                  <td className="p-4 text-center">
                    <Link to="/booking" className="btn-secondary inline-block">S'abonner</Link>
                  </td>
                  <td className="p-4 text-center">
                    <Link to="/booking" className="btn-secondary inline-block">S'abonner</Link>
                  </td>
                  
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section 
        ref={faqRef}
        className={`py-16 bg-gray-50 transition-all duration-700 ${
          faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gradient">Questions fréquentes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Tout ce que vous devez savoir sur nos adhésions et services.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i} 
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-102"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <h3 className="text-xl font-bold mb-2 hover:text-gradient transition-colors">Puis-je annuler mon abonnement à tout moment ?</h3>
                  <p className="text-gray-600">
                    Oui, tous nos forfaits sont sans engagement à long terme. Vous pouvez annuler à tout moment avec un préavis de 30 jours pour les forfaits mensuels.
                  </p>
                </div>
              ))}
              
              <div 
                key={6} 
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-102"
                style={{ animationDelay: "600ms" }}
              >
                <h3 className="text-xl font-bold mb-2 hover:text-gradient transition-colors">Y a-t-il des frais d'inscription ?</h3>
                <p className="text-gray-600">
                  Non, nous ne facturons aucun frais d'inscription ou de dossier. Le prix indiqué est tout compris.
                </p>
              </div>
              
              <div 
                key={7} 
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-102"
                style={{ animationDelay: "700ms" }}
              >
                <h3 className="text-xl font-bold mb-2 hover:text-gradient transition-colors">Puis-je changer de forfait en cours d'abonnement ?</h3>
                <p className="text-gray-600">
                  Absolument. Vous pouvez passer à un forfait supérieur à tout moment. Pour passer à un forfait inférieur, il suffit de nous en informer avant votre prochain cycle de facturation.
                </p>
              </div>
              
              <div 
                key={8} 
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-102"
                style={{ animationDelay: "800ms" }}
              >
                <h3 className="text-xl font-bold mb-2 hover:text-gradient transition-colors">Comment fonctionnent les réservations de salles de réunion ?</h3>
                <p className="text-gray-600">
                  Les heures de salle de réunion incluses dans votre forfait peuvent être utilisées par tranches d'une heure minimum. La réservation se fait via notre plateforme en ligne, sous réserve de disponibilité.
                </p>
              </div>
              
              <div 
                key={9} 
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-102"
                style={{ animationDelay: "900ms" }}
              >
                <h3 className="text-xl font-bold mb-2 hover:text-gradient transition-colors">Les visiteurs sont-ils autorisés ?</h3>
                <p className="text-gray-600">
                  Oui, vous pouvez recevoir des visiteurs. Les forfaits Nomade et Premium incluent des crédits visiteurs. Pour les autres forfaits, un supplément peut s'appliquer pour les visiteurs qui restent plus d'une heure.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link 
                to="/faq" 
                className="text-coworking-primary hover:text-blue-700 font-medium inline-flex items-center hover:scale-105 transition-all duration-300"
              >
                Voir toutes les questions fréquentes
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        ref={ctaRef}
        className={`bg-coworking-primary text-white py-16 transition-all duration-700 ${
          ctaVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4 text-glow">Prêt à rejoindre notre communauté ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-text-reveal">
            Commencez dès aujourd'hui et découvrez le plaisir de travailler dans un environnement pensé pour votre réussite.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="bg-white text-coworking-primary hover:bg-blue-50 px-6 py-3 rounded-md font-semibold transition-all hover:scale-105 hover:shadow-lg shine-effect"
              asChild
            >
              <Link to="/booking">S'inscrire maintenant</Link>
            </Button>
            <Button 
              className="bg-coworking-dark text-white hover:bg-opacity-90 px-6 py-3 rounded-md font-semibold transition-all hover:scale-105 hover:shadow-lg shine-effect"
              asChild
            >
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Add intersection observer effect */}
      <script type="text/javascript">
      {`
        document.addEventListener('DOMContentLoaded', function() {
          const animateElements = document.querySelectorAll('.animate-on-scroll');
          
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
              }
            });
          }, { threshold: 0.1 });
          
          animateElements.forEach(el => {
            observer.observe(el);
          });
        });
      `}
      </script>
    </div>
  );
};

export default Membership;
