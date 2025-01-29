import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Bell } from "lucide-react";

export default function Notifications() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div>
          <Label>Gửi đến</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Chọn người nhận" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả học viên</SelectItem>
              <SelectItem value="class1">Lớp React Basic</SelectItem>
              <SelectItem value="class2">Lớp React Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Nội dung thông báo</Label>
          <Textarea placeholder="Nhập nội dung thông báo..." />
        </div>

        <Button>
          <Bell className="w-4 h-4 mr-2" />
          Gửi thông báo
        </Button>
      </div>
    </div>
  );
}
