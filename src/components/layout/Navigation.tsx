
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
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

  return (
    <>
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
    </>
  );
};

export default Navigation;
