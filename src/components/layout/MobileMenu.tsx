
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, LogOut, Settings, Shield, Building } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { isAuthenticated, logout, user } = useApp();
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À Propos', path: '/about' },
    { name: 'Adhésion', path: '/membership' },
    { name: 'Réservation', path: '/booking' },
    { name: 'Actualités', path: '/news' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Mock user roles - in real app, this would come from the user data
  const isAdmin = user?.email === 'admin@djerba-coworking.com';
  const isOwner = user?.email === 'owner@djerba-coworking.com';

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white shadow-lg animate-fade-in">
      <div className="container-custom py-4 flex flex-col gap-4">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`block py-2 text-base font-medium transition-colors hover:text-coworking-primary ${
              isActive(link.path) ? 'text-coworking-primary' : 'text-gray-600'
            }`}
            onClick={onClose}
          >
            {link.name}
          </Link>
        ))}
        {isAuthenticated ? (
          <>
            <div className="border-t pt-4">
              <p className="text-sm font-medium text-gray-900 mb-2">{user?.name}</p>
              <p className="text-xs text-gray-500 mb-4">{user?.email}</p>
            </div>
            <Link
              to="/settings" 
              className="block py-2 text-base font-medium text-gray-600 hover:text-coworking-primary flex items-center gap-2"
              onClick={onClose}
            >
              <Settings size={16} />
              Paramètres
            </Link>
            {isAdmin && (
              <Link
                to="/admin" 
                className="block py-2 text-base font-medium text-gray-600 hover:text-coworking-primary flex items-center gap-2"
                onClick={onClose}
              >
                <Shield size={16} />
                Dashboard Admin
              </Link>
            )}
            {isOwner && (
              <Link
                to="/owner" 
                className="block py-2 text-base font-medium text-gray-600 hover:text-coworking-primary flex items-center gap-2"
                onClick={onClose}
              >
                <Building size={16} />
                Dashboard Propriétaire
              </Link>
            )}
            <button 
              onClick={() => {
                logout();
                onClose();
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
            onClick={onClose}
          >
            <User size={16} />
            Connexion
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
