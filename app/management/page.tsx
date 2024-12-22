import PageHeader from "@/components/layouts/page-header";
import CustomerComponent from "@/components/page-components/managements/CustomerComponent";

export default function Management() {
  return (
    <section className="w-full">
      <PageHeader title="Customer Management" />
      <CustomerComponent />
    </section>
  );
}
