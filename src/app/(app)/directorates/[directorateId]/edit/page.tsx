import { directorates } from "@/lib/data";
import { notFound } from "next/navigation";
import { DirectorateForm } from "../../directorate-form";

export default function EditDirectoratePage({ params }: { params: { directorateId: string } }) {
  const directorate = directorates.find((d) => d.id === params.directorateId);

  if (!directorate) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Directorate: {directorate.name}</h1>
      <DirectorateForm directorate={directorate} />
    </div>
  );
}
