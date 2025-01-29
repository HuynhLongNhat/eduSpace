import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Calendar as CalendarIcon,
  ArrowLeft,
  Clock,
  FileText,
  Users,
  Book,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { DateTimePicker } from "@/components/DateTimePicker";

const formSchema = z.object({
  title: z.string().min(1, "Vui lòng nhập tiêu đề"),
  class: z.string().min(1, "Vui lòng chọn lớp học"),
  subject: z.string().min(1, "Vui lòng chọn môn học"),
  content: z.string().min(1, "Vui lòng nhập nội dung"),
  endDateTime: z.date({ required_error: "Vui lòng chọn hạn nộp" }),
  maxScore: z.string().min(1, "Vui lòng nhập điểm tối đa"),
});

const CreateAssignmentAdmin = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      class: "",
      subject: "",
      endDateTime: undefined,
      maxScore: "",
    },
  });

  const classes = [
    { id: 1, name: "SE2023A - Công nghệ phần mềm" },
    { id: 2, name: "SE2023B - Lập trình Java" },
    { id: 3, name: "SE2023C - Cơ sở dữ liệu" },
  ];

  const subjects = [
    { id: 1, name: "Java Programming" },
    { id: 2, name: "Database Management" },
    { id: 3, name: "Software Engineering" },
  ];

  const onSubmit = (data) => {
    console.log("Form data:", data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate("/admin/assignments")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
          </button>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="border-b bg-gray-50/50">
            <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Tạo bài tập mới
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">
                          Tiêu đề bài tập
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nhập tiêu đề bài tập"
                            className="border-gray-200"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="class"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Lớp học</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-gray-200">
                              <SelectValue placeholder="Chọn lớp học" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {classes.map((cls) => (
                              <SelectItem
                                key={cls.id}
                                value={cls.id.toString()}
                              >
                                <div className="flex items-center gap-2">
                                  <Users className="w-4 h-4 text-gray-500" />
                                  {cls.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />         
                  <FormField
                    control={form.control}
                    name="endDateTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Hạn nộp</FormLabel>
                        <DateTimePicker field={field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">
                        Nội dung bài tập
                      </FormLabel>
                      <FormControl>
                        <MDEditor
                          value={field.value}
                          onChange={field.onChange}
                          height={400}
                          preview="edit"
                          className="border rounded-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/admin/assignments")}
                    className="border-gray-200"
                  >
                    Hủy
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Tạo bài tập
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateAssignmentAdmin;
