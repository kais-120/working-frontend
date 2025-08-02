

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Star, MessageSquare, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from './ui/input';



interface ReviewDialogProps {
  spaceId: number;
  onOpenChange:(open: boolean) => void,
  open:boolean,
  review:string
}

const ReviewTextDialog = ({ review, onOpenChange, open }: ReviewDialogProps) => {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
       
      </DialogTrigger>
      
      <DialogContent className="max-w-md bg-gradient-to-br from-white to-slate-50 border-0 shadow-2xl">
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Détails de l'avis 
          </DialogTitle>
        </DialogHeader>      
          <div className="space-y-3">
            <Label htmlFor="comment" className="text-sm font-semibold text-gray-700">
              Avis
            </Label>
          <p>{review}</p>
          </div>
  
      </DialogContent>
    </Dialog>
  );
};

export default ReviewTextDialog;
