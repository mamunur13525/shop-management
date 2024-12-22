import PageHeader from "@/components/layouts/page-header";
import { CustomerTable } from "@/components/page-components/managements/CustomerTable";

export default function Management() {
  return (
    <section className="w-full">
      <PageHeader title="Customer Management" />
      <CustomerTable />
    </section>
  );
}
