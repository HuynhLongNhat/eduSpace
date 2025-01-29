import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createNewClass } from "@/services/classService";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  className: z.string().min(1, "Tên lớp học không được để trống"),
  teacher: z.string().min(1, "Tên giáo viên không được để trống"),
  description: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự"),
});

const CreateClass = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      className: "",
      teacher: "",
      description: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const newClass = await createNewClass({
        class_name: values.className,
        teacher: values.teacher,
        description: values.description,
        createdAt: new Date().toISOString().split('T')[0],
      });

      if (newClass.status === 201) {
        navigate("/teacher/classes");
        toast({
          variant: "success",
          title: "Tạo lớp học mới thành công",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Có lỗi xảy ra",
        description: "Không thể tạo lớp học. Vui lòng thử lại.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Tạo lớp học mới</h1>
          <p className="text-gray-600 mt-2">
            Điền các thông tin để tạo một lớp học mới
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white rounded-xl shadow-sm p-8"
          >
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Thông tin cơ bản
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="className"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên lớp học</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập tên lớp học"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="teacher"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giáo viên</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Tên giáo viên"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Thông tin bổ sung
                </h2>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả lớp học</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Nhập mô tả chi tiết về lớp học..."
                          className="h-32"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/teacher/classes")}
                >
                  Hủy
                </Button>
                <Button type="submit">
                  Tạo lớp học
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateClass;