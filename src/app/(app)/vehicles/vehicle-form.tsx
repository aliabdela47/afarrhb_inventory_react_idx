
"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { employees } from "@/lib/data";

const formSchema = z.object({
  platenumber: z.string().min(1, "Plate number is required"),
  type: z.string().min(1, "Vehicle type is required"),
  status: z.string().min(1, "Status is required"),
  assigneddriver: z.string().min(1, "Assigned driver is required"),
  insuranceexpiry: z.string().min(1, "Insurance expiry date is required"),
  nextservice_date: z.string().min(1, "Next service date is required"),
});

type VehicleFormValues = z.infer<typeof formSchema>;

interface VehicleFormProps {
  vehicle?: {
    id: string;
    platenumber: string;
    type: string;
    status: string;
    assigneddriver: string;
    insuranceexpiry: string;
    nextservice_date: string;
  };
}

export function VehicleForm({ vehicle }: VehicleFormProps) {
  const router = useRouter();
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: vehicle || {
      platenumber: "",
      type: "",
      status: "Idle",
      assigneddriver: "",
      insuranceexpiry: "",
      nextservice_date: "",
    },
  });

  function onSubmit(values: VehicleFormValues) {
    console.log(values);
    if (vehicle) {
      console.log("Updating vehicle", vehicle.id);
    } else {
      console.log("Creating new vehicle");
    }
    router.push("/vehicles");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <FormField
              control={form.control}
              name="platenumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plate Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. AF-12345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Truck">Truck</SelectItem>
                      <SelectItem value="Pickup">Pickup</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Van">Van</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Idle">Idle</SelectItem>
                      <SelectItem value="On Route">On Route</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assigneddriver"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned Driver</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a driver" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {employees.map((emp) => (
                        <SelectItem key={emp.id} value={emp.fullname}>
                          {emp.fullname}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="insuranceexpiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insurance Expiry Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nextservice_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Next Service Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">{vehicle ? "Save Changes" : "Create Vehicle"}</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
