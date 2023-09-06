import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";

function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/Main" element={<MainPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
