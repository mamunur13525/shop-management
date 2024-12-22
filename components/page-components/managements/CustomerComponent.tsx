"use client";

import React, { useState } from "react";
import { CustomerTable } from "./CustomerTable";
import { demoCustomerList } from "@/demo/demo-user";
import { Customer } from "@/lib/types";
import AddCustomerDialoge from "./AddCustomerDialoge";
import DeleteCustomerDialog from "./DeleteCustomerDialog";

const CustomerComponent = () => {
    const [customers, setCustomers] = useState<Customer[]>(demoCustomerList);
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState<{ status: boolean, id: string | null }>({ status: false, id: null });

    const handleDeleteCustomer = (customerId: string) => {
        console.log({ customerId });
        setDeleteOpen({ status: true, id: customerId });
    };

    return (
        <div>
            <DeleteCustomerDialog setCustomers={setCustomers} open={deleteOpen} setOpen={setDeleteOpen} />
            <AddCustomerDialoge setCustomers={setCustomers} open={open} setOpen={setOpen} />
            <CustomerTable
                customers={customers}
                handleAddCustomer={() => setOpen(true)}
                handleDeleteCustomer={handleDeleteCustomer}
            />
        </div>
    );
};

export default CustomerComponent;
