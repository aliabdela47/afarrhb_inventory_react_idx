import { warehouses } from "@/lib/data";
import { notFound } from "next/navigation";
import { WarehouseForm } from "../../warehouse-form";

export default function EditWarehousePage({ params }: { params: { warehouseId: string } }) {
  const warehouse = warehouses.find((w) => w.id === params.warehouseId);

  if (!warehouse) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Warehouse: {warehouse.name}</h1>
      <WarehouseForm warehouse={warehouse} />
    </div>
  );
}
