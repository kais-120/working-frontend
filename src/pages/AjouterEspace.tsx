import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../compon  ents/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Plus,
  MapPin,
  Euro,
  Users,
  Building2,
  Sparkles,
  Check,
  AlertCircle,
} from "lucide-react";
import { useToast } from "../components/ui/use-toast";
import axios from "axios";
import { API_URL } from "../API/Api";

interface AddSpaceDialogProps {
  onSpaceAdded: () => void;
}

const AddSpaceDialog = ({ onSpaceAdded }: AddSpaceDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    price: "",
    capacity: "",
    equipements: "",
    image: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.name || !formData.location || !formData.price) {
        toast({
          title: "Erreur",
          description: "Veuillez remplir tous les champs obligatoires",
          variant: "destructive",
        });
        return;
      }

      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("description", formData.description);
      payload.append("location", formData.location);
      payload.append("price", formData.price);
      payload.append("capacity", formData.capacity || "1");
      payload.append("equipements", formData.equipements);
      if (formData.image) {
        payload.append("image", formData.image);
      }

      await axios.post(`${API_URL}/api/auth/space/add`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast({
        title: "Succès",
        description: "Espace ajouté avec succès!",
      });

      setFormData({
        name: "",
        description: "",
        location: "",
        price: "",
        capacity: "",
        equipements: "",
        image: null,
      });

      setOpen(false);
      onSpaceAdded();
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de l'espace",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          <span className="relative z-10 font-semibold">Ajouter un espace</span>
          <Sparkles className="h-4 w-4 ml-2 group-hover:scale-125 transition-transform duration-300" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-white via-slate-50 to-blue-50 border-0 shadow-2xl animate-in slide-in-from-bottom-4 duration-500">
        <DialogHeader className="text-center pb-6 border-b border-gradient-to-r from-transparent via-slate-200 to-transparent">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl shadow-lg">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
            Créer un nouvel espace
          </DialogTitle>
          <DialogDescription className="text-slate-600 text-lg mt-2">
            Remplissez les informations pour ajouter un espace de travail
            exceptionnel
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 mt-8">
          {/* Section Informations de base */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <div className="w-2 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full mr-3"></div>
              Informations de base
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3 group">
                <Label
                  htmlFor="name"
                  className="text-sm font-semibold text-slate-700 flex items-center"
                >
                  <Building2 className="h-4 w-4 mr-2 text-emerald-500" />
                  Nom de l'espace *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="ex: Salle de réunion Premium"
                  required
                  className="h-12 border-2 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl transition-all duration-300 hover:border-slate-300 bg-white/80"
                />
              </div>

              <div className="space-y-3 group">
                <Label
                  htmlFor="location"
                  className="text-sm font-semibold text-slate-700 flex items-center"
                >
                  <MapPin className="h-4 w-4 mr-2 text-emerald-500" />
                  Localisation *
                </Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="ex: Centre-ville Djerba"
                  required
                  className="h-12 border-2 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl transition-all duration-300 hover:border-slate-300 bg-white/80"
                />
              </div>
            </div>

            <div className="mt-6">
              <Label
                htmlFor="description"
                className="text-sm font-semibold text-slate-700 flex items-center mb-3"
              >
                <Sparkles className="h-4 w-4 mr-2 text-emerald-500" />
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Décrivez votre espace de manière attractive..."
                className="border-2 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl transition-all duration-300 hover:border-slate-300 bg-white/80 min-h-[100px]"
              />
            </div>
          </div>

          {/* Section Tarification et Capacité */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <div className="w-2 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full mr-3"></div>
              Tarification et Capacité
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label
                  htmlFor="price"
                  className="text-sm font-semibold text-slate-700 flex items-center"
                >
                  <Euro className="h-4 w-4 mr-2 text-blue-500" />
                  Prix par heure (Dt) *
                </Label>
                <div className="relative">
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="25"
                    required
                    className="h-12 pl-12 border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 hover:border-slate-300 bg-white/80"
                  />
                  <Euro className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
                </div>
              </div>

              <div className="space-y-3">
                <Label
                  htmlFor="capacity"
                  className="text-sm font-semibold text-slate-700 flex items-center"
                >
                  <Users className="h-4 w-4 mr-2 text-blue-500" />
                  Capacité (personnes)
                </Label>
                <div className="relative">
                  <Input
                    id="capacity"
                    name="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    placeholder="10"
                    className="h-12 pl-12 border-2 border-slate-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 hover:border-slate-300 bg-white/80"
                  />
                  <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500" />
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <p className="text-sm text-purple-700 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                Les coordonnées GPS permettront de localiser précisément votre
                espace sur la carte
              </p>
            </div>
          </div>

          {/* Section Équipements */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-slate-200/50">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
              <div className="w-2 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-3"></div>
              Équipements et Services
            </h3>

            <div className="space-y-3">
              <Label
                htmlFor="equipements"
                className="text-sm font-semibold text-slate-700 flex items-center"
              >
                <Sparkles className="h-4 w-4 mr-2 text-orange-500" />
                Équipements disponibles
              </Label>
              <Input
                id="equipements"
                name="equipements"
                value={formData.equipements}
                onChange={handleInputChange}
                placeholder="WiFi, Projecteur, Climatisation, Machine à café"
                className="h-12 border-2 border-slate-200 focus:border-orange-500 focus:ring-orange-500/20 rounded-xl transition-all duration-300 hover:border-slate-300 bg-white/80"
              />
            </div>

            <div className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
              <p className="text-sm text-orange-700 flex items-center">
                <Check className="h-4 w-4 mr-2" />
                Listez tous les équipements pour attirer plus de clients
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4 pt-6 border-t border-slate-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 h-12 border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-xl font-semibold transition-all duration-300"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 h-12 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Création en cours...
                </div>
              ) : (
                <div className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Créer l'espace
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSpaceDialog;
