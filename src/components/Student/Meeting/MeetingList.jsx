// src/pages/Meetings.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Video, Plus, Calendar, Clock, Users } from "lucide-react";

const MeetingList = () => {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: "Buổi học React Hooks",
      date: "2024-01-10",
      time: "19:00",
      duration: "120",
      participants: 25,
      status: "upcoming",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Quản lý Meeting</h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Tạo meeting mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tạo meeting mới</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Tiêu đề</Label>
                <Input id="title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Ngày</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Giờ</Label>
                  <Input id="time" type="time" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Thời lượng (phút)</Label>
                <Input id="duration" type="number" />
              </div>
            </div>
            <Button>Tạo meeting</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tiêu đề</TableHead>
              <TableHead>Ngày</TableHead>
              <TableHead>Giờ</TableHead>
              <TableHead>Thời lượng</TableHead>
              <TableHead>Số người tham gia</TableHead>
              <TableHead>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meetings.map((meeting) => (
              <TableRow key={meeting.id}>
                <TableCell>{meeting.title}</TableCell>
                <TableCell>{meeting.date}</TableCell>
                <TableCell>{meeting.time}</TableCell>
                <TableCell>{meeting.duration} phút</TableCell>
                <TableCell>{meeting.participants}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4 mr-2" />
                    Vào meeting
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MeetingList;
