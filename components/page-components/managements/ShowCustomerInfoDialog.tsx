import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import { Customer } from '@/lib/types';
import React from 'react';

const ShowCustomerInfoDialog = ({ open, setOpen, customer = null }: { open: boolean, setOpen: (open: boolean) => void, customer: Customer | null }) => {
    const isMobile = useIsMobile()

    if (isMobile) {
        return <Drawer open={open} onOpenChange={setOpen}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Customer Information</DrawerTitle>
                </DrawerHeader>
                <div className="py-4 px-6">   
                    <ShowCustomerInfo customer={customer} />
                </div>
            </DrawerContent>
        </Drawer>
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Customer Information</DialogTitle>
                </DialogHeader>
                <ShowCustomerInfo customer={customer} />
            </DialogContent>
        </Dialog>
    );
};

export default ShowCustomerInfoDialog;


const ShowCustomerInfo = ({ customer = null }: { customer: Customer | null }) => {
    if (!customer) return (
        <p className="text-center text-sm text-muted-foreground">No customer found</p>
    );
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
                <label className="text-sm font-bold text-muted-foreground">ID</label>
                <p className="text-base">{customer.id}</p>
            </div>
            <div className="flex flex-col space-y-1">
                <label className="text-sm font-bold text-muted-foreground">Name</label>
                <p className="text-base">{customer.name}</p>
            </div>
            <div className="flex flex-col space-y-1">
                <label className="text-sm font-bold text-muted-foreground">Mobile</label>
                <p className="text-base">{customer.mobile}</p>
            </div>
            <div className="flex flex-col space-y-1">
                <label className="text-sm font-bold text-muted-foreground">Address</label>
                <p className="text-base">{customer.address}</p>
            </div>
            <div className="flex flex-col space-y-1">
                <label className="text-sm font-bold text-muted-foreground">Amount</label>
                <p className="text-base">{customer.amount}</p>
            </div>
        </div>
    )
}