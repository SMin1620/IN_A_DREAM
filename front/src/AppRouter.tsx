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
import SearchResultPage from "./pages/SearchResultPage";
import DreamShopPage from "./pages/DreamShopPage";
import DreamDetailPage from "./pages/DreamDetailPage";
import AllUserStatisticsPage from "./pages/AllUserStatisticsPage";

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
          <Route path="/gallery/:sortKey" element={<GalleryPage />} />
          <Route
            path="/SearchResult/:keyword"
            element={<SearchResultPage />}
          ></Route>
          <Route path="/DreamShop" element={<DreamShopPage />}></Route>
          <Route path="/DreamDetail/:id" element={<DreamDetailPage />}></Route>
          <Route
            path="/AllUserStatistics"
            element={<AllUserStatisticsPage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
