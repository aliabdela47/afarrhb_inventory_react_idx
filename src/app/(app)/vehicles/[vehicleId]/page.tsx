import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { vehicles } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function VehicleDetailsPage({ params }: { params: { vehicleId: string } }) {
  const vehicle = vehicles.find((v) => v.id === params.vehicleId);

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/vehicles">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Vehicle Details</h1>
      </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{vehicle.platenumber}</CardTitle>
              <CardDescription>Vehicle ID: {vehicle.id}</CardDescription>
            </div>
            <Link href={`/vehicles/${vehicle.id}/edit`}>
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Type</p>
              <p className="font-medium">{vehicle.type}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge
                variant="outline"
                className={cn({
                  "text-green-600 border-green-600/40 bg-green-500/10": vehicle.status === "On Route" || vehicle.status === "Idle",
                  "text-red-600 border-red-600/40 bg-red-500/10": vehicle.status === "Maintenance",
                })}
              >
                {vehicle.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Assigned Driver</p>
              <p className="font-medium">{vehicle.assigneddriver}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Insurance Expiry</p>
              <p className="font-medium">{vehicle.insuranceexpiry}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Next Service Date</p>
              <p className="font-medium">{vehicle.nextservice_date}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
