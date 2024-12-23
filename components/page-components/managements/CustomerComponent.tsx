"use client";

import React, { useState } from "react";
import { CustomerTable } from "./CustomerTable";
import { demoCustomerList } from "@/demo/demo-user";
import { Customer } from "@/lib/types";
import DeleteCustomerDialog from "./DeleteCustomerDialog";
import CustomerActionDialoge from "./CustomerActionDialoge";
import ShowCustomerInfoDialog from "./ShowCustomerInfoDialog";

const CustomerComponent = () => {
    const [customers, setCustomers] = useState<Customer[]>(demoCustomerList);
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState<{
        status: boolean;
        id: number | null;
        name: string | null;
    }>({ status: false, id: null, name: null });
    const [editOpen, setEditOpen] = useState<{
        status: boolean;
        customer: Customer;
    }>({ status: false, customer: {} as Customer });
    const [showCustomerInfoOpen, setShowCustomerInfoOpen] = useState<{
        status: boolean;
        customer: Customer | null;
    }>({ status: false, customer: null });


    const handleDeleteCustomer = (customer: Customer) => {
        console.log({ customer });
        setDeleteOpen({ status: true, id: customer.id, name: customer.name });
    };

    const handleEditCustomer = (customer: Customer) => {
        console.log({ customer });
        setEditOpen({ status: true, customer });
    };

    const handleShowCustomerInfo = (customer: Customer) => {
        console.log({ customer });
        setShowCustomerInfoOpen({ status: true, customer });
    };

    return (
        <div>
            <DeleteCustomerDialog
                setCustomers={setCustomers}
                open={deleteOpen}
                setOpen={setDeleteOpen}
            />
            {
                (open || editOpen.status) && (
                    <CustomerActionDialoge
                        setCustomers={setCustomers}
                        open={open || editOpen.status}
                        setOpen={() => {
                            if (open) {
                                setOpen(false);
                            }
                            if (editOpen.status) {
                                setEditOpen({ status: false, customer: {} as Customer });
                            }
                        }}
                        customer={editOpen.customer || {}}
                    />
                )}
            <ShowCustomerInfoDialog
                open={showCustomerInfoOpen.status}
                setOpen={() => setShowCustomerInfoOpen({ status: false, customer: null })}
                customer={showCustomerInfoOpen.customer}
            />
            <CustomerTable
                customers={customers}
                handleAddCustomer={() => setOpen(true)}
                handleDeleteCustomer={handleDeleteCustomer}
                handleEditCustomer={handleEditCustomer}
                handleShowCustomerInfo={handleShowCustomerInfo}
            />
        </div>
    );
};

export default CustomerComponent;
