
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Axios } from '../API/Api';
import * as Yup from 'yup';
import  { useFormik } from 'formik'
import Cookies from 'universal-cookie'

const validationSchema = Yup.object().shape({
  email:Yup.string().required("email est requis"),
  password:Yup.string().required("mode de passe est requis"),
})

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword,setShowPassword] = useState(false);
  const cookie = new Cookies()

  
  const { toast } = useToast();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues:{
      email:"",
      password:"",
      remember:false
    },
    validationSchema,
    onSubmit : async (values)=>{
      try {
        setIsSubmitting(true)
        const response = await Axios.post(`/auth/login`, values);
        if (response.status === 200) {
          toast({
            title: "Connexion réussie",
            description: "Bienvenue sur Djerba coworking !",
          });
          cookie.set("auth",response.data.token)
          window.location.href = "/"
        }
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue. Veuillez réessayer.",
          variant: "destructive",
        });
    }finally{
      setIsSubmitting(false)
    }
  }
});
  
  useEffect(()=>{

     if (formik.submitCount > 0 && (formik.errors.email || formik.errors.password)) {
      toast({
        title: "Champs obligatoires",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
    }
    
  },[])
 
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container-custom">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Link to="/" className="text-2xl font-bold text-coworking-primary mb-2 inline-block">
              Djerba coworking
            </Link>
            <h1 className="text-3xl font-bold mb-2">
            Connexion
            </h1>
            <p className="text-gray-600">
               Connectez-vous pour accéder à votre compte
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={formik.handleSubmit}>
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
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="mb-6">            
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    checked={formik.values.remember}
                    onChange={formik.handleChange}
                    className="border-gray-300 rounded me-3 focus:ring-coworking-primary focus:border-coworking-primary"
                  />
                  Remember moi
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
                    Connexion en cours...
                  </>
                ) : (
                  "Se connecter"
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
                Vous n'avez pas de compte ?
                <button
                  type="button"
                  className="ml-1 text-coworking-primary font-medium hover:underline"
                  onClick={()=>{navigate("/register")}}
                >
                  S'inscrire
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

export default Login;
