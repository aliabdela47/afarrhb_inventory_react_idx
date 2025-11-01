import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { inventoryItems } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function InventoryItemPage({ params }: { params: { itemId: string } }) {
  const item = inventoryItems.find((i) => i.id === params.itemId);

  if (!item) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/inventory">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Item Details</h1>
      </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>Item ID: {item.id}</CardDescription>
            </div>
            <Link href={`/inventory/${item.id}/edit`}>
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="font-medium">{item.category}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quantity</p>
              <p className="font-medium">{item.quantity} {item.unit}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expiration Date</p>
              <p className="font-medium">{item.expirationDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge
                variant={item.status === "Expiring Soon" ? "destructive" : "secondary"}
                className={cn(item.status === "In Stock" && "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300")}
              >
                {item.status}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
