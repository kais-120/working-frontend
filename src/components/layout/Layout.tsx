import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, ClipboardCheck } from 'lucide-react';
import Cookies from 'universal-cookie';
import { useUser } from '@/hooks/useUser';
import logo from '@/Assets/img/Sans-titre-155.png'
import ExpireDialog from '../ExpireDialog';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const cookie = new Cookies();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'À Propos', path: '/about' },
    { name: 'Adhésion', path: '/membership' },
    { name: 'Actualités', path: '/news' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);


 const {loading,user,expire,setExpire,auth} = useUser();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const logout = () => {
    cookie.remove("auth")
    window.location.href = '/login';
  };
  if(loading)
    return <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>

  return (
    <div className="flex flex-col min-h-screen">
      <ExpireDialog open={expire} setOpen={setExpire} />
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container-custom flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center gap-3 text-blue">
            <img
              src={logo}
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

{auth ? (
  <div className="relative">
    <button
      onClick={() => setUserMenuOpen(!userMenuOpen)}
      ref={menuButtonRef}
      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full shadow-sm transition-all"
    >
      <User size={18} />
      <span className="font-medium">{user?.name}</span>
    </button>

    {userMenuOpen && (
      <div
        ref={menuRef}
        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden"
      >
        <div className="px-4 py-3 border-b border-gray-100 text-sm text-gray-700 cursor-pointer">
          Bonjour, <strong>{user?.name}</strong>
        </div>
        {user?.rule === "client" ? (
        <Link
          to="/dashboard/booking"
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <ClipboardCheck size={16} /> Reservation
        </Link>
        ) : (
        <Link
        to="/dashboard"
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <User size={16} /> Dashboard
      </Link>
        ) 
        }
       
        <button
          onClick={logout}
          className="w-full text-left flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={16} /> Déconnexion
        </button>
      </div>
    )}
  </div>
) : (
  <Link to="/login" className="btn-primary flex items-center gap-1">
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

      {!loading ? (
        user?.rule === "client" ? (
          <Link
            to="/dashboard/booking"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-600 hover:text-coworking-primary flex items-center gap-2"
          >
            <ClipboardCheck size={16} /> Reservation
          </Link>
        ) : (
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-600 hover:text-coworking-primary flex items-center gap-2"
          >
            <User size={16} /> Dashboard
          </Link>
        )
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

          {!loading && (
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
            )}
          </div>
        </div>
      )} 

      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-coworking-dark text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="text-2xl font-bold text-white mb-4 block">
                Djerba Coworking
              </Link>
              <p className="text-gray-300 mb-4">
                Votre espace de coworking moderne et professionnel à Djerba.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61556719031072&locale=fr_FR"
                  className="text-white hover:text-coworking-accent"
                  aria-label="Facebook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </div>
            </div>
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
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Djerba Coworking. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
