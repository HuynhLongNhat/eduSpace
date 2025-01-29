import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Users,
  BookOpen,
  ClipboardList,
  Video,
  Calendar,
  BarChart2,
  MessageCircle,
  MenuIcon,
} from "lucide-react";

// Menu items configuration
const menuItems = [
  {
    title: "User",
    icon: Users,
    path: "/admin/users",
  },
  {
    title: "Lớp học",
    icon: Users,
    path: "/admin/classes",
  },
  {
    title: "Bài giảng",
    icon: BookOpen,
    path: "/admin/lectures",
  },
  {
    title: "Bài tập",
    icon: ClipboardList,
    path: "/admin/assignments",
  },
  {
    title: "Kiểm tra",
    icon: ClipboardList,
    path: "/admin/exams",
  },
  {
    title: "Meeting",
    icon: Video,
    path: "/admin/meetings",
  },
  {
    title: "Thống kê",
    icon: BarChart2,
    path: "/admin/statistics",
  },
  {
    title: "Lịch",
    icon: Calendar,
    path: "/admin/calendar",
  },
  {
    title: "Tin nhắn",
    icon: MessageCircle,
    path: "/admin/messages",
  },
];

export const SidebarAdmin = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-card border-r transition-all duration-300 ${
          open ? "w-64" : "w-20"
        }`}
      >
        <div className="p-4 flex items-center justify-between">
          <h2
            className={`font-bold text-xl transition-transform ${
              open ? "scale-100" : "scale-0"
            }`}
          >
            Admin Dashboard
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen((prev) => !prev)}
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
        </div>

        <nav className="mt-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3 transition-colors ${
                  isActive ? "bg-accent " : "hover:bg-accent"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span
                  className={`transition-all ${!open ? "hidden" : "block"}`}
                >
                  {item.title}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div
        className={`flex-1 transition-all duration-300 ${
          open ? "ml-64" : "ml-20"
        }`}
      ></div>
    </div>
  );
};
