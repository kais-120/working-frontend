
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label.js';
import { Lock, Mail } from 'lucide-react';
import Cookies from 'universal-cookie';
import { AxiosToken } from '../API/Api'
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import * as Yup from "yup";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
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
});

interface User{
  name:string,
  last_name:string,
  phone:string,
  email:string
}

const Profile = () => {
  const [loading,setLoading] = useState(true)
  const [user, setUser] = useState <User>({
    name:"",
    last_name:"",
    phone:"",
    email:""
  });
  const navigate = useNavigate()
  const cookie = new Cookies();
     const token = cookie.get("auth")
       const { toast } = useToast();
   
     useEffect(() => {
       AxiosToken.get("/auth/profile")
       .then((response)=>{
         setUser(response.data);
       }).catch((err)=>console.error(err))
       .finally(()=>{setLoading(false)})
   
     }, [token]);
    const formik = useFormik({
      enableReinitialize:true,
      initialValues:{
        name:user?.name || "",
        last_name:user?.last_name || "",
        phone:user?.phone || "",
      },
      validationSchema,
      onSubmit: async (values)=>{
        try{
          await AxiosToken.put("/auth/update/information",values);
          toast({
            title: "mis a jour réussie",
          });
        }catch{
          toast({
          title: "Erreur",
          description: "Une erreur est survenue. Veuillez réessayer.",
          variant: "destructive",
        });
          
        }
      }
    })

if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mt-10 p-6 ">
      <form onSubmit={formik.handleSubmit}>
      <div className='mb-8 w-full'>
        <h1 className='text-2xl font-bold mb-8'>Données personnelles</h1>
        <div className='mb-3 flex gap-4'>
          <div className='flex flex-col w-full'>
            <Label>Nom</Label>
            <input name='name' value={formik.values.name} onChange={formik.handleChange} className={`w-full mt-4 border border-gray-300 outline-none p-2 rounded-xl ${(formik.touched.name && formik.errors.name) && "border-red-600"}`}/>
            <span className='text-red-600'>{formik.touched.name && formik.errors.name}</span>
          
          </div>
          <div className='flex flex-col w-full'>
            <Label>Prénom</Label>
             <input name='last_name' value={formik.values.last_name} onChange={formik.handleChange} className={`w-full mt-4 border border-gray-300 outline-none p-2 rounded-xl ${(formik.touched.last_name && formik.errors.last_name) && "border-red-600"}`}/>
            <span className='text-red-600'>{formik.touched.last_name && formik.errors.last_name}</span>
          </div>
        </div>
        <div className='mb-3 w-[50%] flex flex-col'>
            <Label>Phone</Label>
             <input name='phone' value={formik.values.phone} onChange={formik.handleChange} className={`w-full mt-4 border border-gray-300 outline-none p-2 rounded-xl ${(formik.touched.phone && formik.errors.phone) && "border-red-600"}`}/>
            <span className='text-red-600'>{formik.touched.phone && formik.errors.phone}</span>
        
        </div>
      </div>
      <div>
        <h1 className='text-2xl font-bold mb-8'>Informations du compte</h1>
        <div className='flex gap-3'>
          <div className='mb-3 w-full'>
            <div className='border border-gray-300 rounded-lg flex justify-between p-4'>
              <div className='flex'>
                <Mail className='me-2'/>
                <span className='text-black'>{user?.email}</span>
              </div>
              <span onClick={()=>navigate("email")}  className='cursor-pointer font-bold'>change</span>
            </div>       
          </div>
          <div className='mb-3 w-full'>
            <div className='border border-gray-300 rounded-lg flex justify-between p-4'>
              <div className='flex'>
                <Lock className='me-2'/>
                <span>Password</span>
              </div>
              <span onClick={()=>navigate("password")} className='cursor-pointer font-bold'>change</span>
            </div>       
          </div>
        </div>
        <Button className='bg-black text-white p-4 me-3 hover:bg-gray-900'>Enregister</Button>
      </div>
      </form>
    </div>
  );
};

export default Profile;
