import { useEffect, useState } from "react";
import {
  UserCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  X,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { editUser, getUserById } from "@/services/userService";
import { useNavigate, useParams } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const {userId} = useParams();
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl , setAvatarUrl] = useState("");
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [fullname, setFullname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
 const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
 
  const [editForm, setEditForm] = useState({
    full_name: "",
    date_of_birth: "",
    gender: "",
    phone: "",
    address: "",
    avatar: "",
    role : "",
  });
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await getUserById(userId);
      console.log("res user" , res)
      if (res && res.status === 200) {
        const userData = res.data;
        setFullname(userData.fullname);
        setEmail(userData.email);
        setPassword(userData.password);
        setUserRole(userData.role);
        setPhone(userData.phone);
        setDateOfBirth(userData.date_of_birth);
        setGender(userData.gender);
        setAddress(userData.address);
        setAvatar(userData.profile_picture || "");
        
      }
    } catch (error) {
      console.error("Error fetching user profile", error);
    }
  };

const handleEditClick = () => {
  setEditForm({
    full_name: fullname,
    date_of_birth: dateOfBirth,
    gender: gender,
    phone: phone,
    address: address,
    avatar: avatar,
    role : userRole,

  });
  setIsEditing(true);
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setEditForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

const handleSubmit = async (e) => {
  e.preventDefault(); 
   try {
     const response = await editUser(userId,{
       fullname: editForm.full_name,
       date_of_birth: editForm.date_of_birth,
       gender: editForm.gender,
       phone: editForm.phone,
       address: editForm.address,
       profile_picture: avatarUrl || avatar,
       email : email,
       password : password,
       role : editForm.role,
       updatedAt:new Date().toISOString().split("T")[0],

     });
           console.log("res user", response);

     if (response && response.status === 200) {
       setFullname(editForm.full_name);
       setDateOfBirth(editForm.date_of_birth);
       setGender(editForm.gender);
       setPhone(editForm.phone);
       setAddress(editForm.address);
       setUserRole(editForm.role);
       setAvatar(avatarUrl || avatar);
       setAvatarUrl("");

       // Exit edit mode
       setIsEditing(false);

       toast({
         variant: "success",
         title: response.data.EM || "Cập nhật thành công",
       });
     } else {
       // Update failed
       toast({
         variant: "destructive",
         title: response.data.EM || "Cập nhật thất bại",
       });
       // Stay in edit mode
     }
   } catch (error) {
     console.error("Lỗi khi cập nhật:", error);
     toast({
       variant: "destructive",
       title: "Có lỗi xảy ra khi cập nhật thông tin",
     });
   }
 
};


   const handleAvatarChange = async (e) => {
     const file = e.target.files[0];
     if (!file) return;

     // Hiển thị ảnh preview
     setAvatar(URL.createObjectURL(file));

     // Upload ảnh lên Cloudinary
     const formData = new FormData();
     formData.append("file", file);
     formData.append("upload_preset", "ssga5jml");
     formData.append("api_key", "963862276821583");
     try {
       const response = await axios.post(
         `https://api.cloudinary.com/v1_1/dbnofh9a8/image/upload`,
         formData
       );
       setAvatarUrl(response.data.secure_url);
     } catch (error) {
       console.error("Upload ảnh thất bại:", error);
     }
   };
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8 mt-5">
        <div className="ml-28">
          <button
            onClick={() => navigate("/admin/users")}
            className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg flex items-center space-x-2 hover:bg-gray-300 transition-colors duration-200 shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại</span>
          </button>
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-56 bg-gradient-to-r from-blue-500 to-indigo-600">
            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
              <div className="relative">
                {avatar ? (
                  <img
                    src={avatar}
                    alt="User avatar"
                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center shadow-lg">
                    <UserCircle size={64} className="text-gray-400" />
                    <span className="sr-only">No avatar available</span>
                  </div>
                )}

                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                )}
              </div>
            </div>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="pt-20 px-8 pb-8">
              <div className="space-y-6">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="absolute right-0 top-0 text-gray-500 hover:text-gray-700"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={editForm.full_name || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Ngày sinh
                  </label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={editForm.date_of_birth || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Giới tính
                  </label>
                  <select
                    name="gender"
                    value={editForm.gender || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="Nam">Nam</option>
                    <option value="Nữ">Nữ</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={editForm.address || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select
                    name="role"
                    value={editForm.role || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Chọn vai trò</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="TEACHER">TEACHER</option>
                    <option value="STUDENT">STUDENT</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg font-medium rounded-lg px-6 py-3 hover:opacity-90 transition-all duration-300 shadow-lg"
                >
                  Lưu thay đổi
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="pt-20 pb-8 px-6 text-center">
                <h1 className="text-3xl font-bold text-gray-900">
                  {fullname || "Chưa cập nhật"}
                </h1>
                <p className="mt-2 text-lg font-medium text-gray-600">
                  {userRole}
                </p>
              </div>

              <div className="border-t border-gray-200 px-8 py-8">
                <div className="grid grid-cols-1 gap-6">
                  {[
                    { icon: Mail, value: email },
                    { icon: Phone, value: phone },
                    { icon: Calendar, value: dateOfBirth },
                    {
                      icon: User,
                      value: gender,
                    },
                    { icon: MapPin, value: address },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <item.icon className="h-6 w-6 text-blue-500" />
                      <span className="text-gray-700 text-lg">
                        {item.value || "Chưa cập nhật"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-8 pb-8">
                <button
                  onClick={() => handleEditClick()}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg font-medium rounded-lg px-6 py-3 hover:opacity-90 transition-all duration-300 shadow-lg"
                >
                  Chỉnh sửa thông tin
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
