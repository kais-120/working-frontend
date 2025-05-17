import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useApp();
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À Propos', path: '/about' },
    { name: 'Adhésion', path: '/membership' },
    { name: 'Réservation', path: '/booking' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container-custom flex justify-between items-center py-4">
        <div className="flex items-center gap-3 text-blue">
      <img
        src="img\Sans-titre-155.png"
        alt="Logo Djerba Coworking"
        className="h-14 w-auto"
      />
      <div className="flex flex-col leading-tight text-blue">
        <span className="text-xl font-bold">Djerba</span>
        <span className="text-xl">Coworking</span>
      </div>
    </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-coworking-primary ${
                  isActive(link.path) ? 'text-coworking-primary' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="text-sm font-medium text-gray-600 hover:text-coworking-primary flex items-center gap-1">
                  <User size={16} />
                  Profil
                </Link>
                <button 
                  onClick={logout} 
                  className="text-sm font-medium text-gray-600 hover:text-coworking-primary flex items-center gap-1"
                >
                  <LogOut size={16} />
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="btn-primary flex items-center gap-1"
              >
                <User size={16} />
                Connexion
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="block md:hidden text-gray-600 p-2" 
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg animate-fade-in">
            <div className="container-custom py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 text-base font-medium transition-colors hover:text-coworking-primary ${
                    isActive(link.path) ? 'text-coworking-primary' : 'text-gray-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile" 
                    className="block py-2 text-base font-medium text-gray-600 hover:text-coworking-primary flex items-center gap-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={16} />
                    Profil
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }} 
                    className="block py-2 text-base font-medium text-gray-600 hover:text-coworking-primary flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Déconnexion
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="btn-primary inline-flex items-center gap-2 mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User size={16} />
                  Connexion
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-coworking-dark text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="text-2xl font-bold text-white mb-4 block">
                Djerba Coworking
              </Link>
              <p className="text-gray-300 mb-4">
                Votre espace de coworking moderne et professionnel à Djerba. Nous offrons des espaces de travail flexibles et
                équipés pour tous vos besoins professionnels.
              </p>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/profile.php?id=61556719031072&locale=fr_FR" className="text-white hover:text-coworking-accent" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4">Liens Rapides</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-300 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <address className="text-gray-300 not-italic">
                <p>La Marina, Houmt-souk</p>
                <p>Djerba, Tunisie</p>
                <p className="mt-2">Email: hello@djerbacoworking.com</p>
                <p>Tel: +216 94 333 004</p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} Djerba Coworking. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
