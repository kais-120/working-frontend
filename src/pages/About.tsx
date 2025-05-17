import React from 'react';
import { Clock, Coffee, Wifi, Users, Award, Map, Zap, Heart } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const About = () => {
  const [heroRef, heroVisible] = useIntersectionObserver<HTMLElement>();
  const [storyRef, storyVisible] = useIntersectionObserver<HTMLDivElement>();
  const [valuesRef, valuesVisible] = useIntersectionObserver<HTMLElement>();
  const [teamRef, teamVisible] = useIntersectionObserver<HTMLElement>();
  const [spaceRef, spaceVisible] = useIntersectionObserver<HTMLElement>();
  const [ctaRef, ctaVisible] = useIntersectionObserver<HTMLElement>();

  return (
    <div>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className={`bg-gradient-to-r from-coworking-primary to-blue-700 text-white py-20
          ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          transition-all duration-1000 ease-out`}
      >
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">À propos de nous</h1>
          <p className="text-xl text-blue-100 max-w-2xl animate-fade-in">
            Découvrez notre histoire, notre mission et ce qui fait de notre espace de coworking un lieu unique pour les professionnels.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section 
        ref={storyRef}
        className={`py-16
          ${storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          transition-all duration-1000 ease-out`}
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gradient">Notre histoire</h2>
              <p className="mb-4 text-gray-700">
              À Djerba Coworking, nous avons créé bien plus qu’un espace de travail : un lieu unique où productivité, confort et esprit collaboratif se rencontrent.<br></br> Installé face à la mer, notre coworking propose une connexion fibre optique, des bureaux privatifs et partagés, ainsi qu'une ambiance conviviale propice au networking et à l'innovation.<br></br> Entrepreneurs, freelances et étudiants y trouvent l'environnement idéal pour développer leurs projets dans un cadre inspirant et flexible.


              </p>
              
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl shine-effect">
              <img 
                src="img\IMG-20240227-WA0026-12.jpg" 
                alt="Notre histoire" 
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section 
        ref={valuesRef}
        className={`py-16 bg-gray-50
          ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          transition-all duration-1000 ease-out`}
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gradient">Nos valeurs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre approche et façonnent l'expérience que nous offrons.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-500 transform hover:scale-105 hover:shadow-lg">
              <div className="mx-auto w-16 h-16 bg-coworking-primary bg-opacity-10 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-300">
                <Users className="text-coworking-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Communauté</h3>
              <p className="text-gray-600">
                Favoriser un esprit d'entraide et de partage entre tous nos membres.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-500 transform hover:scale-105 hover:shadow-lg">
              <div className="mx-auto w-16 h-16 bg-coworking-secondary bg-opacity-10 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-300">
                <Zap className="text-coworking-secondary" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-600">
                Encourager la créativité et les idées nouvelles dans un environnement stimulant.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-500 transform hover:scale-105 hover:shadow-lg">
              <div className="mx-auto w-16 h-16 bg-coworking-accent bg-opacity-10 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-300">
                <Award className="text-coworking-accent" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-gray-600">
                Offrir des services et des équipements de qualité supérieure.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center transition-all duration-500 transform hover:scale-105 hover:shadow-lg">
              <div className="mx-auto w-16 h-16 bg-red-500 bg-opacity-10 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110 duration-300">
                <Heart className="text-red-500" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Bien-être</h3>
              <p className="text-gray-600">
                Créer un environnement qui favorise l'équilibre travail-vie personnelle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section 
        ref={teamRef}
        className={`py-16
          ${teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          transition-all duration-1000 ease-out`}
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gradient">Notre équipe</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Rencontrez les personnes qui travaillent chaque jour pour faire de Djerba coworking un lieu exceptionnel.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop" 
                alt="David Lemaire" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl">David Lemaire</h3>
                <p className="text-coworking-primary mb-2">Fondateur & CEO</p>
                <p className="text-gray-600 text-sm">
                  Expert en espaces de travail collaboratifs avec plus de 15 ans d'expérience dans l'innovation entrepreneuriale.
                </p>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop" 
                alt="Émilie Rousseau" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl">Émilie Rousseau</h3>
                <p className="text-coworking-primary mb-2">Directrice des Opérations</p>
                <p className="text-gray-600 text-sm">
                  Spécialiste de l'expérience client avec une passion pour créer des environnements de travail harmonieux.
                </p>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=987&auto=format&fit=crop" 
                alt="Marc Dupont" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl">Marc Dupont</h3>
                <p className="text-coworking-primary mb-2">Responsable Communauté</p>
                <p className="text-gray-600 text-sm">
                  Expert en networking qui organise des événements pour connecter les membres et favoriser la collaboration.
                </p>
              </div>
            </div>
            
            {/* Team Member 4 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=964&auto=format&fit=crop" 
                alt="Sophie Benoit" 
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl">Sophie Benoit</h3>
                <p className="text-coworking-primary mb-2">Responsable Marketing</p>
                <p className="text-gray-600 text-sm">
                  Créative passionnée par le digital et les stratégies de communication innovantes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Space */}
      <section 
        ref={spaceRef}
        className={`py-16 bg-gray-50
          ${spaceVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          transition-all duration-1000 ease-out`}
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6 text-gradient">Notre espace</h2>
              <p className="mb-4 text-gray-700">
              Situé au centre de Houmt-Souk, à La Marina de Djerba, notre espace de coworking de 500 m² combine confort, productivité et inspiration. Conçu pour offrir un environnement de travail idéal, il dispose de bureaux privatifs, d’espaces ouverts, de salles de réunion parfaitement équipées, le tout avec une connexion fibre haut débit et une vue relaxante sur la mer. Vous pouvez également profiter de snacks, de boissons et d’une atmosphère conviviale, propice aux échanges professionnels et à l’innovation.
              </p>
              <p className="mb-4 text-gray-700">
                Des espaces de travail ouverts aux bureaux privés, en passant par les salles de réunion entièrement équipées, notre espace s'adapte à tous vos besoins professionnels.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center transition-transform hover:translate-x-2 duration-300">
                  <Wifi className="text-coworking-primary mr-2" size={20} />
                  <span>Wifi haut débit</span>
                </div>
                <div className="flex items-center transition-transform hover:translate-x-2 duration-300">
                  <Coffee className="text-coworking-primary mr-2" size={20} />
                  <span>Café & thé illimités</span>
                </div>
                <div className="flex items-center transition-transform hover:translate-x-2 duration-300">
                  <Map className="text-coworking-primary mr-2" size={20} />
                  <span>Localisation centrale</span>
                </div>
                <div className="flex items-center transition-transform hover:translate-x-2 duration-300">
                  <Clock className="text-coworking-primary mr-2" size={20} />
                  <span>Accès 24/7</span>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
              <img 
                src="img\473185100_122202933860223967_850053379309046189_n.jpg" 
                alt="Espace de travail" 
                className="rounded-lg shadow-md w-full h-40 md:h-48 object-cover transition-all duration-500 hover:scale-105 hover:shadow-xl"
              />
              <img 
                src="img/IMG-20240227-WA0010.jpg" 
                alt="Salle de réunion" 
                className="rounded-lg shadow-md w-full h-40 md:h-48 object-cover transition-all duration-500 hover:scale-105 hover:shadow-xl"
              />
              <img 
                src="img\IMG-20240227-WA0012.jpgf_.jpg" 
                alt="Espace café" 
                className="rounded-lg shadow-md w-full h-40 md:h-48 object-cover transition-all duration-500 hover:scale-105 hover:shadow-xl"
              />
              <img 
                src="img\IMG-20240227-WA0030.jpg" 
                alt="Bureau privé" 
                className="rounded-lg shadow-md w-full h-40 md:h-48 object-cover transition-all duration-500 hover:scale-105 hover:shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        ref={ctaRef}
        className={`bg-coworking-dark text-white py-16
          ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          transition-all duration-1000 ease-out`}
      >
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4 text-glow">Venez visiter notre espace</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Nous serons ravis de vous faire découvrir nos installations et répondre à toutes vos questions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="bg-coworking-primary text-white hover:bg-blue-600 px-6 py-3 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-md active:scale-95">
              Prendre rendez-vous
            </a>
            <a href="/booking" className="bg-white text-coworking-dark hover:bg-gray-100 px-6 py-3 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-md active:scale-95">
              Réserver un espace
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
