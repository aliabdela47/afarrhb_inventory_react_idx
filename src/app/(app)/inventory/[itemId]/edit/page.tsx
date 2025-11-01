import { inventoryItems } from "@/lib/data";
import { notFound } from "next/navigation";
import { InventoryForm } from "../../inventory-form";

export default function EditInventoryItemPage({ params }: { params: { itemId: string } }) {
  const item = inventoryItems.find((i) => i.id === params.itemId);

  if (!item) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Item: {item.name}</h1>
      <InventoryForm item={item} />
    </div>
  );
}
