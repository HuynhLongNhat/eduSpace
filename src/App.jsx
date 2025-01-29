import AppRoutes from "./Routes/AppRoutes";
import { Toaster } from "@/components/ui/toaster"
const App = () => {
  return (
    <div>
      <AppRoutes />
      <Toaster />
    </div>
  );
};

export default App;
