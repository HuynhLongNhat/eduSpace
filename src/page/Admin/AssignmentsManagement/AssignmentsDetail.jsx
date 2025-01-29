import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  Users,
  FileText,
  CheckCircle2,
  Download,
  Upload,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { getAssignmentById } from "@/services/assignmentsService";
import { useNavigate, useParams } from "react-router-dom";

const AssignmentsDetail = () => {
  const navigate = useNavigate();
  const { assignmentId } = useParams();
  const [assignment , setAssignment ] = useState([]);
   useEffect(()=>{
  fetchAssignmentDetail();
    },[])
  
    const fetchAssignmentDetail = async() =>{
       const res = await getAssignmentById(assignmentId);
       if(res && res.status === 200) {
         setAssignment(res.data);
       }
    } 
  const assignmentMockData = {
    id: 9,
    title: "Ứng dụng quản lý thư viện",
    description:
      "Xây dựng ứng dụng quản lý mượn trả sách bằng Java Swing. Ứng dụng cần có các chức năng cơ bản như quản lý sách, quản lý độc giả, quản lý mượn trả, tìm kiếm và báo cáo thống kê.",
    subject: "Java Programming",
    class: "SE2023",
    dueDate: "2025-02-17T14:00:00",
    status: "Đang diễn ra",
    teacher: {
      name: "Nguyễn Văn A",
      avatar: "/teacher-avatar.jpg",
    },
    submissions: 15,
    totalStudents: 30,
    requirements: [
      "Sử dụng Java Swing để xây dựng giao diện",
      "Kết nối với cơ sở dữ liệu MySQL",
      "Có chức năng đăng nhập, phân quyền",
      "Quản lý thông tin sách (thêm, sửa, xóa, tìm kiếm)",
      "Quản lý mượn trả sách",
      "Xuất báo cáo thống kê",
    ],
    attachments: [
      { name: "Requirements.pdf", size: "2.5MB" },
      { name: "Database_Schema.sql", size: "1.2MB" },
    ],
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" className="mb-6"
      onClick={() => navigate("/admin/assignments") }>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Quay lại
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="mb-2">
                  {assignmentMockData.subject}
                </Badge>
                <Badge
                  variant={
                    assignmentMockData.status === "Đang diễn ra"
                      ? "success"
                      : "warning"
                  }
                >
                  {assignmentMockData.status}
                </Badge>
              </div>
              <CardTitle className="text-2xl">{assignment.title}</CardTitle>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date(assignment.due_date).toLocaleDateString("vi-VN")}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-2 h-4 w-4" />
                  {new Date(assignment.due_date).toLocaleTimeString("vi-VN")}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="mr-2 h-4 w-4" />
                  Lớp {assignmentMockData.class}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="description" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="description">Mô tả</TabsTrigger>
                  <TabsTrigger value="requirements">Yêu cầu</TabsTrigger>
                  <TabsTrigger value="submissions">Bài nộp</TabsTrigger>
                </TabsList>

                <TabsContent value="description">
                  <div className="prose max-w-none">
                    <p>{assignment.description}</p>
                  </div>
                </TabsContent>

                <TabsContent value="requirements">
                  <ul className="space-y-2">
                    {assignmentMockData.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="submissions">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Tiến độ nộp bài</p>
                        <p className="text-lg font-semibold">
                          {assignmentMockData.submissions}/
                          {assignmentMockData.totalStudents} bài đã nộp
                        </p>
                      </div>
                      <Progress
                        value={
                          (assignmentMockData.submissions /
                            assignmentMockData.totalStudents) *
                          100
                        }
                        className="w-64"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tài liệu đính kèm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {assignmentMockData.attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-gray-500">{file.size}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin giảng viên</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={assignmentMockData.teacher.avatar} />
                  <AvatarFallback>
                    {assignmentMockData.teacher.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {assignmentMockData.teacher.name}
                  </p>
                  <p className="text-sm text-gray-500">Giảng viên phụ trách</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nộp bài</CardTitle>
              <CardDescription>Tải lên file bài làm của bạn</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">
                  Kéo thả file vào đây hoặc click để chọn file
                </p>
              </div>
              <Button className="w-full mt-4">Nộp bài</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thảo luận</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Thêm bình luận..."
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <Button size="icon">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssignmentsDetail;
