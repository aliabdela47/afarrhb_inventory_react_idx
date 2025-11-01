import { vehicles as vehicleData } from "@/lib/data";
import { TrackingClient } from "./tracking-client";

export default function TrackingPage() {
  // Fetch data in the Server Component
  const allVehicles = vehicleData;
  const vehiclesWithPosition = allVehicles.filter(v => v.position);

  // Pass data to the Client Component
  return <TrackingClient allVehicles={allVehicles} vehiclesWithPosition={vehiclesWithPosition} />;
}
