import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { vehicles as vehicleData } from "@/lib/data";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function VehiclesPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Vehicles</CardTitle>
            <CardDescription>
              Manage your vehicle fleet.
            </CardDescription>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Vehicle
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Plate Number</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned Driver</TableHead>
              <TableHead>Insurance Expiry</TableHead>
              <TableHead>Next Service</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicleData.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className="font-medium">{vehicle.platenumber}</TableCell>
                <TableCell>{vehicle.type}</TableCell>
                <TableCell>
                   <Badge
                        variant="outline"
                        className={cn({
                          "text-green-600 border-green-600/40 bg-green-500/10": vehicle.status === "On Route" || vehicle.status === "Active",
                          "text-gray-600 border-gray-600/40 bg-gray-500/10": vehicle.status === "Idle",
                          "text-red-600 border-red-600/40 bg-red-500/10": vehicle.status === "Maintenance",
                        })}
                      >
                        {vehicle.status}
                      </Badge>
                </TableCell>
                <TableCell>{vehicle.assigneddriver}</TableCell>
                <TableCell>{vehicle.insuranceexpiry}</TableCell>
                <TableCell>{vehicle.nextservice_date}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive focus:text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
