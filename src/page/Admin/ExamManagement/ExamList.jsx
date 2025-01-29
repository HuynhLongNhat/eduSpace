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
  BookOpen,
  GraduationCap,
  Calendar,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllExams } from "@/services/examsService";
import DeleteExam from "./DeleteExam";
import Pagination from "@/components/Pagination";

const ExamsList = () => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [examToDelete, setExamToDelete] = useState(null);
  useEffect(() => {
    fetchAllExams();
  }, []);

  const fetchAllExams = async () => {
    const res = await getAllExams();
    if (res && res.status === 200) {
      setAssignments(res.data);
    }
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const assignmentsPerPage = 5;

  // Xử lý tìm kiếm
  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.class_id
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      assignment.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xử lý phân trang
  const endIndex = currentPage * assignmentsPerPage;
  const startIndex = endIndex - assignmentsPerPage;
  const currentAssignments = filteredAssignments.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredAssignments.length / assignmentsPerPage);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  const handleDeleteExam = (exam) => {
    setExamToDelete(exam);
    setShowDeleteModal(true);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Quản lý bài kiểm tra
          </h1>
          <p className="text-gray-500 mt-2">
            Theo dõi và quản lý các bài kiểm tra được giao
          </p>
        </div>
        <Button
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600"
          onClick={() => navigate("/admin/exams/create")}
        >
          <Plus className="h-4 w-4" />
          Tạo bài kiểm tra mới
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-l-4 border-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng số bài kiểm tra
            </CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments.length}</div>
            <p className="text-xs text-muted-foreground">Đang hoạt động</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lớp học</CardTitle>
            <GraduationCap className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Lớp đang quản lý</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sắp đến hạn</CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Trong 7 ngày tới</p>
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
                placeholder="Tìm kiếm bài tập..."
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
                  <TableHead>Lớp học</TableHead>
                  <TableHead>Tên bài tập</TableHead>
                  <TableHead>Mô tả</TableHead>
                  <TableHead>Hạn nộp</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentAssignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell className="font-medium">
                      {assignment.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {assignment.class_id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {assignment.title}
                    </TableCell>
                    <TableCell className="max-w-md truncate">
                      {assignment.description}
                    </TableCell>

                    <TableCell>{formatDate(assignment.due_date)}</TableCell>

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
                                navigate(`/admin/exams/${assignment.id}`)
                              }
                            >
                              Xem chi tiết
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <span
                              onClick={() =>
                                navigate(`/admin/exams/edit/${assignment.id}`)
                              }
                            >
                              Chỉnh sửa
                            </span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <span onClick={() => handleDeleteExam(assignment)}>
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
            showingTo={Math.min(endIndex, filteredAssignments.length)}
            totalItems={filteredAssignments.length}
            itemName="users"
          />
        )}
      </Card>
      {examToDelete && (
        <DeleteExam
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          examData={examToDelete}
          fetchAllExams={fetchAllExams}
        />
      )}
    </div>
  );
};

export default ExamsList;
