import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function GradeAssignment({ submission }) {
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="grade">Điểm số</Label>
        <Input
          id="grade"
          type="number"
          min="0"
          max="10"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="feedback">Nhận xét</Label>
        <Textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </div>

      <Button>Lưu điểm và nhận xét</Button>
    </div>
  );
}
