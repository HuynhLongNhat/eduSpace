import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {  editClass, getClassById } from "@/services/classService";
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
import { useEffect } from "react";

const formSchema = z.object({
  className: z.string().min(1, "Tên lớp học không được để trống"),
  teacher: z.string().min(1, "Tên giáo viên không được để trống"),
  description: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự"),
});

const EditClass = () => {
  const {classId} =useParams();
  const navigate = useNavigate()
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      className: "",
      teacher: "",
      description: "",
    },
  });

 useEffect(() => {
   const fetchClassDetails = async () => {
     try {
       const response = await getClassById(classId);
       if (response.status === 200 && response.data) {
         form.reset({
           className: response.data.class_name,
           teacher: response.data.teacher,
           description: response.data.description,
         });
       }
     } catch (error) {
        console.log("error" , error.message);
       toast({
         variant: "destructive",
         title: "Có lỗi xảy ra",
       });
       navigate("/teacher/classes");
     }
   };

   if (classId) {
     fetchClassDetails();
   }
 }, [classId, form, navigate, toast]);


  const onSubmit = async (values) => {
    try {
      const classEdit = await editClass(classId, {
        class_name: values.className,
        teacher: values.teacher,
        description: values.description,
        createdAt: new Date().toISOString().split("T")[0],
      });
     console.log("classEdit", classEdit);
      if (classEdit.status === 200) {
        navigate("/teacher/classes");
        toast({
          variant: "success",
          title: "Chỉnh sửa thông tin thành công",
        });
      }
    } catch (error) {
        console.log("error :" , error.message)
      toast({
        variant: "destructive",
        title: "Có lỗi xảy ra",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Chỉnh sửa thông tin lớp học </h1>
          <p className="text-gray-600 mt-2">
            Điền các thông tin để chỉnh sửa lớp học 
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
                          <Input placeholder="Nhập tên lớp học" {...field} />
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
                          <Input placeholder="Tên giáo viên" {...field} />
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
                  onClick={() => navigate(`/teacher/classes/${classId}`)}
                >
                  Hủy
                </Button>
                <Button type="submit">Cập nhật lớp học</Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditClass;
