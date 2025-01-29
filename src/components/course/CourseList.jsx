// src/components/CourseList.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Book, Search, BookOpen, Clock, Users, Star } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Lập trình React.js Cơ bản đến Nâng cao",
    description: "Học React.js từ zero đến hero với các best practices",
    students: 1234,
    duration: "20 giờ",
    rating: 4.8,
    level: "Cơ bản",
  },
  {
    id: 2,
    title: "Node.js & Express Backend Development",
    description: "Xây dựng REST API và backend với Node.js",
    students: 856,
    duration: "15 giờ",
    rating: 4.7,
    level: "Trung bình",
  },
  // Thêm các khóa học khác
];

const CourseList = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Khám phá Khóa học
          </h1>
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Tìm kiếm khóa học..." className="pl-8" />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            <TabsTrigger value="basic">Cơ bản</TabsTrigger>
            <TabsTrigger value="intermediate">Trung bình</TabsTrigger>
            <TabsTrigger value="advanced">Nâng cao</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="group hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-white opacity-75" />
                    </div>
                    <CardTitle className="mt-4 line-clamp-2">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{course.students} học viên</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        <span>{course.rating}/5.0</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Book className="w-4 h-4" />
                        <span>{course.level}</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Link to={`/courses/${course.id}`} className="w-full">
                      <Button className="w-full group-hover:bg-blue-600">
                        Xem chi tiết khóa học
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CourseList;
