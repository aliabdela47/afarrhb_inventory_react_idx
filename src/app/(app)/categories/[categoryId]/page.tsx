import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";

export default function CategoryDetailsPage({ params }: { params: { categoryId: string } }) {
  const category = categories.find((c) => c.id === params.categoryId);

  if (!category) {
    notFound();
  }
  
  const parentCategory = category.parentcategoryid ? categories.find(c => c.id === category.parentcategoryid) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/categories">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Category Details</h1>
      </div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{category.name}</CardTitle>
              <CardDescription>Category ID: {category.id}</CardDescription>
            </div>
            <Link href={`/categories/${category.id}/edit`}>
              <Button variant="outline" size="icon">
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="font-medium">{category.description || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Parent Category</p>
              <p className="font-medium">{parentCategory ? parentCategory.name : 'N/A'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
