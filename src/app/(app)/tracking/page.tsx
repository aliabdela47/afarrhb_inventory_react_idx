import { vehicles as vehicleData } from "@/lib/data";
import { TrackingClient } from "./tracking-client";

export default function TrackingPage() {
  const vehiclesWithPosition = vehicleData.filter(v => v.position);

  return <TrackingClient allVehicles={vehicleData} vehiclesWithPosition={vehiclesWithPosition} />;
}
