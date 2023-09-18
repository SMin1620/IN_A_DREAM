import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import IntroPage from "./pages/IntroPage";
import LoginPage from "./pages/LoginPage";
import CreateDreamDiaryPage from "./pages/CreateDreamDiaryPage";
import SignUpPage from "./pages/SignUpPage";
import SearchBar from "./components/features/SearchBarComponents/SearchBar";
import MyPage from "./pages/MyPage";

function AppRouter2() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<LoginPage />}></Route>
          <Route path="/Signup" element={<SignUpPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter2;
