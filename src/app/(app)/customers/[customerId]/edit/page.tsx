import { customers } from "@/lib/data";
import { notFound } from "next/navigation";
import { CustomerForm } from "../../customer-form";

export default function EditCustomerPage({ params }: { params: { customerId: string } }) {
  const customer = customers.find((w) => w.id === params.customerId);

  if (!customer) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Customer: {customer.name}</h1>
      <CustomerForm customer={customer} />
    </div>
  );
}
