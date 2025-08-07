
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { AxiosToken,IMAGE_URL } from "../API/Api"
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { fr } from 'date-fns/locale';
import { format } from 'date-fns';
import { Calendar, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar as DatePicker } from '@/components/ui/calendar';
import { useState } from 'react';


const validationSchema = yup.object().shape({
  title:yup.string().required("titre est requise"),
  content:yup.string().required("content est requise"),
  category:yup.string().required("category est requise"),
  status:yup.string().required("status est requise"),
  imageChange:yup.boolean(),
  image: yup.mixed().nullable().test(
  "image-required-if-deleted",
  "L’image est requise",
  function (value) {
    const { imageChange, image_url } = this.parent;
    if (imageChange && !value && !image_url) {
      return this.createError({ message: "L’image est requise" });
    }

    return true;
  }
),
  date_start:yup.string().test("event-date", "La date est requise",function (value){
    const { category } = this.parent
    if((category === "Événements" || category === "Promotions")&& !value){
      return false
    }
      else{
        return true
      }
  }),
  time_start:yup.string().test("event-time", "La time est requise pour les événements",function (value){
    const { category } = this.parent
    if(category === "Événements" && !value){
      return false
    }
      else{
        return true
      }
  }),
  date_end:yup.string().test("promo-date", "La date est requise pour les Promotions",function (value){
    const { category } = this.parent
    if(category === "Promotions" && !value){
      return false
    }
      else{
        return true
      }
  }),
})

interface UpdateNewsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddNews: (prev : any) => void;
  news:{
    id:number,
    titre:string,
    content:string,
    category:string,
    status:string,
    image:string,
    date_start:string,
    time_start:string,
    date_end:string,
  }
}

