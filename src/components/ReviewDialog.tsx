

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star, MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from './ui/input';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { AxiosToken } from '@/API/Api';


const validationSchema = Yup.object().shape({
  rating: Yup.number()
    .required("Veuillez sélectionner une note")
    .min(1, "La note minimale est 1")
    .max(5, "La note maximale est 5"),
  review: Yup.string()
    .max(1000, "Le commentaire ne peut pas dépasser 1000 caractères")
    .required("commentaire est requis"),
  position: Yup.string()
    .required("commentaire est requis"),
});

interface ReviewDialogProps {
  onOpenChange:(open: boolean) => void,
  open:boolean,
}

const ReviewDialog = ({ onOpenChange, open }: ReviewDialogProps) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const formik = useFormik({
    initialValues:{
      review:"",
      rating:"",
      position:""
    },
    validationSchema,
    onSubmit: async (values) => {
      try{
        await AxiosToken.post("/review/add",values);
       
      onOpenChange(false)
      }
      catch(err){
        console.error(err);
        
      }

    }
  })

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
       
      </DialogTrigger>
      
      <DialogContent className="max-w-md bg-gradient-to-br from-white to-slate-50 border-0 shadow-2xl">
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Noter Avis
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Partagez votre expérience avec la communauté
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Rating Section */}
          <div className="text-center space-y-3">
            <Label className="text-sm font-semibold text-gray-700">Votre note</Label>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="transition-all duration-200 hover:scale-110"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() =>{ handleStarClick(star);formik.setFieldValue("rating",star)}}
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    } transition-colors duration-200`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-600">
                {rating === 1 ? 'Très insatisfait' :
                 rating === 2 ? 'Insatisfait' :
                 rating === 3 ? 'Moyen' :
                 rating === 4 ? 'Satisfait' :
                 'Très satisfait'}
              </p>
            )}
          </div>

          {/* poste Section */}
          <div className="space-y-3">
            <Label htmlFor="poste" className="text-sm font-semibold text-gray-700">
              votre poste
            </Label>
            <Input
              id="position"
              value={formik.values.position}
              onChange={formik.handleChange}
              placeholder="Décrivez votre poste..."
              className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 bg-white/80"
            />
          </div>
          <div className="space-y-3">
            <Label htmlFor="comment" className="text-sm font-semibold text-gray-700">
              Votre commentaire
            </Label>
            <Textarea
              id="review"
              value={formik.values.review}
              onChange={formik.handleChange}
              placeholder="Décrivez votre expérience..."
              className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl transition-all duration-300 bg-white/80"
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Envoi en cours...
              </div>
            ) : (
              <div className="flex items-center">
                <Send className="h-5 w-5 mr-2" />
                Envoyer l'avis
              </div>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
