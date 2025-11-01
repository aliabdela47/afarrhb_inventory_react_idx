"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Trash2 } from "lucide-react";
import React from "react";

export function ReceiptForm({ children }: { children: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-3xl">
        <SheetHeader>
          <SheetTitle>Create Model 19 Receipt</SheetTitle>
          <SheetDescription>
            Fill in the details for the new item receipt.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="receipt-id">Receipt ID</Label>
              <Input id="receipt-id" defaultValue="REC-2024-00127" readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" defaultValue={new Date().toISOString().substring(0, 10)} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Input id="supplier" placeholder="e.g. Global Food Suppliers" />
            </div>
          </div>
          <div>
            <h4 className="mb-2 font-medium">Items</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>
                    <span className="sr-only">Remove</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Input placeholder="e.g. Whole Wheat Flour" />
                  </TableCell>
                  <TableCell>
                    <Input type="number" placeholder="100" />
                  </TableCell>
                  <TableCell>
                    <Input type="number" placeholder="25.50" />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button variant="outline" size="sm" className="mt-4">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Item
            </Button>
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save Receipt</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
