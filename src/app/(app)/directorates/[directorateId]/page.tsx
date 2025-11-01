import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { directorates } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function DirectorateDetailsPage({ params }: { params: { directorateId: string } }) {
  const directorate = directorates.find((d) => d.id === params.directorateId);

  if (!directorate) {
    notFound();
  }

  const parentUnit = directorate.parentunit ? directorates.find(d => d.id === directorate.parentunit) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/directorates">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Directorate Details</h1>
      </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{directorate.name}</CardTitle>
              <CardDescription>Directorate ID: {directorate.id}</CardDescription>
            </div>
            <Link href={`/directorates/${directorate.id}/edit`}>
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Code</p>
              <p className="font-medium">{directorate.code}</p>
            </div>
             <div>
              <p className="text-sm text-muted-foreground">Parent Unit</p>
              <p className="font-medium">{parentUnit ? parentUnit.name : 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Director Name</p>
              <p className="font-medium">{directorate.directorname}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{directorate.phone}</p>
            </div>
             <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{directorate.address}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
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
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
