
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
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { directorates } from "@/lib/data";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  parentunit: z.string().optional(),
  directorname: z.string().min(1, "Director name is required"),
  phone: z.string().min(1, "Phone is required"),
  address: z.string().min(1, "Address is required"),
  is_active: z.boolean(),
});

type DirectorateFormValues = z.infer<typeof formSchema>;

interface DirectorateFormProps {
  directorate?: {
    id: string;
    name: string;
    code: string;
    parentunit: string | null;
    directorname: string;
    phone: string;
    address: string;
    is_active: boolean;
  };
}

export function DirectorateForm({ directorate }: DirectorateFormProps) {
  const router = useRouter();
  const form = useForm<DirectorateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: directorate ? { ...directorate, parentunit: directorate.parentunit || "" } : {
      name: "",
      code: "",
      parentunit: "",
      directorname: "",
      phone: "",
      address: "",
      is_active: true,
    },
  });

  function onSubmit(values: DirectorateFormValues) {
    console.log(values);
    if (directorate) {
      console.log("Updating directorate", directorate.id);
    } else {
      console.log("Creating new directorate");
    }
    router.push("/directorates");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Directorate Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Public Health" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. PH" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="parentunit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Unit</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a parent unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">No Parent</SelectItem>
                      {directorates.filter(d => d.id !== directorate?.id).map((dir) => (
                        <SelectItem key={dir.id} value={dir.id}>
                          {dir.name}
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
              name="directorname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Director Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Dr. John Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 123-456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 123 Health St, Main City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 md:col-start-1">
                  <div className="space-y-0.5">
                    <FormLabel>Active Status</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">{directorate ? "Save Changes" : "Create Directorate"}</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
