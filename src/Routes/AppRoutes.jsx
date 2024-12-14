import { Route, Routes } from "react-router-dom";

import { Suspense } from "react";
import Login from "@/page/Login";
import SignUp from "@/page/SignUp";

import HomePage from "@/page/HomePage";

const AppRoutes = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default AppRoutes;
