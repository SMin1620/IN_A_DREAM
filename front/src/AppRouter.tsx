import React from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
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
import CloudPage from "./pages/CloudPage";
import StartPage from "./pages/StartPage";
import PrivateRoute from "./PrivateRoute";
import Error404Page from "./pages/Error404Page";

function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* 보안없이 접속이 가능해야 하는 페이지 */}
          <Route path="/" element={<StartPage />} />
          <Route path="/Intro" element={<IntroPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Signup" element={<SignUpPage />} />
          <Route path="/*" element={<Error404Page />} />
          {/* 라우터 보안 걸어줘야 하는 페이지들 */}
          <Route
            path="/Main"
            element={[
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>,
            ]}
          />
          <Route
            path="/CreateDreamDiary"
            element={[
              <PrivateRoute>
                <CreateDreamDiaryPage />
              </PrivateRoute>,
            ]}
          />
          <Route
            path="/Mypage"
            element={[
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>,
            ]}
          />
          <Route
            path="/gallery/:sortKey"
            element={[
              <PrivateRoute>
                <GalleryPage />
              </PrivateRoute>,
            ]}
          />
          <Route
            path="/SearchResult/:keyword"
            element={[
              <PrivateRoute>
                <SearchResultPage />
              </PrivateRoute>,
            ]}
          />
          <Route
            path="/DreamShop"
            element={[
              <PrivateRoute>
                <DreamShopPage />
              </PrivateRoute>,
            ]}
          />
          <Route
            path="/DreamDetail/:id"
            element={[
              <PrivateRoute>
                <DreamDetailPage />
              </PrivateRoute>,
            ]}
          />
          <Route
            path="/AllUserStatistics"
            element={[
              <PrivateRoute>
                <AllUserStatisticsPage />
              </PrivateRoute>,
            ]}
          />
          <Route
            path="/Gallery"
            element={[
              <PrivateRoute>
                <GalleryPage />
              </PrivateRoute>,
            ]}
          />
          <Route
            path="/Cloud"
            element={[
              <PrivateRoute>
                <CloudPage />
              </PrivateRoute>,
            ]}
          />
          <Route
            path="/Error404"
            element={[
              <PrivateRoute>
                <Error404Page />
              </PrivateRoute>,
            ]}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
