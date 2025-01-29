// src/pages/ClassList.jsx
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  BookOpen,
  Calendar,
  ClipboardList,
  Plus,
  Search,
  Filter,
  MoreVertical,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const ClassList = () => {
  const [activeClasses, setActiveClasses] = useState([
    {
      id: 1,
      name: "Lớp React.js Nâng cao",
      code: "REACT-ADV-01",
      students: 25,
      progress: 65,
      startDate: "01/01/2024",
      endDate: "31/03/2024",
      instructor: {
        name: "Nguyễn Văn A",
        avatar: "/instructor1.jpg",
      },
      status: "active",
    },
    // Thêm các lớp học khác
  ]);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Lớp học</h1>
          <p className="text-gray-500">
            Quản lý và theo dõi các lớp học của bạn
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Tạo lớp học mới
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="active">Lớp đang học</TabsTrigger>
          <TabsTrigger value="completed">Đã hoàn thành</TabsTrigger>
          <TabsTrigger value="upcoming">Sắp khai giảng</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Tìm kiếm lớp học..." className="pl-8" />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Bộ lọc
          </Button>
        </div>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Tổng số lớp"
              value="12"
              icon={<BookOpen className="h-4 w-4" />}
              trend="+2 tuần này"
            />
            <StatsCard
              title="Học viên"
              value="245"
              icon={<Users className="h-4 w-4" />}
              trend="+18 tuần này"
            />
            <StatsCard
              title="Tỷ lệ hoàn thành"
              value="85%"
              icon={<ClipboardList className="h-4 w-4" />}
              trend="+5% so với tháng trước"
            />
            <StatsCard
              title="Lớp sắp khai giảng"
              value="4"
              icon={<Calendar className="h-4 w-4" />}
              trend="Trong tuần tới"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Lớp học đang diễn ra</CardTitle>
                <CardDescription>
                  Danh sách các lớp học đang hoạt động
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ActiveClassesList classes={activeClasses} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lịch dạy hôm nay</CardTitle>
                <CardDescription>Các buổi học trong ngày</CardDescription>
              </CardHeader>
              <CardContent>
                <TodaySchedule />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Other tab contents */}
      </Tabs>
    </div>
  );
};

// Components
const StatsCard = ({ title, value, icon, trend }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">{icon}</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
              <DropdownMenuItem>Xuất báo cáo</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold">{value}</h3>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-sm text-green-600">{trend}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const ActiveClassesList = ({ classes }) => {
  return (
    <div className="space-y-4">
      {classes.map((classItem) => (
        <div
          key={classItem.id}
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold">{classItem.name}</h4>
              <p className="text-sm text-gray-500">Mã lớp: {classItem.code}</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span>{classItem.students} học viên</span>
              </div>
              <Progress value={classItem.progress} className="w-32 mt-2" />
            </div>

            <Badge
              variant={classItem.status === "active" ? "success" : "secondary"}
            >
              {classItem.status === "active" ? "Đang học" : "Hoàn thành"}
            </Badge>

            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

const TodaySchedule = () => {
  const schedules = [
    {
      id: 1,
      className: "React.js Nâng cao",
      time: "09:00 - 11:00",
      instructor: "Nguyễn Văn A",
      status: "upcoming",
    },
    {
      id: 2,
      className: "Node.js Cơ bản",
      time: "14:00 - 16:00",
      instructor: "Trần Thị B",
      status: "ongoing",
    },
  ];

  return (
    <div className="space-y-4">
      {schedules.map((schedule) => (
        <div key={schedule.id} className="p-4 border rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">{schedule.className}</h4>
            <Badge
              variant={schedule.status === "ongoing" ? "success" : "secondary"}
            >
              {schedule.status === "ongoing" ? "Đang diễn ra" : "Sắp diễn ra"}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            {schedule.time}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            {schedule.instructor}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClassList;
