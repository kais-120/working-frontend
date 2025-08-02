import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverTrigger } from '@/components/ui/popover';
import { Calendar, Clock, Crown } from 'lucide-react';
import { PopoverContent } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar as DatePicker } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AxiosToken } from "../API/Api";


const validationSchema = Yup.object().shape({
  selectedDate: Yup.date()
    .required("La date d'arrivée est obligatoire")
    .min(new Date(), "La date doit être ultérieure à aujourd'hui"),

  selectedTime: Yup.string()
    .required("L'heure d'arrivée est obligatoire"),

  duration: Yup.string()
    .oneOf(["heure", "jour", "semaine","mois"], "Durée invalide")
    .required("La durée est obligatoire"),
    subDuration: Yup.string().when("duration", {
    is: "heure",
    then: (schema) => schema.required("Veuillez choisir une durée"),
}),
});

interface MembershipDialogCustomProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlanType:string,
  membership:{
    title:string,
    price:object,
  };
}

const MembershipDialogCustom = ({selectedPlanType , open, onOpenChange, membership }: MembershipDialogCustomProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [selectedTime, setSelectedTime] = useState<string>('');
    
    const equipmentOptions = [
      { label: 'Bureau ergonomique' },
      { label: 'Connexion fibre haut débit' },
      {  label: 'Siège confort' },
      {  label: 'Rétroprojecteur ' },
      {  label: 'Tableau' },
      { label: 'Vue sur mer' },
      { label: 'Ecrans HD' },
      { label: 'Imprimante laser' },
      { label: 'Téléphone' }
    ];

    const availabilityOptions = [
      { label: "Accès à un bureau dédié et insonorisé dans l'espace de co-working" },
      {  label: "Accès garanti à un bureau insonorisé dans l'espace de co-working" },
      {  label: "Accès à un bureau dans l'espace dédié aux étudiants" },
      {  label: "Accès à une salle de réunion pouvant accueillir 30 personnes" }
    ];
    const offertOptions = [
      { label: "Machine à café espresso en libre service " },
      { label: "Snacks & Boissons" },
      {  label: "Accès Kitchenette" },

    ];
    
    const formik = useFormik({
        initialValues:{
            selectedDate: null,
            selectedTime: '',
            duration: '',
            subDuration :'',
            equipment: [],
            availability: [],
            coffeeSnacks: 0,
            meetingRoom: 0,
            coffeesSnacks: [],
            eventsInvitation: 0,
            services: [],
            offshoreCreation: 0,
            mailAlert: 0,
        },
        validationSchema,
        onSubmit : async (values) =>{
            try{
                await AxiosToken.post("/booking/add/custom",{
                  date_start:values.selectedDate,
                  time_start:values.selectedTime,
                  membership:membership.title,
                  duration:values.subDuration ? values.subDuration  : values.duration,
                  equipment: values.equipment,
                  availability: values.availability,
                  offered: values.coffeesSnacks,
                  access_meeting: values.meetingRoom,
                  invitation: values.eventsInvitation,
                  offshoreCreation: values.offshoreCreation,
                  mailAlert: values.mailAlert,
                  access: values.mailAlert,
                });
            }
            catch(err){
                console.error(err)
            }

        }
    })
    
    const durations = [
    { value: "1h", label: "1 heure" },
    { value: "2h", label: "2 heures" },
    { value: "4h", label: "4 heure (Demi-journée)" },
    { value: "5h", label: "5 heures" },
    { value: "6h", label: "6 heures" },
    { value: "7h", label: "7 heures" },
    ]

    const handleEquipmentChange = (equipmentId, checked) => {
      const currentEquipment = formik.values.equipment;
      if (checked) {
        formik.setFieldValue('equipment', [...currentEquipment, equipmentId]);
      } else {
        formik.setFieldValue('equipment', currentEquipment.filter(id => id !== equipmentId));
      }
    };
    const handleCoffeeChange = (coffeeId,checked) => {
 const currentEquipment = formik.values.coffeesSnacks;
      if (checked) {
        formik.setFieldValue('coffeesSnacks', [...currentEquipment, coffeeId]);
      } else {
        formik.setFieldValue('coffeesSnacks', currentEquipment.filter(id => id !== coffeeId));
      }

};

    const handleAvailabilityChange = (availabilityId, checked) => {
      const currentAvailability = formik.values.availability;
      if (checked) {
        formik.setFieldValue('availability', [...currentAvailability, availabilityId]);
      } else {
        formik.setFieldValue('availability', currentAvailability.filter(id => id !== availabilityId));
      }
    };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
        {/* Elegant header with subtle gradient */}
        <div  className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200/50 px-8 py-6">
          <DialogHeader className="text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                <Crown className="h-6 w-6 text-white" />
              </div>
            </div>
            <DialogTitle className="text-2xl font-light text-gray-900 tracking-wide mb-2 text-center">
              Réservation {membership.title}
            </DialogTitle>
          </DialogHeader>
        </div>

        {/* Form content */}
        <form onSubmit={formik.handleSubmit} className="px-8 py-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label 
                htmlFor="startDate" 
                className="text-sm font-medium text-gray-700 uppercase tracking-wider"
              >
                Date d'arrivée
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      `w-full h-12 justify-start text-left font-normal bg-white border-gray-200 hover:border-amber-300 hover:bg-amber-50/30 transition-all duration-200 shadow-sm ${(formik.touched.selectedDate && formik.errors.selectedDate) && "border-red-600 hover:border-red-600" }`,
                      !selectedDate && "text-gray-500"
                    )}
                  >
                    <Calendar className="mr-3 h-5 w-5 text-amber-600" />
                    {selectedDate ? (
                      <span className="text-gray-900 font-medium">
                        {format(selectedDate, "dd MMMM yyyy", { locale: fr })}
                      </span>
                    ) : (
                      <span>Sélectionnez une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden"
                  align="start"
                >
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3">
                    <h3 className="text-white font-medium text-center">
                      Calendrier
                    </h3>
                  </div>
                  <DatePicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                        setSelectedDate(date);
                        formik.setFieldValue("selectedDate", date);
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    locale={fr}
                    className="p-4"
                  />
                </PopoverContent>
              </Popover>
              <span className='mt-2 text-red-600'>{(formik.touched.selectedDate && formik.errors.selectedDate)}</span>
            </div>
            
            <div className="space-y-3">
              <Label 
                htmlFor="startDate" 
                className="text-sm font-medium text-gray-700 uppercase tracking-wider"
              >
                Heure d'arrivée
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      `w-full h-12 justify-start text-left font-normal bg-white border-gray-200 hover:border-amber-300 hover:bg-amber-50/30 transition-all duration-200 shadow-sm ${(formik.touched.selectedTime && formik.errors.selectedTime) && "border-red-600 hover:border-red-600"}`,
                      !selectedTime && "text-gray-500"
                    )}
                  >
                    <Clock className="mr-3 h-5 w-5 text-amber-600" />
                    {selectedTime ? (
                      <span className="text-gray-900 font-medium">
                        {selectedTime}
                      </span>
                    ) : (
                      <span>Sélectionnez une heure</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-80 p-0 bg-white shadow-xl border border-gray-200 rounded-xl overflow-hidden"
                  align="start"
                >
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3">
                    <h3 className="text-white font-medium text-center">
                      Horaires disponibles
                    </h3>
                  </div>
                  <div className="p-4 max-h-60 overflow-y-auto">
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
                        "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
                        "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
                        "17:00", "17:30", "18:00"
                      ].map((time) => (
                        <Button
                          key={time}
                          variant="outline"
                          size="sm"
                          onClick={() => {setSelectedTime(time);formik.setFieldValue("selectedTime",time)}}
                          className={cn(
                            "h-10 text-sm font-medium transition-colors duration-200",
                            selectedTime === time
                              ? "bg-amber-500 text-white border-amber-500 hover:bg-amber-600"
                              : "bg-white border-gray-200 text-gray-700 hover:border-amber-300 hover:bg-amber-50"
                          )}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <span className='mt-2 text-red-600'>{(formik.touched.selectedTime && formik.errors.selectedTime)}</span>
            </div>
            
            <div className="space-y-3">
                <Label 
                htmlFor="startDate" 
                className="text-sm font-medium text-gray-700 uppercase tracking-wider"
              >
                Durée
              </Label>
              {
                selectedPlanType == "S'abonner" ?(
                <Select
                    name="duration"
                    value={formik.values.duration}
                    onValueChange={(value) => {formik.setFieldValue("duration", value);formik.setFieldValue("subDuration", "")}}
                    >
                    <SelectTrigger  className={cn(
                      `w-full h-12 justify-start text-left font-normal bg-white border-gray-200 hover:border-amber-300 hover:bg-amber-50/30 transition-all duration-200 shadow-sm ${( (formik.touched.duration && formik.errors.duration) || (formik.touched.subDuration && formik.errors.subDuration)  ) && "border-red-600 hover:border-red-600"}`,
                      !formik.values.duration && "text-gray-500"
                    )}>
                    </SelectTrigger>
                    <SelectContent className="bg-white cursor-pointer">
                        <SelectItem disabled value="mois">mois</SelectItem>
                    </SelectContent>
                    </Select>
                    )
                    :
                    (<Select
                    name="duration"
                    value={formik.values.duration}
                    onValueChange={(value) => {formik.setFieldValue("duration", value);formik.setFieldValue("subDuration", "")}}
                    >
                    <SelectTrigger  className={cn(
                      `w-full h-12 justify-start text-left font-normal bg-white border-gray-200 hover:border-amber-300 hover:bg-amber-50/30 transition-all duration-200 shadow-sm ${( (formik.touched.duration && formik.errors.duration) || (formik.touched.subDuration && formik.errors.subDuration)  ) && "border-red-600 hover:border-red-600"}`,
                      !formik.values.duration && "text-gray-500"
                    )}>
                        <SelectValue placeholder="Choisir durée" />
                    </SelectTrigger>
                    <SelectContent className="bg-white cursor-pointer">
                        <SelectItem value="heure">heure ou plus</SelectItem>
                        <SelectItem value="jour">jour</SelectItem>
                        <SelectItem value="semaine">semaine</SelectItem>
                    </SelectContent>
                    </Select>
                    )
              }

                    {formik.values.duration === "heure" &&
                     durations.map((duration) => (
                        <button
                          key={duration.value}
                          type="button"
                          className={`py-2 px-4 me-1 text-sm rounded-md button-hover-effect ${
                            formik.values.subDuration === duration.label
                              ? "bg-coworking-primary text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                          onClick={() => formik.setFieldValue("subDuration", duration.label)}
                        >
                          {duration.label}
                        </button>
                      ))
                    }
                  <span className='mt-2 text-red-600 block'>{(formik.touched.duration && formik.errors.duration) || (formik.touched.subDuration && formik.errors.subDuration)}</span>
            </div>

            {/* Equipment Section */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                Équipement mis à disposition
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {equipmentOptions.map((equipment) => (
                  <div key={equipment.label} className="flex items-center space-x-2">
                    <Checkbox
                      id={equipment.label}
                      checked={formik.values.equipment.includes(equipment.label)}
                      onCheckedChange={(checked) => handleEquipmentChange(equipment.label, checked)}
                      className="border-gray-300 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                    />
                    <Label
                      htmlFor={equipment.label}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {equipment.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability Section */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                Disponibilité
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {availabilityOptions.map((availability) => (
                  <div key={availability.label} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={availability.label}
                      name="availability"
                      value={availability.label}
                      checked={formik.values.availability === availability.label}
                      onChange={() => formik.setFieldValue('availability', availability.label)}
                      className="w-4 h-4 text-amber-600 border-gray-300 focus:ring-amber-500"
                    />
                    <Label
                      htmlFor={availability.label}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {availability.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Yes/No Options Section */}
            <div className="space-y-4">
              {/* Coffee & Snacks */}
              <div>
              <div className="flex items-center justify-between py-2">
                <Label className="text-sm font-medium text-gray-700">
                  Offert (café, collations)
                </Label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${
                      formik.values.coffeeSnacks
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => formik.setFieldValue('coffeeSnacks', 1)}
                  >
                    Oui
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${
                      !formik.values.coffeeSnacks
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => formik.setFieldValue('coffeeSnacks', 0)}
                  >
                    Non
                  </button>
                </div>
                
              </div>
              {formik.values.coffeeSnacks &&
              offertOptions.map((equipment) => (
                  <div key={equipment.label} className="flex items-center space-x-2">
                    <Checkbox
                      id={equipment.label}
                      checked={formik.values.coffeesSnacks.includes(equipment.label)}
                      onCheckedChange={(checked) => handleCoffeeChange(equipment.label, checked)}
                      className="border-gray-300 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                    />
                    <Label
                      htmlFor={equipment.label}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {equipment.label}
                    </Label>
                  </div>
                ))
                }
              
              
              </div>

              {/* Meeting Room */}
              <div className="flex items-center justify-between py-2">
                <Label className="text-sm font-medium text-gray-700">
                  Salles de réunion
                </Label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${
                      formik.values.meetingRoom
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => formik.setFieldValue('meetingRoom', 1)}
                  >
                    Oui
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${
                      !formik.values.meetingRoom
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => formik.setFieldValue('meetingRoom', 0)}
                  >
                    Non
                  </button>
                </div>
              </div>

              {/* Events Invitation */}
              <div className="flex items-center justify-between py-2">
                <Label className="text-sm font-medium text-gray-700">
                  Invitation aux événements et au réseau d'investisseur
                </Label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${
                      formik.values.eventsInvitation
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => formik.setFieldValue('eventsInvitation', 1)}
                  >
                    Oui
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${
                      !formik.values.eventsInvitation
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => formik.setFieldValue('eventsInvitation', 0)}
                  >
                    Non
                  </button>
                </div>
              </div>

              {/* Offshore Creation */}
              <div className="flex items-center justify-between py-2">
                <Label className="text-sm font-medium text-gray-700">
                  Création Société Offshore
                </Label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${
                      formik.values.offshoreCreation
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => formik.setFieldValue('offshoreCreation', 1)}
                  >
                    Oui
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${
                      !formik.values.offshoreCreation
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => formik.setFieldValue('offshoreCreation', 0)}
                  >
                    Non
                  </button>
                </div>
              </div>

              {/* Mail Alert */}
              <div className="flex items-center justify-between py-2">
                <Label className="text-sm font-medium text-gray-700">
                  Alerte Courriers Par E-Mail
                </Label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${
                      formik.values.mailAlert
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => formik.setFieldValue('mailAlert', 1)}
                  >
                    Oui
                  </button>
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm rounded-md transition-colors ${
                      !formik.values.mailAlert
                        ? "bg-red-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => formik.setFieldValue('mailAlert', 0)}
                  >
                    Non
                  </button>
                </div>
              </div>
            </div>

            {membership.title === "personnalisé" &&
              <></>
            }

            {/* Action buttons */}
            <div className="flex gap-4 pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="flex-1 h-12 bg-white border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors duration-200"
              >
                Annuler
              </Button>
              <Button 
                type="submit" 
                className="flex-1 h-12 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 border-0"
              >
                Confirmer la réservation
              </Button>
            </div>
          </div>
        </form>

        {/* Subtle bottom accent */}
        <div className="h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"></div>
      </DialogContent>
    </Dialog>
  );
};

export default MembershipDialogCustom;