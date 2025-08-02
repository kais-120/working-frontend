
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AxiosToken } from '@/API/Api';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useState } from 'react';
import { Label } from './ui/label';
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Le nom est requis")
    .min(3, "Le nom doit comporter au moins 3 caractères"),

  last_name: Yup.string()
    .required("Le prénom est requis")
    .min(3, "Le prénom doit comporter au moins 3 caractères"),

  phone: Yup.string()
    .required("Le numéro de téléphone est requis")
    .matches(/^[0-9]{8}$/, "Le numéro doit contenir exactement 8 chiffres"),

  email: Yup.string()
    .required("L'e-mail est requis")
    .email("Adresse e-mail invalide"),

  password: Yup.string()
    .required("Le mot de passe est requis")
    .min(6, "Le mot de passe doit comporter au moins 6 caractères"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Les mots de passe ne correspondent pas")
    .required("La confirmation du mot de passe est requise"),
});

interface AddNewsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddNews: (news: any) => void;
  onChange: (change: number) => void;
}

const AddNewsOwner = ({ open, onOpenChange,onChange }: AddNewsDialogProps) => {
  const [IsSubmitting,setIsSubmitting] = useState(false)
  const [emailError,setEmailError] = useState(false)
   const formik = useFormik({
      initialValues:{
        name: "",
        last_name: "",
        phone:"",
        email:"",
        password:"" ,
        confirmPassword:""
      },
      validationSchema,
      onSubmit : async (values) => {
        try {
          setIsSubmitting(true);
          await AxiosToken.post("/user/add/owner", values);
          onOpenChange(false)
          onChange(prev => prev + 1)
        } catch (error) {
          if(error.status === 422){
            setEmailError(true)
          }       
        }finally {
          setIsSubmitting(false);
        }
      }
    })


  return (
    <Dialog  open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-600">
            Nouvelle Proriétaire
          </DialogTitle>
          <DialogDescription>
            Créez une nouvelle Proriétaire
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nom *</Label>
            <Input
              id="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder="Nom"
            />
          </div>
          <span className='mt-3 text-red-600'>{formik.touched.name && formik.errors.name}</span>
          <div className="space-y-2">
            <Label htmlFor="last_name">Prénom *</Label>
              <Input
                  id="last_name"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  placeholder="Prénom"
                />
          </div>
          <span className='mt-3 text-red-600'>{formik.touched.last_name && formik.errors.last_name}</span>
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
              <Input
                  id="email"
                  value={formik.values.email}
                  onChange={(e) => {formik.handleChange(e);setEmailError(false)}}
                  placeholder="Email"
                />
          </div>
          <span className='mt-3 text-red-600'>{formik.touched.email && formik.errors.email}</span>
          <span className='mt-3 text-red-600'>{emailError && "Cet e-mail est déjà utilisé."}</span>
          <div className="space-y-2">
            <Label htmlFor="phone">Numero de Téléphone *</Label>
              <Input
                  id="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  placeholder="Numero de Téléphone"
                />
          </div>
          <span className='mt-3 text-red-600'>{formik.touched.phone && formik.errors.phone}</span>
          <div className="space-y-2">
            <Label htmlFor="password">Mot de Passe *</Label>
              <Input
                  id="password"
                  value={formik.values.password}
                  type='password'
                  onChange={formik.handleChange}
                  placeholder="Mot de Passe"
                />
          </div>
          <span className='mt-3 text-red-600'>{formik.touched.password && formik.errors.password}</span>
          <div className="space-y-2">
            <Label htmlFor="password">confrime Mot de Passe *</Label>
              <Input
                  id="confirmPassword"
                  value={formik.values.confirmPassword}
                  type='password'
                  onChange={formik.handleChange}
                  placeholder="confrime Mot de Passe"
                />
          </div>
          <span className='mt-3 text-red-600'>{formik.touched.confirmPassword && formik.errors.confirmPassword}</span>
        

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              {IsSubmitting ? "Créer..." : "Créer Proriétaire"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewsOwner;
