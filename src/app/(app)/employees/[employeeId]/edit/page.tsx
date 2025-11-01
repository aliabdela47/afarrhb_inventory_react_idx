import { employees } from "@/lib/data";
import { notFound } from "next/navigation";
import { EmployeeForm } from "../../employee-form";

export default function EditEmployeePage({ params }: { params: { employeeId: string } }) {
  const employee = employees.find((w) => w.id === params.employeeId);

  if (!employee) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Edit Employee: {employee.fullname}</h1>
      <EmployeeForm employee={employee} />
    </div>
  );
}
