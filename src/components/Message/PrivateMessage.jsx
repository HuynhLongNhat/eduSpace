import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PrivateMessage() {
  const student = {
    avatar: "https://i.pravatar.cc/150?u=student1",
    initials: "NV",
    name: "Nguyễn Văn A",
    class: "12A1",
  };
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  return (
    <div className="h-[600px] flex flex-col">
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={student.avatar} />
            <AvatarFallback>{student.initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{student.name}</div>
            <div className="text-sm text-muted-foreground">{student.class}</div>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "teacher" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.sender === "teacher"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Nhập tin nhắn..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button>Gửi</Button>
        </div>
      </div>
    </div>
  );
}
