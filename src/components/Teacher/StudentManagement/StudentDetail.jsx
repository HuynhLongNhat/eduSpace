import { Link } from "react-router-dom";
import { Eye, Edit, Trash } from "@lucide/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const StudentDetails = ({ student }) => {
  return (
    <Card className="bg-white shadow-md rounded-lg p-6">
      <CardHeader>
        <h1 className="text-2xl font-bold">{student.name}</h1>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Student ID: {student.id}</p>
        <p className="text-gray-600">Email: {student.email}</p>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Link
          to={`/students/${student.id}/edit`}
          className="text-yellow-500 hover:text-yellow-700"
        >
          <Edit className="w-5 h-5" />
        </Link>
        <Button variant="destructive">
          <Trash className="w-5 h-5 inline-block mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudentDetails;
