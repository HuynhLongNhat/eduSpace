import { X, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { deleteUser } from "@/services/userService";

const DeleteUser = ({ show, handleClose, userData, fetchAllListUser }) => {
    const { toast } = useToast();
  console.log("user deleted" , userData)
  const confirmDelete = async () => {
    try {
      const res = await deleteUser(userData?.id);
      console.log("res", res);
      if (res && res.status === 200) {
        toast({
          variant: "success",
          title: "Xóa người dùng thành công",
        });
        fetchAllListUser();
        handleClose();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Có lỗi xảy ra khi xóa người dùng",
      });
    }
  };

  return (
    <Dialog open={show} onOpenChange={handleClose}>
      <DialogContent className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl font-semibold text-gray-900">
            <Trash size={20} className="text-red-600" />
            <span>Xác nhận xóa người dùng!</span>
          </DialogTitle>
          <DialogDescription className="mt-4 text-gray-700">
            Bạn có chắc chắn muốn thực hiện thao tác này không?
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Đóng
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Xác nhận
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUser;