const UpdateNewsDialog = ({ open, onOpenChange, onAddNews,news }: UpdateNewsDialogProps) => {
  const [isEnter,setIsEnter] = useState(false);
  const formik = useFormik({
    enableReinitialize:true,
    initialValues:{
      title: news?.titre || '',
      content: news?.content || '',
      category: news?.category || '',
      status: news?.status || '',
      image:null,
      imageChange:false,
      image_url:news?.image || '',
      date_start:news?.date_start ||"",
      time_start:news?.time_start || "",
      date_end:news?.date_end ||"",
    },
    validationSchema,
    onSubmit : async (values) =>{
      const formData = new FormData();
      formData.append("titre",values.title)
      formData.append("content",values.content)
      formData.append("category",values.category)
      formData.append("status",values.status)
      formData.append("image",values.image)
      formData.append("imageChange",values.imageChange)
      formData.append("date_start",values.date_start)
      formData.append("time_start",values.time_start)
      formData.append("date_end",values.date_end)
      try{
        await AxiosToken.put(`/news/update/${news.id}`,formData);
        onAddNews(prev => prev + 1)
        onOpenChange(false)
      }catch(err){
        console.error(err)
      }
    }
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-600">
            Nouvelle Actualité
          </DialogTitle>
          <DialogDescription>
            Créez une nouvelle actualité pour informer vos utilisateurs
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Titre *</Label>
            <Input
              id="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              placeholder="Titre de l'actualité"
            />
            <span className='mt-3 text-red-600'>{formik.touched.title && formik.errors.title}</span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie *</Label>
            <Select value={formik.values.category} onValueChange={(value)=>formik.setFieldValue("category",value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une catégorie" />
              </SelectTrigger>
              <SelectContent className='bg-white cursor-pointer'>
                <SelectItem value="nouveautés">Nouveautés</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                <SelectItem value="événements">Événements</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="promotions">Promotions</SelectItem>
              </SelectContent>
            </Select>
              <span className='mt-3 text-red-600'>{formik.touched.category && formik.errors.category}</span>
          </div>
          {formik.values.category === "événements" ?
          <div>
            <div>
             <Label 
                htmlFor="startDate" 
              >
                Date d'événements *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      `w-full h-12 justify-start text-left font-normal bg-white border-gray-200  hover:bg-amber-50/30 transition-all duration-200 shadow-sm ${(formik.touched.date_start && formik.errors.date_start) && "border-red-600 hover:border-red-600" }`,
                      !formik.values.date_start && "text-gray-500"
                    )}
                  >
                    <Calendar className="mr-3 h-5 w-5 text-text-gray-500" />
                    {formik.values.date_start ? (
                      <span className="text-gray-900 font-medium">
                        {format(formik.values.date_start, "dd MMMM yyyy", { locale: fr })}
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
                    onSelect={(date) => {
                        formik.setFieldValue("date_start", date);
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    locale={fr}
                    className="p-4"
                  />
                </PopoverContent>
              </Popover>
              <span className='mt-3 text-red-600'>{formik.touched.date_start && formik.errors.date_start + " pour les Événements"}</span>
              </div>
              <div className="relative w-full max-w-sm space-y-2">
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Heure de début
                    </label>
                    <div className="relative">
                      <input
                        type="time"
                        id="time_start"
                        name="time_start"
                        value={formik.values.time_start}
                        onChange={formik.handleChange}
                        className="w-full pl-10 rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
                      />
                    </div>
                      <span className='mt-3 text-red-600'>{formik.touched.time_start && formik.errors.time_start}</span>
              </div>

          </div>
          : formik.values.category === "promotions" && 
          <div>
            <div>
            <Label 
                htmlFor="startDate" 
              >
                Date de debut *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      `w-full h-12 justify-start text-left font-normal bg-white border-gray-200  hover:bg-amber-50/30 transition-all duration-200 shadow-sm ${(formik.touched.date_start && formik.errors.date_start) && "border-red-600 hover:border-red-600" }`,
                      !formik.values.date_start && "text-gray-500"
                    )}
                  >
                    <Calendar className="mr-3 h-5 w-5 text-text-gray-500" />
                    {formik.values.date_start ? (
                      <span className="text-gray-900 font-medium">
                        {format(formik.values.date_start, "dd MMMM yyyy", { locale: fr })}
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
                    onSelect={(date) => {
                        formik.setFieldValue("date_start", date);
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    locale={fr}
                    className="p-4"
                  />
                </PopoverContent>
              </Popover>
                  <span className='mt-3 text-red-600'>{formik.touched.date_start && formik.errors.date_start + "pour les Promotions"}</span>
              </div>
              <div>
              <Label 
                htmlFor="startEnd" 
              >
                Date de fin *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button disabled={!formik.values.date_start}
                    variant="outline"
                    className={cn(
                      `w-full h-12 justify-start text-left font-normal bg-white border-gray-200  hover:bg-amber-50/30 transition-all duration-200 shadow-sm ${(formik.touched.date_start && formik.errors.date_start) && "border-red-600 hover:border-red-600" }`,
                      !formik.values.date_end && "text-gray-500"
                    )}
                  >
                    <Calendar className="mr-3 h-5 w-5 text-text-gray-500" />
                    {formik.values.date_end ? (
                      <span className="text-gray-900 font-medium">
                        {format(formik.values.date_end, "dd MMMM yyyy", { locale: fr })}
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
                    onSelect={(date) => {
                        formik.setFieldValue("date_end", date);
                    }}
                    disabled={(date) => date < new Date(formik.values.date_start)}
                    initialFocus
                    locale={fr}
                    className="p-4"
                  />
                </PopoverContent>
              </Popover>
                <span className='mt-3 text-red-600'>{formik.touched.date_end && formik.errors.date_end}</span>
              </div>
          </div>
          
          }

          <div className="space-y-2">
            <Label htmlFor="content">Contenu *</Label>
            <Textarea
              id="content"
              value={formik.values.content}
              onChange={formik.handleChange}
              placeholder="Contenu de l'actualité..."
              rows={6}
            />
              <span className='mt-3 text-red-600'>{formik.touched.content && formik.errors.content}</span>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
            <Select  value={formik.values.status} onValueChange={(value)=>formik.setFieldValue("status",value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className='bg-white'>
                <SelectItem value="unpublish">Brouillon</SelectItem>
                <SelectItem value="publish">Publié</SelectItem>
              </SelectContent>
            </Select>
              <span className='mt-3 text-red-600'>{formik.touched.status && formik.errors.status}</span>
          </div>

           <div className="space-y-2">
            {!formik.values.image_url ?
            <>
            <Label htmlFor="content">image *</Label>
            <Input
             type='file'
             onChange={(e)=>formik.setFieldValue("image",e.target.files[0])}
            />
              <span className='mt-3 text-red-600'>{formik.touched.image && formik.errors.image}</span>
            </> : 
            <div>
              <div onMouseEnter={()=>!isEnter && setIsEnter(true)} onMouseLeave={()=>isEnter && setIsEnter(false)} className='relative'>
                {isEnter && 
                <div onClick={()=>{isEnter && formik.setFieldValue("image_url",null);formik.setFieldValue("imageChange",true)}} className='absolute bg-black opacity-40 w-full h-full flex justify-center items-center cursor-pointer'>
                  <X className=' text-white text-lg' />
                </div>
                }
              <img src={`${IMAGE_URL}/${formik.values.image_url}`} alt='image' />
              </div>
            </div>
            }
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Créer l'actualité
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateNewsDialog;
