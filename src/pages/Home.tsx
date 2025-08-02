
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Wifi, Coffee, Calendar, Clock, Users } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import ReviewSection from '@/components/layout/ReviewSection';

const Home = () => {
  const [heroRef, heroVisible] = useIntersectionObserver<HTMLElement>();
  const [benefitsRef, benefitsVisible] = useIntersectionObserver<HTMLElement>();
  const [spacesRef, spacesVisible] = useIntersectionObserver<HTMLElement>();
  const [ctaRef, ctaVisible] = useIntersectionObserver<HTMLElement>();


  return (
    <div>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className={`bg-gradient-to-r from-coworking-primary to-blue-700 text-white py-20 md:py-32
          ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          transition-all duration-1000 ease-out`}
      >
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
                Votre espace de travail collaboratif idéal
              </h1>
              <p className="text-xl mb-8 text-blue-100 animate-fade-in">
                Un environnement professionnel, créatif et stimulant pour vos projets et votre réussite.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in">
                <Link to="/membership" className="bg-white text-coworking-primary hover:bg-blue-50 px-6 py-3 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-md active:scale-95">
                  Réserver un espace
                </Link>
              
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl shine-effect ">
              <img 
                src="img\IMG-20240227-WA0023.jpg" 
                alt="Notre histoire" 
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section 
        ref={benefitsRef} 
        className={`py-16 bg-gray-50 
          ${benefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          transition-all duration-1000 ease-out`}
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Pourquoi choisir notre espace</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez tous les avantages de travailler dans un environnement collaboratif et professionnel.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card hover:shadow-lg transition-all duration-500 transform hover:scale-105 hover:translate-y-[-5px]">
              <div className="mb-4 text-coworking-primary">
                <Wifi size={48} className="transform hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-2">Connexion fibre haut débit</h3>
              <p className="text-gray-600">
               Bénéficiez d’un internet ultra-rapide et stable pour rester productif sans coupure
              </p>
            </div>
            
            <div className="card hover:shadow-lg transition-all duration-500 transform hover:scale-105 hover:translate-y-[-5px]">
              <div className="mb-4 text-coworking-secondary">
                <Coffee size={48} className="transform hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-2">Espace de détente</h3>
              <p className="text-gray-600">
                Profitez de notre coin café et espace de détente pour faire une pause et rencontrer d'autres professionnels.
              </p>
            </div>
            
            <div className="card hover:shadow-lg transition-all duration-500 transform hover:scale-105 hover:translate-y-[-5px]">
              <div className="mb-4 text-coworking-accent">
                <Users size={48} className="transform hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-2">Communauté active</h3>
              <p className="text-gray-600">
                Rejoignez une communauté dynamique de freelances, entrepreneurs et télétravailleurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spaces Section */}
      <section 
        ref={spacesRef}
        className={`py-16 
          ${spacesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          transition-all duration-1000 ease-out`}
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">Nos espaces de travail</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Des espaces adaptés à tous vos besoins, que vous soyez seul ou en groupe.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Space Card 1 */}
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:translate-y-[-5px] bg-white">
              <img 
                src="img/477535602_17892227229176880_2164903299788972891_n.jpg" 
                alt="Espace ouvert" 
                className="w-full h-56 object-cover shine-effect"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin size={14} className="mr-1" />
                  <span>Zone principale</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Espace ouvert</h3>
                <p className="text-gray-600 mb-4">
                  Espace de travail ouvert idéal pour la collaboration et le networking.
                </p>
                <div className="flex justify-between items-center">
                  
                
                </div>
              </div>
            </div>
            
            {/* Space Cards 2 & 3 */}
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:translate-y-[-5px] bg-white">
              <img 
                src="img/IMG-20240227-WA0011.jpg" 
                alt="Bureau privé" 
                className="w-full h-56 object-cover shine-effect"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin size={14} className="mr-1" />
                  <span>Zone calme</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Bureau privé</h3>
                <p className="text-gray-600 mb-4">
                  Espace privatif pour vous concentrer ou travailler en petit groupe.
                </p>
                <div className="flex justify-between items-center">
                  
                  
                </div>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:translate-y-[-5px] bg-white">
              <img 
                src="img/IMG-20240227-WA0012.jpgf_.jpg" 
                alt="Salle de réunion" 
                className="w-full h-56 object-cover shine-effect"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin size={14} className="mr-1" />
                  <span>Étage collaboration</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Salle de réunion</h3>
                <p className="text-gray-600 mb-4">
                  Salle équipée pour vos réunions professionnelles et présentations.
                </p>
                <div className="flex justify-between items-center">
                  
                 
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/membership" className="btn-primary inline-flex items-center transition-all duration-300 transform hover:scale-105 hover:shadow-md active:scale-95">
              Voir tous nos espaces
              <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
          <ReviewSection />
     
      <section 
        ref={ctaRef}
        className={`bg-coworking-primary text-white py-16
          ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          transition-all duration-1000 ease-out`}
      >
        <div className="container-custom text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-glow">Prêt à rejoindre notre communauté?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Réservez votre espace dès aujourd'hui et profitez de tous nos services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/membership" className="bg-coworking-accent text-white hover:bg-yellow-600 px-6 py-3 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-md active:scale-95">
              Voir nos formules d'adhésion
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
