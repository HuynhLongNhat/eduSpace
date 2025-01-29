import { Outlet } from "react-router-dom";
import styles from "./TeacherDashboard.module.css"
import { SidebarTeacher } from "@/components/Teacher/SidebarTeacher";
const TeacherDashboard = () => {
  return (
    <>
  
      <div className={styles.teacherLayout}>
        <SidebarTeacher />
        <div className={styles.mainContent}>
          <Outlet />
        </div>
      </div>
     
    </>
  );
};

export default TeacherDashboard;
