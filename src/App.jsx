import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Posts from "./Posts";
import PostDetail from "./PostDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Page liste des articles sur la home */}
        <Route path="/" element={<Posts />} />
        
        {/* Page détail d'un article */}
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
