"use client";

import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const DeleteCustomerDialog = ({ open, setOpen, setCustomers }: { open: { status: boolean, id: string | null }, setOpen: (open: { status: boolean, id: string | null }) => void, setCustomers: (customers: any) => void }) => {
    const [loading, setLoading] = useState(false);
    console.log({ open });
    const handleDelete = () => {
        setLoading(true);
        setTimeout(() => {
            setCustomers((customers: any) => customers.filter((customer: any) => Number(customer.id) !== Number(open.id)));
            setOpen({ status: false, id: null });
            setLoading(false);
            toast.success('Customer has been deleted')
        }, 1000);
    }
    
    return (
        <AlertDialog open={open.status} onOpenChange={() => setOpen({ status: false, id: null })}>
            <AlertDialogTrigger>Open</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setOpen({ status: false, id: null })}>Cancel</AlertDialogCancel>
                    <Button variant="destructive" onClick={handleDelete} disabled={loading}>{loading ? "Deleting..." : "Delete"}</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteCustomerDialog;
