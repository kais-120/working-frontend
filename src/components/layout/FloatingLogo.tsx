
import React, { useState, useEffect } from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

const FloatingLogo = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Rendre le logo moins visible lors d'un défilement rapide
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div 
      className={`fixed bottom-24 right-6 z-50 ${isVisible ? 'opacity-100' : 'opacity-70'} transition-all duration-500`}
    >
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="cursor-pointer transform transition-all duration-500 hover:scale-110 hover:rotate-6 group">
            <img 
              src="/lovable-uploads/ff5afd0c-a922-43ae-8255-22c5b4335d0a.png" 
              alt="Djerba Coworking Logo" 
              className="w-36 h-36 md:w-40 md:h-40 object-contain filter drop-shadow-lg" 
            />
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 p-4 bg-white/95 backdrop-blur-sm border border-coworking-primary/20 shadow-lg">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold font-overpass">Djerba Coworking</h4>
              <p className="text-xs text-muted-foreground font-overpass">
                Votre espace de coworking idéal à Djerba. Bienvenue dans notre communauté !
              </p>
            </div>
            <img
              src="/lovable-uploads/ff5afd0c-a922-43ae-8255-22c5b4335d0a.png"
              alt="Logo"
              className="h-12 w-12 object-contain"
            />
          </div>
          <div className="mt-2">
            <a 
              href="https://www.facebook.com/profile.php?id=61556719031072&locale=fr_FR" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs text-coworking-primary flex items-center hover:underline font-overpass"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              Visitez notre page Facebook
            </a>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default FloatingLogo;
