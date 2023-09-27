import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import IntroPage from "./pages/IntroPage";
import LoginPage from "./pages/LoginPage";
import CreateDreamDiaryPage from "./pages/CreateDreamDiaryPage";
import SignUpPage from "./pages/SignUpPage";
import SearchBar from "./components/features/SearchBarComponents/SearchBar";
import MyPage from "./pages/MyPage";
import Navbar from "./components/features/NavbarComponents/Navbar";
import GalleryPage from "./pages/GalleryPage";
import CloudPage from "./pages/CloudPage";

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
          <Route path="/Mypage" element={<MyPage />}></Route>
          <Route path="/Gallery" element={<GalleryPage />}></Route>
          <Route path="/Cloud" element={<CloudPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
