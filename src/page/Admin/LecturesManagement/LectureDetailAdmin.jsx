import { getLectureById } from "@/services/lecturesService";
import {
  BookOpen,
  Clock,
  FileText,
  Globe,
  PlayCircle,
  Star,
  Users,
  Download,
  Share2,
  BookmarkPlus,
  ArrowLeft,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LectureDetailAdmin = () => {
  const {lectureId} = useParams();
  const navigate = useNavigate();
  const [lecture , setLecture] = useState([]);
  useEffect(()=>{
fetchLectureDetail();
  },[])

  const fetchLectureDetail = async() =>{
     const res = await getLectureById(lectureId);
     if(res && res.status === 200) {
       setLecture(res.data);
     }
  }
  const lectureMockData = {
    title: "Các khái niệm nâng cao trong JavaScript",
    instructor: "John Anderson",
    rating: 4.8,
    students: 1234,
    duration: "2 giờ 30 phút",
    lastUpdated: "15 tháng 1, 2025",
    description:
      "Làm chủ các khái niệm nâng cao trong JavaScript bao gồm closures, prototypes, lập trình bất đồng bộ, và nhiều hơn nữa. Bài giảng toàn diện này sẽ đưa bạn từ cấp độ trung cấp đến nâng cao.",
    materials: [
      { name: "Slide bài giảng", size: "2.5 MB" },
      { name: "Ví dụ mã nguồn", size: "1.8 MB" },
      { name: "Bài tập thực hành", size: "3.2 MB" },
    ],
    topics: [
      "Closures và Phạm vi",
      "Kế thừa nguyên mẫu (Prototypal Inheritance)",
      "Mẫu Async/Await",
      "Phân tích sâu Event Loop",
      "Quản lý bộ nhớ",
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mt-2">
        <button
          onClick={() => navigate("/admin/lectures")}
          className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg flex items-center space-x-2 hover:bg-gray-300 transition-colors duration-200 shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </button>
      </div>
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">{lecture.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>{lectureMockData.rating}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{lectureMockData.students} học viên</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{lectureMockData.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Cập nhật lần cuối {lectureMockData.lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cột trái */}
          <div className="lg:col-span-2">
            {/* Mô tả */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Về bài giảng này</h2>
              <p className="text-gray-600 leading-relaxed">
                {lecture.content}
              </p>
            </div>

            {/* Chủ đề */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Những gì bạn sẽ học
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lectureMockData.topics.map((topic, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cột phải */}
          <div className="lg:col-span-1">
            {/* Thẻ hành động */}
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <div className="flex justify-center mb-6">
                <PlayCircle className="w-20 h-20 text-blue-600" />
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg mb-4 hover:bg-blue-700 transition">
                Bắt đầu học
              </button>
              <div className="flex gap-2 mb-6">
                <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 py-2 rounded-lg hover:bg-gray-50">
                  <BookmarkPlus className="w-4 h-4" />
                  Lưu
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 py-2 rounded-lg hover:bg-gray-50">
                  <Share2 className="w-4 h-4" />
                  Chia sẻ
                </button>
              </div>

              {/* Tài liệu */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4">Tài liệu bài giảng</h3>
                {lectureMockData.materials.map((material, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {material.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {material.size}
                      </span>
                      <button className="text-blue-600 hover:text-blue-700">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureDetailAdmin;
