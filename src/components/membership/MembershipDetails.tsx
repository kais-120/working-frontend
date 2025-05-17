
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { MembershipOption } from './FloatingOptions';

interface MembershipDetailsProps {
  option: MembershipOption;
  onClose: () => void;
}

const MembershipDetails: React.FC<MembershipDetailsProps> = ({ option, onClose }) => {
  const renderField = (label: string, value: string) => {
    if (!value) return null;
    
    return (
      <div className="mb-4 border-b border-gray-200 pb-3">
        <div className="text-gray-600 font-medium mb-1">{label}</div>
        <div className="text-gray-800">{value}</div>
      </div>
    );
  };

  const renderPrices = () => {
    const { prices } = option.details;
    const hasAnyPrice = Object.values(prices).some(price => !!price);
    
    if (!hasAnyPrice) return null;
    
    return (
      <div className="mb-4">
        <div className="text-gray-900 font-semibold text-xl mb-3">Tarifs</div>
        <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
          {prices.hour && (
            <div className="text-center">
              <div className="text-2xl font-bold text-coworking-primary">{prices.hour.split('/')[0]}</div>
              <div className="text-sm text-gray-600">par heure</div>
            </div>
          )}
          {prices.day && (
            <div className="text-center">
              <div className="text-2xl font-bold text-coworking-primary">{prices.day.split('/')[0]}</div>
              <div className="text-sm text-gray-600">par jour</div>
            </div>
          )}
          {prices.week && (
            <div className="text-center">
              <div className="text-2xl font-bold text-coworking-primary">{prices.week.split('/')[0]}</div>
              <div className="text-sm text-gray-600">par semaine</div>
            </div>
          )}
          {prices.month && (
            <div className="text-center">
              <div className="text-2xl font-bold text-coworking-primary">{prices.month.split('/')[0]}</div>
              <div className="text-sm text-gray-600">par mois</div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-xl shadow-2xl w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
    >
      <div className="relative p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="flex items-center mb-6">
          <div className={`${option.color} p-3 rounded-full mr-4`}>
            {option.icon}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{option.name}</h2>
        </div>
        
        <div className="space-y-1">
          {renderField("Équipement Mis À Disposition", option.details.equipment)}
          {renderField("Disponibilité", option.details.availability)}
          {renderField("Offert", option.details.offered)}
          {renderField("Salles De Réunions", option.details.meetings)}
          {renderField("Invitation Aux Événements Et Au Réseau D'investisseurs", option.details.events)}
          {renderField("Accès 24/7", option.details.access)}
          
          {renderPrices()}
          
          {option.id === 'domiciliation' && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="text-gray-900 font-semibold text-xl mb-3">Services Inclus</div>
              <div className="text-gray-800">
                Adresse postale et correspondance courrier / Service de création d'entreprise / Comptabilité / Secrétariat téléphonique avec ligne dédiée
              </div>
              <div className="mt-3">
                <div className="text-gray-600 font-medium mb-1">Création Société Offshore</div>
                <div className="text-gray-800">Possible sur demande</div>
              </div>
              <div className="mt-3">
                <div className="text-gray-600 font-medium mb-1">Alerte Courriers Par E-Mail</div>
                <div className="text-gray-800">Inclus</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MembershipDetails;
