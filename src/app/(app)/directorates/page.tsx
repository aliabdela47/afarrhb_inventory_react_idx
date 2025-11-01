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
import { directorates } from "@/lib/data";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function DirectoratesPage() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Directorates</CardTitle>
            <CardDescription>
              Manage your directorates and organizational units.
            </CardDescription>
          </div>
          <Link href="/directorates/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Directorate
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Director Name</TableHead>
              <TableHead>Parent Unit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {directorates.map((directorate) => (
              <TableRow key={directorate.id}>
                <TableCell className="font-medium">
                  <Link href={`/directorates/${directorate.id}`} className="hover:underline">
                    {directorate.name}
                  </Link>
                </TableCell>
                <TableCell>{directorate.code}</TableCell>
                <TableCell>{directorate.directorname}</TableCell>
                <TableCell>{directorates.find(d => d.id === directorate.parentunit)?.name || 'N/A'}</TableCell>
                 <TableCell>
                  <Badge
                    className={cn(
                      directorate.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800",
                      "dark:bg-opacity-20"
                    )}
                  >
                    {directorate.is_active ? "Active" : "Inactive"}
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
                      <DropdownMenuItem asChild>
                        <Link href={`/directorates/${directorate.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/directorates/${directorate.id}/edit`}>Edit</Link>
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
