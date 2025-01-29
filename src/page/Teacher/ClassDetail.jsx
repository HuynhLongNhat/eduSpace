import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Edit,
  Trash,
  Calendar,
  Users,
  ClipboardList,
  ArrowLeft,
} from "lucide-react";
import { getClassById } from "@/services/classService";
import DeleteClassModal from "./DeleteClassModal";

const ClassDetails = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [classDetails, setClassDetails] = useState(null);
  const [openModalDelete , setOpenModalDelete] = useState(false);

  useEffect(() => {
    fetchClassDetail();
  }, []);

  const fetchClassDetail = async () => {
    try {
      const res = await getClassById(classId);
      setClassDetails(res.data);
    } catch (error) {
      console.error("Error fetching class details:", error);
    }
  };

  if (!classDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate("/teacher/classes")}
          className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg flex items-center space-x-2 hover:bg-gray-300 transition-colors duration-200 shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </button>
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {classDetails.class_name}
              </h1>
              <p className="mt-3 text-gray-600 text-lg">
                {classDetails.description}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate(`/teacher/classes/edit/${classId}`)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                <Edit className="w-4 h-4" />
                <span>Chỉnh sửa</span>
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center space-x-2 hover:bg-red-600 transition-colors duration-200 shadow-md hover:shadow-lg"
                onClick={() => setOpenModalDelete(true)}
              >
                <Trash className="w-4 h-4" />
                <span>Xóa</span>
              </button>
            </div>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Teacher Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Giáo viên</h3>
                <p className="text-lg font-semibold text-gray-800">
                  {classDetails.teacher}
                </p>
              </div>
            </div>
          </div>

          {/* Created Date Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Ngày tạo</h3>
                <p className="text-lg font-semibold text-gray-800">
                  {new Date(classDetails.createdAt).toLocaleDateString(
                    "vi-VN",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description Card */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <ClipboardList className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Mô tả lớp học
            </h2>
          </div>
          <p className="text-gray-600 leading-relaxed pl-16">
            {classDetails.description}
          </p>
        </div>
      </div>
      <DeleteClassModal
        isOpen={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
        classData={classDetails}
      />
    </div>
  );
};

export default ClassDetails;