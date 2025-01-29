import { useEffect, useState } from "react";
import { Save, X, FileText, Clock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllClass } from "@/services/classService";
import MDEditor from "@uiw/react-md-editor";
import { createNewLecture, editLecture, getLectureById } from "@/services/lecturesService";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  class_id: z.string().min(1, "Vui lòng chọn lớp học"),
  title: z.string().min(3, "Tiêu đề phải có ít nhất 3 ký tự"),
  content: z.string().min(10, "Nội dung phải có ít nhất 10 ký tự"),
});

const EditLectureAdmin = () => {
  const { lectureId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      class_id: "",
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    if (lectureId) {
      fetchLectureDetail();
    }
    fetchAllClasses();
  }, [lectureId]);

  const fetchLectureDetail = async () => {
    try {
      const res = await getLectureById(lectureId);
      if (res?.status === 200) {
        form.reset({
          class_id: res.data.class_id,
          title: res.data.title,
          content: res.data.content,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi khi tải thông tin bài giảng",
        description: "Vui lòng thử lại sau",
      });
    }
  };

  const fetchAllClasses = async () => {
    try {
      const res = await getAllClass();
      setClasses(res.data);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi khi tải danh sách lớp học",
        description: "Vui lòng thử lại sau",
      });
    }
  };

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      const res = await editLecture(lectureId,{
        ...values,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (res?.status === 200) {
        toast({
          variant: "success",
          description: "Cập nhật bài giảng thành công",
        });
        navigate("/admin/lectures");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không thể tạo bài giảng. Vui lòng thử lại sau",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            {lectureId ? "Chỉnh Sửa Bài Giảng" : "Tạo Bài Giảng Mới"}
          </CardTitle>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{new Date().toLocaleDateString("vi-VN")}</span>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="class_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lớp học</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="block w-full rounded border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiêu Đề Bài Giảng</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập tiêu đề bài giảng" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nội Dung Bài Giảng</FormLabel>
                    <FormControl>
                      <MDEditor
                        value={field.value}
                        onChange={field.onChange}
                        height={300}
                        preview="edit"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/admin/lectures")}
                >
                  <X className="h-4 w-4 mr-2" />
                  Hủy
                </Button>
                <Button type="submit" disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Đang xử lý..." : "Lưu Bài Giảng"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditLectureAdmin;
