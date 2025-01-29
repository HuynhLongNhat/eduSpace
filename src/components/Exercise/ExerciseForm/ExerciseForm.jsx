import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import TestCaseEditor from "./TestCaseEditor";
import { Input } from "@/components/ui/input";
import CodeEditor from "@/components/ide/CodeEditor/CodeEditor";

const ExerciseForm = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Tạo bài tập mới</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tên bài tập</label>
                <Input placeholder="Nhập tên bài tập" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Độ khó</label>
                <select className="w-full p-2 border rounded">
                  <option>Cơ bản</option>
                  <option>Trung bình</option>
                  <option>Nâng cao</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mô tả bài tập</label>
              <textarea
                className="w-full p-2 border rounded min-h-[100px]"
                placeholder="Nhập mô tả bài tập"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Mã nguồn mẫu</label>
              <CodeEditor />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Test cases</label>
              <TestCaseEditor />
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline">Hủy</Button>
              <Button>Lưu bài tập</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExerciseForm;
