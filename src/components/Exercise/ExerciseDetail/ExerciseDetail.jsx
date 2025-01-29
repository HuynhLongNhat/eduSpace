import CodeEditor from "@/components/ide/CodeEditor/CodeEditor";
import TestResults from "@/components/ide/TestCases/TestResult";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExerciseDetail = () => {
  const quizData = {
    id: 1,
    title: "Tìm số lớn nhất trong mảng",
    difficulty: "Trung bình",
    description: `Viết chương trình C++ để tìm số lớn nhất trong một mảng số nguyên.

Input:
- Dòng đầu tiên chứa số nguyên n (1 ≤ n ≤ 1000) - số phần tử của mảng
- Dòng thứ hai chứa n số nguyên a[i] (|a[i]| ≤ 10^9)

Output:
- Một số nguyên duy nhất - giá trị lớn nhất trong mảng`,
    sampleInput: "5\n1 2 3 4 5",
    sampleOutput: "5",
    timeLimit: "1 giây",
    memoryLimit: "256 MB",
    points: 100,
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{quizData.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">{quizData.difficulty}</Badge>
                    <Badge variant="outline">{quizData.points} điểm</Badge>
                  </div>
                </div>
                <Button>Nộp bài</Button>
              </div>
            </CardHeader>
            <CardContent className="prose max-w-none">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold">Mô tả bài toán</h3>
                  <p className="whitespace-pre-line">{quizData.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">Input mẫu</h3>
                    <pre className="p-4 bg-gray-100 rounded-lg">
                      {quizData.sampleInput}
                    </pre>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Output mẫu</h3>
                    <pre className="p-4 bg-gray-100 rounded-lg">
                      {quizData.sampleOutput}
                    </pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Giới hạn</h3>
                  <ul className="list-disc list-inside">
                    <li>Thời gian: {quizData.timeLimit}</li>
                    <li>Bộ nhớ: {quizData.memoryLimit}</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Code Editor</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeEditor />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle>Kết quả chạy thử</CardTitle>
            </CardHeader>
            <CardContent>
              <TestResults />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;
