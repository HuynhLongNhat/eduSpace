// src/components/CourseDetail.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  CheckCircle2,
  PlayCircle,
  Download,
  Award,
  Target,
  BookMarked,
  GraduationCap,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const courseData = {
  id: 1,
  title: "Lập trình React.js Cơ bản đến Nâng cao",
  description:
    "Khóa học toàn diện về React.js, bao gồm các khái niệm cơ bản đến nâng cao, hooks, state management, và best practices trong phát triển ứng dụng.",
  instructor: {
    name: "Nguyễn Văn A",
    avatar: "/instructor-avatar.jpg",
    title: "Senior Frontend Developer",
    description: "10+ năm kinh nghiệm phát triển web",
  },
  price: "1,299,000",
  rating: 4.8,
  students: 1234,
  duration: "20 giờ",
  lectures: 48,
  level: "Cơ bản đến Nâng cao",
  lastUpdated: "10/2023",
  features: [
    "Học theo lộ trình rõ ràng",
    "Bài tập thực hành sau mỗi bài học",
    "Source code đầy đủ",
    "Hỗ trợ học tập 24/7",
    "Cập nhật kiến thức thường xuyên",
  ],
  curriculum: [
    {
      title: "Phần 1: Giới thiệu React.js",
      lessons: [
        { title: "1.1 Tổng quan về React.js", duration: "15:00" },
        { title: "1.2 Cài đặt môi trường", duration: "20:00" },
        { title: "1.3 JSX và Components", duration: "25:00" },
      ],
    },
    {
      title: "Phần 2: React Hooks",
      lessons: [
        { title: "2.1 useState và useEffect", duration: "30:00" },
        { title: "2.2 useContext và useReducer", duration: "35:00" },
        { title: "2.3 Custom Hooks", duration: "25:00" },
      ],
    },
  ],
};

const CourseDetail = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Course Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight">
              {courseData.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {courseData.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                {courseData.rating} (1,234 đánh giá)
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {courseData.students} học viên
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {courseData.duration}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {courseData.lectures} bài giảng
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={courseData.instructor.avatar} />
                <AvatarFallback>{courseData.instructor.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{courseData.instructor.name}</p>
                <p className="text-sm text-muted-foreground">
                  {courseData.instructor.title}
                </p>
              </div>
            </div>
          </div>

          {/* Course Tabs */}
          <Tabs defaultValue="curriculum" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="curriculum">Nội dung khóa học</TabsTrigger>
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
            </TabsList>

            <TabsContent value="curriculum" className="space-y-4">
              {courseData.curriculum.map((section, idx) => (
                <Card key={idx}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">
                      {section.title}
                    </h3>
                    <div className="space-y-3">
                      {section.lessons.map((lesson, lessonIdx) => (
                        <div
                          key={lessonIdx}
                          className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <PlayCircle className="w-5 h-5 text-blue-500" />
                            <span>{lesson.title}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {lesson.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="overview">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Bạn sẽ học được gì
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {courseData.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardContent className="p-6">
                  {/* Review content here */}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardContent className="p-6 space-y-6">
              <div className="text-3xl font-bold">{courseData.price}đ</div>

              <div className="space-y-4">
                <Button className="w-full text-lg" size="lg">
                  Đăng ký học ngay
                </Button>

                <Button variant="outline" className="w-full text-lg" size="lg">
                  Thêm vào giỏ hàng
                </Button>
              </div>

              <div className="space-y-4 pt-6 border-t">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Thời lượng khóa học</p>
                    <p className="text-sm text-muted-foreground">
                      {courseData.duration}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <BookMarked className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Tổng số bài học</p>
                    <p className="text-sm text-muted-foreground">
                      {courseData.lectures} bài giảng
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <GraduationCap className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Trình độ</p>
                    <p className="text-sm text-muted-foreground">
                      {courseData.level}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Chứng chỉ hoàn thành</p>
                    <p className="text-sm text-muted-foreground">Có</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
