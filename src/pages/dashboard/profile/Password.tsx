
import { useState } from 'react';
import { Label } from '@/components/ui/label.js';
import { AxiosToken } from '../../../API/Api'
import { useFormik } from 'formik';
import { Button } from '@/components/ui/button';
import * as Yup from "yup";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
const validationSchema = Yup.object().shape({
  current_password: Yup.string()
    .required("Le mot de passe est requis"),
  password: Yup.string()
    .required("Le password est requis"),
    confirm_password:Yup.string()
    .oneOf([Yup.ref("password"),null],"Les mots de passe ne correspondent pas")
    .required("La confirmation du mot de passe est requise"),
});



const Password = () => {
  const [error,setError] = useState({});

  const navigate = useNavigate()
  const { toast } = useToast();
   
    const formik = useFormik({
      enableReinitialize:true,
      initialValues:{
        current_password:"",
        password:"",
        confirm_password:""
      },
      validationSchema,
      onSubmit: async (values)=>{
        try{
          await AxiosToken.put("/auth/update/password",values);
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
        <h1 className='text-2xl font-bold mb-8'>Modifier Mot de passe</h1>
        <div className='mb-3 flex gap-4'>
          <div className='flex flex-col w-1/2'>
            <Label>Mot de passe actuel</Label>
            <input name='current_password' type='password' value={formik.values.current_password} onChange={(e) => {formik.handleChange(e);setError(null)}} className={`w-full mt-4 border border-gray-300 outline-none p-2 rounded-xl ${((formik.touched.current_password && formik.errors.current_password || error === 401)) && "border-red-600"}`}/>
            <span className='text-red-600'>{formik.touched.current_password && formik.errors.current_password}</span>
            <span className='text-red-600'>{error === 401 && "mot de passe invalide"}</span>
          
          </div>
        </div>
        <div className='mb-3 w-[50%] flex flex-col'>
            <Label>Nouvel mod de passe</Label>
             <input type='password' name='password' value={formik.values.password} onChange={(e) => {formik.handleChange(e);setError(null)}} className={`w-full mt-4 border border-gray-300 outline-none p-2 rounded-xl ${((formik.touched.password && formik.errors.password || (error === 400 || error === 422))) && "border-red-600"}`}/>
            <span className='text-red-600'>{formik.touched.password && formik.errors.password}</span>
        </div>
        <div className='mb-3 w-[50%] flex flex-col'>
            <Label>Confirmer le mot de passe</Label>
             <input type='password' name='confirm_password' value={formik.values.confirm_password} onChange={(e) => {formik.handleChange(e);setError(null)}} className={`w-full mt-4 border border-gray-300 outline-none p-2 rounded-xl ${((formik.touched.password && formik.errors.password || (error === 400 || error === 422))) && "border-red-600"}`}/>
            <span className='text-red-600'>{formik.touched.confirm_password && formik.errors.confirm_password}</span>
             <span className='text-red-600'>{error === 400 && "vous déja utlise cette password"}</span>
        </div>
        <Button className='bg-black text-white p-4 me-3 hover:bg-gray-900'>Modifier email</Button>
      </div>
      </form>
    </div>
  );
};

export default Password;
