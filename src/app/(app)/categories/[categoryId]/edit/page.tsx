import { categories } from "@/lib/data";
import { notFound } from "next/navigation";
import { CategoryForm } from "../../category-form";

export default function EditCategoryPage({ params }: { params: { categoryId: string } }) {
  const category = categories.find((c) => c.id === params.categoryId);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Category: {category.name}</h1>
      <CategoryForm category={category} />
    </div>
  );
}
