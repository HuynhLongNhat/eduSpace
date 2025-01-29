import { useState, useEffect } from "react";

import { Loader, Trash, Eye, Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import DeleteUser from "./DeleteUser";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import DeleteUser from "./DeleteUser";
import { getAllUsers } from "@/services/userService";
import Pagination from "@/components/Pagination";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
        const reversedClasses = response.data.reverse();
     setUsers(reversedClasses);
      setUsers(response.data); 
      setLoading(false);
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Error fetching users");
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullname
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) 
  );

  const endIndex = currentPage * pageSize;
  const startIndex = endIndex - pageSize;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Quản lý người dùng
            </h1>
            <p className="text-gray-600 mt-2">Quản lý và theo dõi người dùng</p>
          </div>
          {/* Actions Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="flex space-x-4 mb-4 md:mb-0"></div>

            <div className="flex space-x-4 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Tìm kiếm người dùng..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
                onClick={() => navigate("/admin/users/create")}
              >
                <Plus className="w-5 h-5" />
                <span>Thêm người dùng</span>
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="bg-gray-50 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-2">Id</th>
                  <th className="px-4 py-2">Họ tên</th>
                  <th className="px-4 py-2">Giới tính</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id} className="border-b">
                    <td className="px-4 py-2">{user.id}</td>
                    <td className="px-4 py-2">{user.fullname || "N/A"}</td>

                    <td className="px-4 py-2">{user.gender || "N/A"}</td>
                    <td className="px-4 py-2">{user.email || "N/A"}</td>
                    <td className="px-4 py-2">
                      <Badge
                        variant={
                          user.role === "ADMIN"
                            ? "admin"
                            : user.role === "TEACHER"
                            ? "teacher"
                            : user.role === "STUDENT"
                            ? "student"
                            : "light"
                        }
                      >
                        {user.role || "N/A"}
                      </Badge>
                    </td>

                    <td className="px-4 py-2 flex justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/admin/users/${user.id}`)}
                      >
                        <Eye size={16} className="mr-2" />
                        View
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteUser(user)}
                      >
                        <Trash size={16} className="mr-2" />
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              showingFrom={startIndex + 1}
              showingTo={Math.min(endIndex, filteredUsers.length)}
              totalItems={filteredUsers.length}
              itemName="users"
            />
          )}
        </CardContent>
      </Card>

      {/* Modal Xác Nhận Xóa */}
      {userToDelete && (
        <DeleteUser
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          userData={userToDelete}
          fetchAllListUser={fetchUsers}
        />
      )}
    </div>
  );
};

export default UserList;
