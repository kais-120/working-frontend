
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Axios } from '../API/Api';
import * as Yup from "yup";
import { useFormik } from 'formik';

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

const Register = () => {
  const [emailError, setEmailError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowPConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  
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
        const response = await Axios.post("/auth/register", values);
        if (response.status === 201) {
          toast({
            title: "Inscription réussie",
            description: "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.",
          });
          setEmailError(false);
          setTimeout(()=>{
          navigate("/login")
        },2000)
        }
      } catch (error) {
        if(error.status === 422){
          setEmailError(true)
        }
        else{
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
          variant: "destructive",
        });
        
      }
      }finally {
        setIsSubmitting(false);
      }
    }
  })
  
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Link to="/" className="text-2xl font-bold text-coworking-primary mb-2 inline-block">
              Djerba coworking
            </Link>
            <h1 className="text-3xl font-bold mb-2">
               Inscription
            </h1>
            <p className="text-gray-600">
             
              Créez votre compte pour rejoindre notre communauté
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-coworking-primary focus:border-coworking-primary"
                    placeholder="Votre nom"
                  />
                  <span className='mt-3 text-red-600'>{formik.touched.name && formik.errors.name}</span>
                </div>
                  <div className="mb-6">
                  <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-coworking-primary focus:border-coworking-primary"
                    placeholder="Votre prénom"
                    
                  />
                  <span className='mt-3 text-red-600'>{formik.touched.last_name && formik.errors.last_name}</span>
                </div> 
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse e-mail
                </label>
                <input
                  type="text"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-coworking-primary focus:border-coworking-primary"
                  placeholder="votre@email.com"
                />
                <span className='mt-3 text-red-600'>{formik.touched.email && formik.errors.email}</span>
                <span className='mt-3 text-red-600'>{emailError && "Cet e-mail est déjà utilisé."}</span>
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Numéro de téléphone
                </label>
                <input
                  type="text"
                  id="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-coworking-primary focus:border-coworking-primary"
                  placeholder="12345678"
                />
                <span className='mt-3 text-red-600'>{formik.touched.phone && formik.errors.phone}</span>

              </div>
              {/* Password */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-coworking-primary focus:border-coworking-primary"
                    placeholder="********"
                    
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <span className='mt-3 text-red-600'>{formik.touched.password && formik.errors.password}</span>

              </div>
                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmer le mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-coworking-primary focus:border-coworking-primary"
                      placeholder="********"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPConfirmPassword(prev => !prev)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <span className='mt-3 text-red-600'>{formik.touched.confirmPassword && formik.errors.confirmPassword}</span>
                </div>         
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full btn-primary flex justify-center items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Inscription en cours...
                  </>
                ) : (
                 "S\'inscrire"
                )}
              </button>
            </form>
            
            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <div className="px-3 text-sm text-gray-500">ou</div>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>
            
            
            
            {/* Toggle Form */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
               Vous avez déjà un compte ?
                <button
                  type="button"
                  className="ml-1 text-coworking-primary font-medium hover:underline"
                  onClick={()=>navigate("/login")}
                >
                  Se connecter
                </button>
              </p>
            </div>
          </div>
          
          {/* Home Link */}
          <div className="text-center mt-6">
            <Link to="/" className="text-gray-600 hover:text-coworking-primary inline-flex items-center">
              <ArrowRight className="mr-2 rotate-180" size={16} />
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
