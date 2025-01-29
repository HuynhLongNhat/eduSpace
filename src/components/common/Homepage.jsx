import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Rocket, Users, Trophy } from "lucide-react";

const Homepage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Khám phá kiến thức mới cùng các chuyên gia hàng đầu
              </h1>
              <p className="text-xl text-blue-100">
                Học tập online linh hoạt, hiệu quả với hơn 1000+ khóa học chất
                lượng cao
              </p>
              <div className="flex gap-4">
                <Button size="lg" variant="secondary">
                  Khám phá ngay
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-blue-600"
                >
                  Tìm hiểu thêm
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              {/* Hero image or illustration */}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tại sao chọn EduLearn?</h2>
            <p className="text-gray-600">
              Nền tảng học tập trực tuyến hàng đầu với nhiều ưu điểm vượt trội
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BadgeCheck className="h-8 w-8 text-blue-600" />,
                title: "Chứng chỉ được công nhận",
                description:
                  "Chứng chỉ có giá trị cao được các doanh nghiệp công nhận",
              },
              {
                icon: <Rocket className="h-8 w-8 text-blue-600" />,
                title: "Học theo lộ trình",
                description:
                  "Lộ trình học tập rõ ràng, phù hợp với mọi trình độ",
              },
              {
                icon: <Users className="h-8 w-8 text-blue-600" />,
                title: "Mentor hỗ trợ",
                description: "Đội ngũ mentor giàu kinh nghiệm, hỗ trợ 24/7",
              },
              {
                icon: <Trophy className="h-8 w-8 text-blue-600" />,
                title: "Bài tập thực tế",
                description: "Thực hành với các dự án thực tế từ doanh nghiệp",
              },
            ].map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Khóa học phổ biến</h2>
            <Button variant="outline">Xem tất cả</Button>
          </div>

          {/* Course grid component here */}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Danh mục khóa học
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Category cards */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Sẵn sàng bắt đầu hành trình học tập?
          </h2>
          <p className="text-xl mb-8">
            Đăng ký ngay hôm nay để nhận ưu đãi đặc biệt
          </p>
          <Button size="lg" variant="secondary">
            Bắt đầu ngay
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
