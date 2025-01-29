import { useState } from "react";
import { Check, X } from "@lucide/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

const StudentForm = ({ onSubmit, student = null }) => {
  const [name, setName] = useState(student?.name || "");
  const [email, setEmail] = useState(student?.email || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email });
  };

  return (
    <Form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <FormField>
        <Label htmlFor="name">Name</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormField>
      <FormField>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormField>
      <div className="flex justify-end space-x-2">
        <Button type="submit" variant="primary">
          <Check className="w-5 h-5 inline-block mr-2" />
          Save
        </Button>
        <Button type="button" variant="destructive">
          <X className="w-5 h-5 inline-block mr-2" />
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default StudentForm;
