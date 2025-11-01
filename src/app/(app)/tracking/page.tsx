import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MapComponent } from "./map";
import { vehicles as vehicleData } from "@/lib/data";
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./map').then(mod => mod.MapComponent), {
  ssr: false,
  loading: () => <p>Loading map...</p>
});


export default function TrackingPage() {
  const vehicles = vehicleData.filter(v => v.position);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      <div className="lg:col-span-2 flex flex-col">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Live Vehicle Map</CardTitle>
            <CardDescription>
              Real-time locations of all active vehicles.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[60vh] lg:h-auto lg:flex-1">
            <DynamicMap vehicles={vehicles} />
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Fleet</CardTitle>
            <CardDescription>Status and details of all vehicles.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicleData.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>
                      <div className="font-medium">{vehicle.platenumber}</div>
                      <div className="text-sm text-muted-foreground">{vehicle.driver}</div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn({
                          "text-green-600 border-green-600/40 bg-green-500/10": vehicle.status === "On Route",
                          "text-gray-600 border-gray-600/40 bg-gray-500/10": vehicle.status === "Idle",
                          "text-red-600 border-red-600/40 bg-red-500/10": vehicle.status === "Maintenance",
                        })}
                      >
                        {vehicle.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
