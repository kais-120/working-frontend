
import React, { useState } from 'react';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { AnimatePresence, motion } from 'framer-motion';
import { CreditCard, MapPin, GraduationCap, Users, Building2 } from 'lucide-react';
import MembershipDetails from './MembershipDetails';
import { toast } from '@/hooks/use-toast';

// Définition des options
export type MembershipOption = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  details: {
    equipment: string;
    availability: string;
    offered: string;
    meetings: string;
    events: string;
    access: string;
    prices: {
      hour: string;
      day: string;
      week: string;
      month: string;
    };
  };
};

const membershipOptions: MembershipOption[] = [
  {
    id: 'nomade',
    name: 'Nomade',
    icon: <Users className="h-5 w-5" />,
    color: 'bg-orange-400',
    details: {
      equipment: 'Bureau ergonomique / Connexion fibre haut débit / Siège confort / Écrans HD / Imprimante laser / Vue sur mer (selon disponibilités)',
      availability: 'Accès garanti à un bureau insonorisé dans l\'espace de co-working',
      offered: 'Machine à café espresso en libre service / Snacks & Boissons.',
      meetings: 'Non',
      events: 'Non',
      access: '',
      prices: {
        hour: '5 Dt/Heure',
        day: '35 Dt/Jour',
        week: '120 Dt/Semaine',
        month: '350 Dt/Mois'
      }
    }
  },
  {
    id: 'abonne',
    name: 'Abonné',
    icon: <CreditCard className="h-5 w-5" />,
    color: 'bg-orange-400',
    details: {
      equipment: 'Bureau ergonomique / Connexion fibre haut débit / Siège confort / Écrans HD / Imprimante laser / Vue sur mer',
      availability: 'Accès garanti à un bureau insonorisé dans l\'espace de co-working',
      offered: 'Machine à café espresso en libre service / Snacks & Boissons.',
      meetings: 'Non',
      events: 'Oui',
      access: '',
      prices: {
        hour: '4 Dt/Heure',
        day: '25 Dt/Jour',
        week: '100 Dt/Semaine',
        month: '300 Dt/Mois'
      }
    }
  },
  {
    id: 'bureau-privatif',
    name: 'Bureau Privatif',
    icon: <MapPin className="h-5 w-5" />,
    color: 'bg-orange-400',
    details: {
      equipment: 'Bureau ergonomique / Connexion fibre haut débit / Siège confort / Écrans HD / Imprimante laser / Rétroprojecteur / Tableau / Vue sur mer',
      availability: 'Accès à un bureau dédié et insonorisé dans l\'espace de co-working',
      offered: 'Machine à café espresso en libre service / Snacks & Boissons / Accès Kitchenette',
      meetings: 'Oui',
      events: 'Oui',
      access: 'Inclus',
      prices: {
        hour: '10 Dt/Heure',
        day: '50 Dt/Jour',
        week: '200 Dt/Semaine',
        month: '580 Dt/Mois'
      }
    }
  },
  {
    id: 'etudiant',
    name: 'Étudiant',
    icon: <GraduationCap className="h-5 w-5" />,
    color: 'bg-orange-400',
    details: {
      equipment: 'Bureau ergonomique / Connexion fibre haut débit / Siège confort / Écran HD',
      availability: 'Accès à un bureau dans l\'espace dédié aux étudiants',
      offered: 'Non inclus',
      meetings: 'Non inclus',
      events: 'Non inclus',
      access: 'Inclus',
      prices: {
        hour: '2 Dt/Heure',
        day: '10 Dt/Jour',
        week: '40 Dt/Semaine',
        month: '120 Dt/Mois'
      }
    }
  },
  {
    id: 'salle-reunion',
    name: 'Salle de réunion',
    icon: <Users className="h-5 w-5" />,
    color: 'bg-orange-400',
    details: {
      equipment: 'Bureau ergonomique / Connexion fibre haut débit / Siège confort / Écrans HD / Imprimante laser / Rétroprojecteur / Tableau / Vue sur mer',
      availability: 'Accès à une salle de réunion pouvant accueillir 30 personnes',
      offered: 'Machine à café espresso en libre service / Snacks & Boissons.',
      meetings: '',
      events: 'Oui',
      access: 'Inclus',
      prices: {
        hour: '8 Dt/personne',
        day: '',
        week: '',
        month: ''
      }
    }
  },
  {
    id: 'domiciliation',
    name: 'Domiciliation entreprise',
    icon: <Building2 className="h-5 w-5" />,
    color: 'bg-orange-400',
    details: {
      equipment: '',
      availability: '',
      offered: '',
      meetings: '',
      events: 'Oui',
      access: '',
      prices: {
        hour: '',
        day: '',
        week: '',
        month: '50 Dt/mois'
      }
    }
  }
];

const FloatingOptions: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<MembershipOption | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: MembershipOption) => {
    setSelectedOption(option);
    setIsOpen(true);
    toast({
      title: `Option ${option.name} sélectionnée`,
      description: "Les détails ont été chargés avec succès.",
    });
  };

  const handleCloseDetails = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <ContextMenu>
        <ContextMenuTrigger>
          <motion.div 
            className="bg-coworking-primary rounded-full w-16 h-16 flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Users className="h-8 w-8 text-white" />
          </motion.div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden">
          {membershipOptions.map((option) => (
            <ContextMenuItem 
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className="flex items-center px-3 py-2 text-base hover:bg-gray-100 cursor-pointer"
            >
              <div className={`${option.color} p-2 rounded-full mr-3`}>
                {option.icon}
              </div>
              <span>{option.name}</span>
            </ContextMenuItem>
          ))}
        </ContextMenuContent>
      </ContextMenu>

      <AnimatePresence>
        {isOpen && selectedOption && (
          <MembershipDetails 
            option={selectedOption} 
            onClose={handleCloseDetails} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingOptions;
