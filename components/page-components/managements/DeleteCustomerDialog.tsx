"use client";

import { useState } from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerTitle, DrawerDescription, DrawerHeader, DrawerClose, DrawerContent, DrawerFooter } from "@/components/ui/drawer";

const DeleteCustomerDialog = ({ open, setOpen, setCustomers }: { open: { status: boolean, id: number | null, name: string | null }, setOpen: (open: { status: boolean, id: number | null, name: string | null }) => void, setCustomers: (customers: any) => void }) => {
    const isMobile = useIsMobile()

    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);
        setTimeout(() => {
            setCustomers((customers: any) => customers.filter((customer: any) => Number(customer.id) !== Number(open.id)));
            setOpen({ status: false, id: null, name: null });
            setLoading(false);
            toast.success('Customer has been deleted')
        }, 1000);
    }

    if (isMobile) {
        return (
            <Drawer open={open.status} onOpenChange={() => setOpen({ status: false, id: null, name: null })}>
                <DrawerContent className="pb-10">
                    <DrawerHeader className="text-left">
                        <DrawerTitle>আপনি কি &quot;<strong className="text-red-600 font-bold italic">{open.name}</strong> &quot; কে Delete করতে চান?</DrawerTitle>
                        <DrawerDescription >
                            একবার Delete করার পর আপনি পুনরায় আর পেতে পারবেন না।
                        </DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter className="pt-20">
                        <Button className="w-full py-6" variant="destructive" onClick={handleDelete} disabled={loading}>{loading ? "Deleting..." : "Delete"}</Button>
                        <DrawerClose asChild>
                            <Button className="w-full py-6" variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }
    return (
        <AlertDialog open={open.status} onOpenChange={() => setOpen({ status: false, id: null, name: null })}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>আপনি কি &quot;<strong className="text-red-600 font-bold italic">{open.name}</strong> &quot; কে Delete করতে চান?</AlertDialogTitle>
                    <AlertDialogDescription className="pt-2 pb-5">
                        একবার Delete করার পর আপনি পুনরায় আর পেতে পারবেন না।
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen({ status: false, id: null, name: null })}>Cancel</AlertDialogCancel>
                    <Button variant="destructive" onClick={handleDelete} disabled={loading}>{loading ? "Deleting..." : "Delete"}</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteCustomerDialog;
