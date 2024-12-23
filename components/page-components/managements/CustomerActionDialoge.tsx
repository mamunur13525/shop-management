import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { Customer } from "@/lib/types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CustomerActionDialoge = ({
  open,
  setOpen,
  setCustomers,
  customer = {} as Customer
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setCustomers: (customers: any) => void;
  customer: Customer;
}) => {
  console.log({ customer })
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Omit<Customer, 'id'>>();
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile()

  const onSubmit = async (data: Omit<Customer, 'id'>) => {
    setLoading(true);
    try {
      await new Promise((resolve) =>
        setTimeout(() => {
          if (customer.id) {
            setCustomers((customers: Customer[]) => {
              const newCustomer = { ...data, id: customers.find((customer: Customer) => customer.id === customer.id)?.id }
              return [...customers, newCustomer];
            });
            toast.success(`Customer ${data.name} updated`);
          } else {
            setCustomers((customers: Customer[]) => {
              const newCustomer = { ...data, id: customers.length ? customers[customers.length - 1].id + 1 : 1 }
              return [...customers, newCustomer];
            });
            toast.success(<div>New Customer &quot;<strong>{data.name}</strong>&quot; added</div>);
          }

          resolve(true);
          reset();
          setOpen(false);
        }, 2000)
      );
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to add customer");
    } finally {
      setLoading(false);
    }
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="w-full" onInteractOutside={(e) => e.preventDefault()} >
          <DialogHeader>
            <DialogTitle className="text-center py-5">{customer.name ? "Edit" : "Add"} Customer</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4 px-5">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className=" text-sm font-medium">
                    Name <span className="text-red-600">*</span>
                  </label>
                  <Input
                    id="name"
                    placeholder="Enter customer name"
                    {...register("name", { required: "নাম দিতে হবে" })}
                    className="w-full py-6"
                  />
                  {errors.name && <span className="px-1 text-sm text-red-600">{errors.name?.message?.toString()}</span>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="mobile" className="text-sm font-medium">
                    Mobile Number <span className="text-red-600">*</span>
                  </label>
                  <Input
                    id="mobile"
                    placeholder="Enter mobile number"
                    {...register("mobile", {
                      required: "���োবাইল নম্বর দিতে হবে",
                      pattern: {
                        value: /^01\d{9}$/,
                        message: "মোবাইল নম্বর ১১ ডিজিটের হতে হবে এবং ০১ দিয়ে শুরু হতে হবে"
                      }
                    })}
                    type="text"
                    className="w-full py-6"
                  />
                  {errors.mobile && <span className="px-1 text-sm text-red-600">{errors.mobile?.message?.toString()}</span>}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">
                    Address <span className="text-red-600">*</span>
                  </label>
                  <Textarea
                    className="h-24 w-full"
                    id="address"
                    placeholder="Enter address"
                    {...register("address", { required: "এড্রেস দিতে হবে" })}
                  />
                  {errors.address && <span className="px-1 text-sm text-red-600">{errors.address?.message?.toString()}</span>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="amount" className="text-sm font-medium">
                    Amount <span className="text-red-600">*</span>
                  </label>
                  <Input
                    className="w-full py-6"
                    id="amount"
                    placeholder="Enter amount"
                    {...register("amount", { valueAsNumber: true, required: "এমাউন্ট দিতে হবে এবং ইংরেজিতে হতে হবে" })}
                    type="number"
                  />
                  {errors.amount && <span className="px-1 text-sm text-red-600">{errors.amount?.message?.toString()}</span>}
                </div>
              </div>
            </div>
            <div className="mt-20 pb-5 flex flex-col  gap-2 px-5">
              <Button className="px-7 py-6 w-full" type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="px-7 py-5 w-full"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DrawerContent>
      </Drawer>
    )
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Add Customer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name <span className="text-red-600">*</span>
                </label>
                <Input
                  id="name"
                  placeholder="Enter customer name"
                  {...register("name", { required: "নাম দিতে হবে" })}
                />
                {errors.name && <span className="px-1 text-sm text-red-600">{errors.name?.message?.toString()}</span>}
              </div>
              <div className="space-y-2">
                <label htmlFor="mobile" className="text-sm font-medium">
                  Mobile Number <span className="text-red-600">*</span>
                </label>
                <Input
                  id="mobile"
                  placeholder="Enter mobile number"
                  {...register("mobile", {
                    required: "মোবাইল নম্বর দিতে হবে",
                    pattern: {
                      value: /^01\d{9}$/,
                      message: "মোবাইল নম্বর ১১ ডিজিটের হতে হবে এবং ০১ দিয়ে শুরু হতে হবে"
                    }
                  })}
                  type="text"
                />
                {errors.mobile && <span className="px-1 text-sm text-red-600">{errors.mobile?.message?.toString()}</span>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Address <span className="text-red-600">*</span>
                </label>
                <Textarea
                  className="h-24"
                  id="address"
                  placeholder="Enter address"
                  {...register("address", { required: "এড্রেস দিতে হবে" })}
                />
                {errors.address && <span className="px-1 text-sm text-red-600">{errors.address?.message?.toString()}</span>}
              </div>
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">
                  Amount <span className="text-red-600">*</span>
                </label>
                <Input
                  className="w-full"
                  id="amount"
                  placeholder="Enter amount"
                  {...register("amount", { valueAsNumber: true, required: "এমাউন্ট দিতে হবে এবং ইংরেজিতে হতে হবে" })}
                  type="number"
                />
                {errors.amount && <span className="px-1 text-sm text-red-600">{errors.amount?.message?.toString()}</span>}
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

export default CustomerActionDialoge;
