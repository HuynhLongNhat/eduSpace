import { useEffect, useState } from "react";
import { Search, Plus, FileText, Clock, Edit2, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllLectures } from "@/services/lecturesService";
import DeleteLectureAdmin from "./DeleteLectureAdmin";
import Pagination from "@/components/Pagination";

const LecturesListAdmin = () => {
  const navigate = useNavigate();
  const [lectures, setLectures] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [lectureToDelete, setLectureToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const lecturesPerPage = 5;

  useEffect(() => {
    fetchAllLectures();
  }, []);

  const fetchAllLectures = async () => {
    const res = await getAllLectures();
    if (res && res.status === 200) {
      setLectures(res.data);
    }
  };

  const filteredLectures = lectures.filter(
    (lecture) =>
      lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecture.class_id
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const indexOfLastLecture = currentPage * lecturesPerPage;
  const indexOfFirstLecture = indexOfLastLecture - lecturesPerPage;
  const currentLectures = filteredLectures.slice(
    indexOfFirstLecture,
    indexOfLastLecture
  );
  const totalPages = Math.ceil(filteredLectures.length / lecturesPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDeleteLecture = (lecture) => {
    setLectureToDelete(lecture);
    setShowDeleteModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">
                Danh Sách Bài Giảng
              </h1>
            </div>
            <button
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              onClick={() => navigate("/admin/lectures/create")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Tạo Bài Giảng
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm bài giảng..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Lectures List */}
          <div className="space-y-4">
            {currentLectures.map((lecture) => (
              <div
                key={lecture.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {lecture.class_id}
                      </span>
                      <h3
                        className="text-lg font-medium text-gray-800"
                        onClick={() =>
                          navigate(`/admin/lectures/${lecture.id}`)
                        }
                      >
                        {lecture.title}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>
                        {new Date(lecture.created_at).toLocaleDateString(
                          "vi-VN"
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition"
                      onClick={() => navigate(`/admin/lectures/${lecture.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition"
                      onClick={() =>
                        navigate(`/admin/lectures/edit/${lecture.id}`)
                      }
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition"
                      onClick={() => handleDeleteLecture(lecture)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              showingFrom={indexOfFirstLecture + 1}
              showingTo={Math.min(indexOfLastLecture, filteredLectures.length)}
              totalItems={filteredLectures.length}
              itemName="bài giảng"
            />
          )}
        </div>
      </div>

      {lectureToDelete && (
        <DeleteLectureAdmin
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          lectureData={lectureToDelete}
          fetchAllLectures={fetchAllLectures}
        />
      )}
    </div>
  );
};

export default LecturesListAdmin;
