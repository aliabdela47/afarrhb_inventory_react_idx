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
import { warehouses } from "@/lib/data";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function WarehousesPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Warehouses</CardTitle>
            <CardDescription>
              Manage your storage facilities.
            </CardDescription>
          </div>
          <Link href="/warehouses/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Warehouse
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Capacity (sq. m)</TableHead>
              <TableHead>Manager</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {warehouses.map((warehouse) => (
              <TableRow key={warehouse.id}>
                <TableCell className="font-medium">
                  <Link href={`/warehouses/${warehouse.id}`} className="hover:underline">
                    {warehouse.name}
                  </Link>
                </TableCell>
                <TableCell>{warehouse.location}</TableCell>
                <TableCell>{warehouse.capacity.toLocaleString()}</TableCell>
                <TableCell>{warehouse.manager}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/warehouses/${warehouse.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/warehouses/${warehouse.id}/edit`}>Edit</Link>
                      </DropdownMenuItem>
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
