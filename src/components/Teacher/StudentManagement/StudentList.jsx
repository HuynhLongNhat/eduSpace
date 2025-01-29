import { Link } from "react-router-dom";
import { Eye, Edit, Trash } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../../ui/card";

const StudentList = ({ students }) => {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Student List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {students.map((student) => (
          <Card
            key={student.id}
            className="hover:shadow-lg transition-shadow rounded-lg border border-gray-200"
          >
            <CardHeader className="bg-gray-50 rounded-t-lg px-4 py-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {student.name}
              </h3>
            </CardHeader>
            <CardContent className="px-4 py-3">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Student ID:</span> {student.id}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span> {student.email}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end space-x-3 px-4 py-2">
              <Link
                to={`/students/${student.id}`}
                className="text-blue-500 hover:text-blue-700 transition"
              >
                <Eye className="w-5 h-5" />
              </Link>
              <Link
                to={`/students/${student.id}/edit`}
                className="text-yellow-500 hover:text-yellow-700 transition"
              >
                <Edit className="w-5 h-5" />
              </Link>
              <button
                className="text-red-500 hover:text-red-700 transition"
                onClick={() => handleDelete(student.id)}
              >
                <Trash className="w-5 h-5" />
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this student?")) {
    console.log("Student deleted:", id);
    // Add your delete logic here
  }
};

export default StudentList;
