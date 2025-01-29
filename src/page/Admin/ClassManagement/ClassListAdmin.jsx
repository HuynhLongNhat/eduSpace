import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Users,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { getAllClass } from "@/services/classService";
import Pagination from "@/components/Pagination";
import DeleteClass from "./DeleteClass";

const ClassListAdmin = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [classToDelete, setClassToDelete] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const classesPerPage = 5;

  useEffect(() => {
    fetchAllClasses();
  }, []);

  const fetchAllClasses = async () => {
    try {
      const res = await getAllClass();
      const reversedClasses = res.data.reverse();
      setClasses(reversedClasses);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  const filteredClasses = classes.filter(
    (classItem) =>
      classItem.class_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const endIndex = currentPage * classesPerPage;
  const startIndex = endIndex - classesPerPage;
  const currentClasses = filteredClasses.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredClasses.length / classesPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

   const handleDeleteClass = (classItem) => {
     setClassToDelete(classItem);
     setShowDeleteModal(true);
   };
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Quản lý lớp học
          </h1>
          <p className="text-gray-500 mt-2">
            Quản lý và theo dõi các lớp học trực tuyến
          </p>
        </div>
        <Button
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600"
          onClick={() => navigate("/admin/classes/create")}
        >
          <Plus className="h-4 w-4" />
          Thêm lớp mới
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-l-4 border-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng số lớp học
            </CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classes.length}</div>
            <p className="text-xs text-muted-foreground">Đang hoạt động</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Học sinh</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">Tổng số học sinh</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Giáo viên</CardTitle>
            <GraduationCap className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Đang giảng dạy</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8 p-5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Tìm kiếm lớp học..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Bộ lọc
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Tên lớp</TableHead>
                  <TableHead>Giáo viên</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentClasses.map((classItem) => (
                  <TableRow key={classItem.id}>
                    <TableCell className="font-medium">
                      {classItem.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {classItem.class_name}
                    </TableCell>
                    <TableCell>{classItem.teacher}</TableCell>
                    <TableCell>{classItem.createdAt}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <span
                              onClick={() =>
                                navigate(`/admin/classes/${classItem.id}`)
                              }
                            >
                              Xem chi tiết
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <span
                              onClick={() =>
                                navigate(`/admin/classes/edit/${classItem.id}`)
                              }
                            >
                              Chỉnh sửa
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <span onClick={() => handleDeleteClass(classItem)}>
                              Xóa
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            showingFrom={startIndex + 1}
            showingTo={Math.min(endIndex, filteredClasses.length)}
            totalItems={filteredClasses.length}
            itemName="lớp"
          />
        )}
      </Card>
      {classToDelete && (
        <DeleteClass
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          classData={classToDelete}
          fetchAllClasses={fetchAllClasses}
        />
      )}
    </div>
  );
};

export default ClassListAdmin;
