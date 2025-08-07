

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

import QRCode from "react-qr-code";
import { Button } from './ui/button';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PaymentReceiptPDF from '@/pages/dashboard/client/PdfPayment';



interface ReviewDialogProps {
  code : object;
  onOpenChange:(open: boolean) => void,
  open:boolean,
}

const CodeQrDialog = ({ payment, onOpenChange, open }: ReviewDialogProps) => {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
       
      </DialogTrigger>
      
      <DialogContent className="max-w-md bg-gradient-to-br from-white to-slate-50 border-0 shadow-2xl">
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-800">
          
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Code qr
          </DialogDescription>
        </DialogHeader>
        <div className='flex w-full flex-col items-center'>
        <QRCode value={payment.paymentBooking?.[0]?.references} />
        <p>ou</p>
        <Button>
        <PDFDownloadLink
              document={<PaymentReceiptPDF payment={payment} />}
                fileName={`Reçu Paiement-${payment?.users?.name}.pdf`}
                        className="btn btn-sm btn-outline-success px-3 rounded-pill"
                        >
                        Télécharger le PDF
                        </PDFDownloadLink>
                        </Button>
        </div>
        
      </DialogContent>
    </Dialog>
  );
};

export default CodeQrDialog;
