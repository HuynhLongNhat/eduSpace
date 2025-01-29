import { Badge } from "lucide-react";

const TestResults = () => {
  const results = [
    { id: 1, status: "success", time: "0.1s", memory: "2.3 MB" },
    { id: 2, status: "error", time: "0.2s", memory: "2.4 MB" },
    // Thêm các kết quả khác
  ];

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <div
          key={result.id}
          className={`p-4 rounded-lg ${
            result.status === "success" ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Test case #{result.id}</span>
            <Badge
              variant={result.status === "success" ? "success" : "destructive"}
            >
              {result.status === "success" ? "Đạt" : "Lỗi"}
            </Badge>
          </div>
          <div className="text-sm text-gray-500">
            <div>Thời gian: {result.time}</div>
            <div>Bộ nhớ: {result.memory}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TestResults;
