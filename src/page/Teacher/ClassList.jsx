import { useEffect, useState } from "react";
import {
  Users,
  Calendar,
  Search,
  Plus,
  MoreVertical,
  ChevronRight,
  ChevronsRight,
  ChevronLeft,
  ChevronsLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllClass } from "@/services/classService";
const ClassList = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      fetchAllClasses();
    }, []);

    const fetchAllClasses = async () => {
      try {
        const res = await getAllClass();
        const reversedClasses = res.data.reverse();
        setClasses(reversedClasses);
        setFilteredClasses(reversedClasses);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    const handleSearch = (term) => {
      setSearchTerm(term);
      setCurrentPage(1);
      const filtered = classes.filter((classItem) =>
        classItem.class_name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredClasses(filtered);
    };

    const getPaginatedClasses = () => {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return filteredClasses.slice(startIndex, endIndex);
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredClasses.length / pageSize);

    const getPageNumbers = () => {
      const pages = [];
      const showPages = 5; // Number of pages to show

      let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
      let endPage = startPage + showPages - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - showPages + 1);
      }

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }

      return pages;
    };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý lớp học</h1>
        <p className="text-gray-600 mt-2">
          Quản lý và theo dõi các lớp học trực tuyến của bạn
        </p>
      </div>
      {/* Actions Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div className="flex space-x-4 mb-4 md:mb-0">
         
        </div>

        <div className="flex space-x-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Tìm kiếm lớp học..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            onClick={() => navigate("/teacher/classes/create")}
          >
            <Plus className="w-5 h-5" />
            <span>Thêm lớp mới</span>
          </button>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getPaginatedClasses().map((classItem) => (
          <div key={classItem.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {classItem.class_name}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Giáo viên: {classItem.teacher}
                  </span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  Ngày tạo: {classItem.createdAt}
                </span>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                onClick={() => navigate(`/teacher/classes/${classItem.id}`)}
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>
       <div className="flex justify-center mt-8">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="First page"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex gap-1">
            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-4 py-2 text-gray-400"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage === page
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              )
            ))}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Last page"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Optional: Page information */}
      <div className="text-center mt-4 text-sm text-gray-600">
        Trang {currentPage} / {totalPages} ({filteredClasses.length} kết quả)
      </div>
    </div>
  );
};

export default ClassList;
