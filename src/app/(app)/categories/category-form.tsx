"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { categories } from "@/lib/data";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
  parentcategoryid: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  category?: {
    id: string;
    name: string;
    description?: string | null;
    parentcategoryid?: string | null;
  };
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter();
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: category
      ? {
          name: category.name,
          description: category.description || "",
          parentcategoryid: category.parentcategoryid || "",
        }
      : {
          name: "",
          description: "",
          parentcategoryid: "",
        },
  });

  function onSubmit(values: CategoryFormValues) {
    console.log(values);
    if (category) {
      console.log("Updating category", category.id);
    } else {
      console.log("Creating new category");
    }
    router.push("/categories");
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
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Dry Goods" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentcategoryid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a parent category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">No Parent</SelectItem>
                      {categories.filter(c => c.id !== category?.id).map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Leave blank if this is a top-level category.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A brief description of the category."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">{category ? "Save Changes" : "Create Category"}</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
