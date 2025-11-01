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
import { issuances } from "@/lib/data";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function IssuancesPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Issuances</CardTitle>
            <CardDescription>
              Manage all item issuances.
            </CardDescription>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Issuance
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Issuance No</TableHead>
              <TableHead>Request ID</TableHead>
              <TableHead>Issued To</TableHead>
              <TableHead>Issued Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issuances.map((issuance) => (
              <TableRow key={issuance.id}>
                <TableCell className="font-medium">
                  {issuance.issuanceno}
                </TableCell>
                <TableCell>{issuance.requestid}</TableCell>
                <TableCell>{issuance.issuedto}</TableCell>
                <TableCell>{issuance.issuedate}</TableCell>
                <TableCell>
                  <Badge
                     className={cn({
                      "bg-green-100 text-green-800": issuance.status === "Completed",
                      "bg-yellow-100 text-yellow-800": issuance.status === "Pending",
                      "bg-blue-100 text-blue-800": issuance.status === "In Progress",
                    }, "dark:bg-opacity-20")}
                  >
                    {issuance.status}
                  </Badge>
                </TableCell>
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
