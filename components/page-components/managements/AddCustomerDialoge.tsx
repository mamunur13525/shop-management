import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Customer } from "@/lib/types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddCustomerDialoge = ({
  open,
  setOpen,
  setCustomers,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setCustomers: any;
}) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      console.log(data);
      // Simulate an API call
      await new Promise((resolve) =>
        setTimeout(() => {
          setCustomers((customers: Customer[]) => {
            return [...customers, data];
          });
          resolve(true);
          setOpen(false);
        }, 2000)
      );
      // You can add logic here to update customers
      // setCustomers([...existingCustomers, data]);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Customer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter customer name"
                  {...register("name")}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="mobile" className="text-sm font-medium">
                  Mobile Number
                </label>
                <Input
                  id="mobile"
                  placeholder="Enter mobile number"
                  {...register("mobile")}
                  type="number"
                  maxLength={11}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Address
                </label>
                <Textarea
                  className="h-24"
                  id="address"
                  placeholder="Enter address"
                  {...register("address")}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">
                  Amount
                </label>
                <Input
                  className="w-full"
                  id="amount"
                  placeholder="Enter amount"
                  {...register("amount")}
                  type="number"
                />
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button className="px-7" type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomerDialoge;
