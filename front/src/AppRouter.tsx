import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import IntroPage from "./pages/IntroPage";
import LoginPage from "./pages/LoginPage";
import CreateDreamDiaryPage from "./pages/CreateDreamDiaryPage";
import SignUpPage from "./pages/SignUpPage";

function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Main" element={<MainPage />}></Route>
          <Route path="/Intro" element={<IntroPage />}></Route>
          <Route path="/Login" element={<LoginPage />}></Route>
          <Route
            path="/CreateDreamDiary"
            element={<CreateDreamDiaryPage />}
          ></Route>
          <Route path="/Signup" element={<SignUpPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
