import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { warehouses } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";

export default function WarehouseDetailsPage({ params }: { params: { warehouseId: string } }) {
  const warehouse = warehouses.find((w) => w.id === params.warehouseId);

  if (!warehouse) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/warehouses">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Warehouse Details</h1>
      </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{warehouse.name}</CardTitle>
              <CardDescription>Warehouse ID: {warehouse.id}</CardDescription>
            </div>
            <Link href={`/warehouses/${warehouse.id}/edit`}>
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{warehouse.location}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Capacity</p>
              <p className="font-medium">{warehouse.capacity.toLocaleString()} sq. m</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Manager</p>
              <p className="font-medium">{warehouse.manager}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
