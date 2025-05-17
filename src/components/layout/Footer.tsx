
import React from 'react';
import { Facebook } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

const Footer = () => {
  const [footerRef, footerVisible] = useIntersectionObserver<HTMLElement>();

  return (
    <footer 
      ref={footerRef}
      className={`bg-gray-900 text-white py-12 
        ${footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} 
        transition-all duration-1000 ease-out`}
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4 text-gradient">Coworking Space</h3>
            <p className="text-gray-300 mb-4">
              Un espace de travail moderne et collaboratif, conçu pour stimuler la créativité et la productivité.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.facebook.com/profile.php?id=61556719031072&locale=fr_FR" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-all transform hover:scale-110 hover:rotate-6"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white story-link">Accueil</a>
              </li>
              <li>
                <a href="/about" className="text-gray-300 hover:text-white story-link">À propos</a>
              </li>
              <li>
                <a href="/membership" className="text-gray-300 hover:text-white story-link">Adhésion</a>
              </li>
              <li>
                <a href="/booking" className="text-gray-300 hover:text-white story-link">Réservation</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <address className="not-italic text-gray-300 space-y-2">
              <p>Zone Touristique Midoun</p>
              <p>Djerba, Tunisie</p>
              <p className="mt-2">
                <a href="tel:+21654123456" className="hover:text-white story-link">+216 54 123 456</a>
              </p>
              <p>
                <a href="mailto:contact@djerba-coworking.com" className="hover:text-white story-link">contact@djerba-coworking.com</a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Coworking Space. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
