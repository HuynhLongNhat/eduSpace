import { Link } from "react-router-dom";
import { Eye, Edit, Trash } from "lucide-react";

const QuizList = ({ quizzes }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {quizzes.map((quiz) => (
        <div
          key={quiz.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={quiz.image || "https://via.placeholder.com/300x200"}
            alt={quiz.title}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800">{quiz.title}</h3>
            <p className="text-sm text-gray-600 truncate">{quiz.description}</p>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50">
            <Link
              to={`/quizzes/${quiz.id}`}
              className="text-blue-500 hover:text-blue-700 flex items-center space-x-1"
            >
              <Eye className="w-5 h-5" />
              <span>View</span>
            </Link>
            <div className="flex space-x-3">
              <Link
                to={`/quizzes/${quiz.id}/edit`}
                className="text-yellow-500 hover:text-yellow-700 flex items-center space-x-1"
              >
                <Edit className="w-5 h-5" />
                <span>Edit</span>
              </Link>
              <button className="text-red-500 hover:text-red-700 flex items-center space-x-1">
                <Trash className="w-5 h-5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizList;
