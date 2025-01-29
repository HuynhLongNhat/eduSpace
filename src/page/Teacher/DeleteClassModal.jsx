/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { deleteClass } from "@/services/classService";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const DeleteClassModal = ({ isOpen, onClose, classData }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDeleteClass = async () => {
    const res = await deleteClass(classData.id);
    if (res.status === 200) {
      onClose();
      toast({
        variant: "success",
        title: "Xóa lớp học thành công!",
      });
      navigate("/teacher/classes");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md transform rounded-lg bg-white p-6 shadow-lg">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            Xóa lớp học
          </DialogTitle>
        </DialogHeader>

        <DialogDescription className="mt-4 text-center text-gray-600">
          Bạn có chắc chắn muốn xóa lớp học{" "}
          <span className="font-medium text-gray-900">
            {classData.class_name}
          </span>
          ?<br />
          <span className="text-sm text-red-600">
            Hành động này không thể hoàn tác.
          </span>
        </DialogDescription>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md bg-red-600 px-5 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            onClick={handleDeleteClass}
          >
            Xóa lớp học
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteClassModal;
