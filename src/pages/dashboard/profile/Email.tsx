
import { useState } from 'react';
import { Label } from '@/components/ui/label.js';
import { AxiosToken } from '../../../API/Api'
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import * as Yup from "yup";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Le mot de passe est requis"),
  email: Yup.string()
    .required("Le email est requis")
    .email(),
});



const Email = () => {
  const [error,setError] = useState({});

  const navigate = useNavigate()
  const { toast } = useToast();
   
    const formik = useFormik({
      enableReinitialize:true,
      initialValues:{
        password:"",
        email:""
      },
      validationSchema,
      onSubmit: async (values)=>{
        try{
          await AxiosToken.put("/auth/update/email",values);
          toast({
            title: "mis a jour réussie",
          });
          setTimeout(()=>{
            navigate("/dashboard/profile")
          },2000)
        }catch(error){
         setError(error.status)
          
        }
      }
    })

  return (
    <div className="max-w-3xl mt-10 p-6 ">
      <form onSubmit={formik.handleSubmit}>
      <div className='mb-8 w-full'>
        <h1 className='text-2xl font-bold mb-8'>Modifier e-mail</h1>
        <div className='mb-3 flex gap-4'>
          <div className='flex flex-col w-1/2'>
            <Label>Mot de passe actuel</Label>
            <input name='password' type='password' value={formik.values.password} onChange={(e) => {formik.handleChange(e);setError(null)}} className={`w-full mt-4 border border-gray-300 outline-none p-2 rounded-xl ${((formik.touched.password && formik.errors.password || error === 401)) && "border-red-600"}`}/>
            <span className='text-red-600'>{formik.touched.password && formik.errors.password}</span>
            <span className='text-red-600'>{error === 401 && "mot de passe est invalide"}</span>
          
          </div>
        </div>
        <div className='mb-3 w-[50%] flex flex-col'>
            <Label>Nouvel email</Label>
             <input name='email' value={formik.values.email} onChange={(e) => {formik.handleChange(e);setError(null)}} className={`w-full mt-4 border border-gray-300 outline-none p-2 rounded-xl ${((formik.touched.email && formik.errors.email || (error === 400 || error === 422))) && "border-red-600"}`}/>
            <span className='text-red-600'>{formik.touched.email && formik.errors.email}</span>
            <span className='text-red-600'>{error === 400 && "vous déja utlise cette email"}</span>
            <span className='text-red-600'>{error === 422 && "cette email déja existe"}</span>
        </div>
        <Button className='bg-black text-white p-4 me-3 hover:bg-gray-900'>Modifier email</Button>
      </div>
      </form>
    </div>
  );
};

export default Email;
