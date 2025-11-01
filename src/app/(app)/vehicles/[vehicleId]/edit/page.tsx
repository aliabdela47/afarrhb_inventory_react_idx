import { vehicles } from "@/lib/data";
import { notFound } from "next/navigation";
import { VehicleForm } from "../../vehicle-form";

export default function EditVehiclePage({ params }: { params: { vehicleId: string } }) {
  const vehicle = vehicles.find((v) => v.id === params.vehicleId);

  if (!vehicle) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Vehicle: {vehicle.platenumber}</h1>
      <VehicleForm vehicle={vehicle} />
    </div>
  );
}
