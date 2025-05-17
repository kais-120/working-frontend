import React, { useState } from 'react';
import { MapPin, Phone, Mail, MessageSquare, Clock, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const [heroRef, heroVisible] = useIntersectionObserver<HTMLElement>();
  const [formRef, formVisible] = useIntersectionObserver<HTMLDivElement>();
  const [infoRef, infoVisible] = useIntersectionObserver<HTMLDivElement>();
  const [mapRef, mapVisible] = useIntersectionObserver<HTMLElement>();
  const [ctaRef, ctaVisible] = useIntersectionObserver<HTMLElement>();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Contactez-nous</h1>
          <p className="text-xl text-blue-100 max-w-2xl animate-fade-in">
            Une question ou une demande spécifique ? Nous sommes là pour vous aider.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div 
              ref={formRef}
              className={`${formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}
                transition-all duration-1000 ease-out`}
            >
              <h2 className="text-3xl font-bold mb-6 text-gradient">Envoyez-nous un message</h2>
              <p className="text-gray-600 mb-8">
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="transition-all duration-300 hover:translate-y-[-2px]">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-coworking-primary focus:border-coworking-primary transition-all duration-300"
                    placeholder="Votre nom"
                  />
                </div>
                
                <div className="transition-all duration-300 hover:translate-y-[-2px]">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-coworking-primary focus:border-coworking-primary transition-all duration-300"
                    placeholder="votre.email@exemple.com"
                  />
                </div>
                
                <div className="transition-all duration-300 hover:translate-y-[-2px]">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Sujet
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-coworking-primary focus:border-coworking-primary transition-all duration-300"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="general">Informations générales</option>
                    <option value="membership">Adhésion</option>
                    <option value="visit">Visite de l'espace</option>
                    <option value="event">Organisation d'événement</option>
                    <option value="support">Support technique</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                
                <div className="transition-all duration-300 hover:translate-y-[-2px]">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-coworking-primary focus:border-coworking-primary transition-all duration-300"
                    placeholder="Comment pouvons-nous vous aider ?"
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn-primary w-full flex justify-center items-center transition-all duration-300 transform hover:scale-105 hover:shadow-md active:scale-95"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Envoi en cours...
                    </>
                  ) : (
                    'Envoyer le message'
                  )}
                </button>
              </form>
            </div>
            
            {/* Contact Information */}
            <div 
              ref={infoRef}
              className={`${infoVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
                transition-all duration-1000 ease-out`}
            >
              <h2 className="text-3xl font-bold mb-6 text-gradient">Informations de contact</h2>
              <p className="text-gray-600 mb-8">
                Vous préférez nous contacter directement ? Voici toutes nos coordonnées.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start hover:translate-y-[-2px] transition-all duration-300">
                  <div className="flex-shrink-0 bg-coworking-primary bg-opacity-10 p-3 rounded-full">
                    <MapPin className="text-coworking-primary" size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Adresse</h3>
                    <address className="not-italic text-gray-600">
                    La Marina, Houmt-souk<br />
                      Djerba, Tunisie
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start hover:translate-y-[-2px] transition-all duration-300">
                  <div className="flex-shrink-0 bg-coworking-primary bg-opacity-10 p-3 rounded-full">
                    <Phone className="text-coworking-primary" size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Téléphone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+21654123456" className="hover:text-coworking-primary story-link">
                      +216  94  333 004
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start hover:translate-y-[-2px] transition-all duration-300">
                  <div className="flex-shrink-0 bg-coworking-primary bg-opacity-10 p-3 rounded-full">
                    <Mail className="text-coworking-primary" size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Email</h3>
                    <p className="text-gray-600">
                      <a href="mailto:contact@djerba-coworking.com" className="hover:text-coworking-primary story-link">
                      hello@djerbacoworking.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start hover:translate-y-[-2px] transition-all duration-300">
                  <div className="flex-shrink-0 bg-coworking-primary bg-opacity-10 p-3 rounded-full">
                    <Clock className="text-coworking-primary" size={24} />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Heures d'ouverture</h3>
                    <p className="text-gray-600">
                      Lundi - Vendredi: 8h00 - 20h00<br />
                      Samedi: 9h00 - 18h00<br />
                      Dimanche: Fermé
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Social Media Links - Only Facebook */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61556719031072&locale=fr_FR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-6"
                    aria-label="Facebook"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section 
        ref={mapRef}
        className={`py-16 bg-gray-50 relative
          ${mapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          transition-all duration-1000 ease-out`}
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gradient">Comment nous trouver</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Idéalement situé dans la zone touristique de Djerba, notre espace de coworking est facilement accessible.
            </p>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-500">
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d849.8975040024142!2d10.854931731934245!3d33.886356169752186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13aaa5ae7d6be377%3A0xe54e9a7c2d3f8561!2sEspace%20Coworking%20Djerba!5e0!3m2!1sfr!2stn!4v1683046015549!5m2!1sfr!2stn"
                width="100%" 
                height="500" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps - Espace Coworking Djerba"
              ></iframe>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-500 transform hover:scale-105 hover:translate-y-[-5px]">
              <h3 className="text-xl font-bold mb-2">Transport en commun</h3>
              <p className="text-gray-600 mb-4">
                Taxi collectif : disponible partout à Djerba<br />
                Louage : Direction Midoun
              </p>
              <a href="https://www.google.com/maps/dir//Espace+Coworking+Djerba" target="_blank" rel="noopener noreferrer" className="text-coworking-primary hover:text-blue-700 font-medium inline-flex items-center story-link">
                Planifier mon trajet
                <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-500 transform hover:scale-105 hover:translate-y-[-5px]">
              <h3 className="text-xl font-bold mb-2">En voiture</h3>
              <p className="text-gray-600 mb-4">
                Parking gratuit sur place<br />
                Location de voitures disponible à l'aéroport
              </p>
              <a href="https://www.google.com/maps/dir//Espace+Coworking+Djerba" target="_blank" rel="noopener noreferrer" className="text-coworking-primary hover:text-blue-700 font-medium inline-flex items-center">
                Obtenir l'itinéraire
                <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-500 transform hover:scale-105 hover:translate-y-[-5px]">
              <h3 className="text-xl font-bold mb-2">De l'aéroport</h3>
              <p className="text-gray-600 mb-4">
                À 20 minutes de l'aéroport de Djerba-Zarzis<br />
                Services de taxi disponibles
              </p>
              <a href="https://www.google.com/maps/dir/A%C3%A9roport+international+de+Djerba-Zarzis/Espace+Coworking+Djerba" target="_blank" rel="noopener noreferrer" className="text-coworking-primary hover:text-blue-700 font-medium inline-flex items-center">
                Voir l'itinéraire
                <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        ref={ctaRef}
        className={`bg-coworking-primary text-white py-16
          ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          transition-all duration-1000 ease-out`}
      >
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4 text-glow">Vous préférez voir par vous-même ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Réservez une visite guidée de notre espace et découvrez tous nos services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="bg-white text-coworking-primary hover:bg-blue-50 px-6 py-3 rounded-md font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-md active:scale-95 inline-flex items-center">
              <MessageSquare size={20} className="mr-2" />
              Réserver une visite
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
