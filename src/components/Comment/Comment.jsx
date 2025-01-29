// src/components/Comments.jsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

// export default function Comments({ comments = [] }) {
export default function Comments() {
  const comments = [
    {
      id: 1,
      author: {
        name: "Nguyễn Văn A",
        avatar: "/avatar1.jpg",
        initials: "NA",
      },
      content: "Đây là một bình luận mẫu!",
      timestamp: "2024-12-20T10:00:00Z",
    },
    {
      id: 2,
      author: {
        name: "Trần Thị B",
        avatar: "/avatar2.jpg",
        initials: "TB",
      },
      content: "Tôi rất thích bài viết này!",
      timestamp: "2024-12-20T11:00:00Z",
    },
    {
      id: 3,
      author: {
        name: "Lê C",
        avatar: "/avatar3.jpg",
        initials: "LC",
      },
      content: "Cảm ơn bạn đã chia sẻ!",
      timestamp: "2024-12-20T12:00:00Z",
    },
  ];

  const [newComment, setNewComment] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src="/avatar.jpg" />
          <AvatarFallback>TC</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder="Viết bình luận..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button className="mt-2">Gửi bình luận</Button>
        </div>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar>
              <AvatarImage src={comment.author.avatar} />
              <AvatarFallback>{comment.author.initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="bg-muted p-3 rounded-lg">
                <div className="font-semibold">{comment.author.name}</div>
                <p>{comment.content}</p>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(comment.timestamp), {
                  addSuffix: true,
                  locale: vi,
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
