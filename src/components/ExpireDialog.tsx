import { TriangleAlert } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import Cookies from "universal-cookie";
import { useEffect } from "react";

interface expireDialogProp{
    open:boolean,
    setOpen:(open:boolean)=>void
}
const ExpireDialog = ({open,setOpen}:expireDialogProp) => {
    const cookie = new Cookies();
   useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        cookie.remove("auth");
        setOpen(false);
        window.location.href = "/";
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent className="p-3 bg-white">
            <DialogHeader>
                <DialogTitle>
                    <span>Your session has expired</span>
                </DialogTitle>
            </DialogHeader>
                    <div className="flex p-5">
                        <span className="me-3">Please log in again to continue using the app.</span>
                        <TriangleAlert className=" text-yellow-500" />
                    </div>
                    <div className="flex w-full justify-end px-5">
                        <div className="animate-spin rounded-full h-5  w-5 border-b-2 border-gray-600"></div>
                    </div>
        </DialogContent>
    </Dialog>
  )
}

export default ExpireDialog