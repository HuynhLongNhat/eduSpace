import { Link } from "react-router-dom";
import { Edit, Trash } from "lucide-react";

const QuizDetails = ({ quiz }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <img
        src={quiz.image || "https://via.placeholder.com/400x200"}
        alt={quiz.title}
        className="w-full h-60 object-cover rounded-lg mb-4"
      />
      <h1 className="text-2xl font-bold text-gray-800">{quiz.title}</h1>
      <p className="mt-2 text-gray-600">{quiz.description}</p>
      <div className="mt-4 flex space-x-4">
        <Link
          to={`/quizzes/${quiz.id}/edit`}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600"
        >
          <Edit className="w-5 h-5 inline-block mr-2" />
          Edit
        </Link>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600">
          <Trash className="w-5 h-5 inline-block mr-2" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default QuizDetails;
