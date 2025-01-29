import  { useEffect, useState } from "react";
import { Save, X, FileText, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllClass } from "@/services/classService";
import MDEditor from "@uiw/react-md-editor"; 
import { createNewLecture } from "@/services/lecturesService";
import { useToast } from "@/hooks/use-toast";
const CreateLectureAdmin = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [classes , setClasses] = useState([]);
  const [formData, setFormData] = useState({
    class_id: "",
    title: "",
    content: "",
  });

   useEffect(() => {
        fetchAllClasses();
      }, []);
  
      const fetchAllClasses = async () => {
        try {
          const res = await getAllClass();
          setClasses(res.data);
        } catch (error) {
          console.error("Error fetching classes:", error);
        }
      };
  const handleSubmit =  async(e) => {
    e.preventDefault();
    console.log(formData);
    const res = await createNewLecture({
      class_id: formData.class_id,
      title: formData.title,
      content: formData.content,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  console.log("res", res);
    if(res && res.status === 201) {
      navigate("/admin/lectures");
      toast({
        variant: "success",
        title: "Tạo bài giảng mới thành công",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">
                Tạo Bài Giảng Mới
              </h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{new Date().toLocaleDateString("vi-VN")}</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Class ID */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Lớp học
              </label>
              <select
                name="class_id"
                value={formData.class_id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                required
              >
                <option value="" disabled>
                  Chọn lớp học
                </option>
                {classes.map((classItem) => (
                  <option key={classItem.id} value={classItem.id}>
                    {classItem.class_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Tiêu Đề Bài Giảng
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="Nhập tiêu đề bài giảng"
                required
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Nội Dung Bài Giảng
              </label>
              <MDEditor
                value={formData.content}
                onChange={(value) =>
                  handleChange({
                    target: { name: "content", value: value || "" },
                  })
                }
                height={300}
                preview="edit"
              />
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition"
                onClick={() => navigate("/admin/lectures")}
              >
                <X className="h-4 w-4 mr-2" />
                Hủy
              </button>
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                <Save className="h-4 w-4 mr-2" />
                Lưu Bài Giảng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateLectureAdmin;
