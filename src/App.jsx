import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { UserProvider } from "./contexts/UserContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              {/* Page liste des articles sur la home */}
              <Route path="/" element={<Home />} />
              
              {/* Page détail d'un article */}
              <Route path="/post/:id" element={<Post />} />
              
              {/* Page de connexion */}
              <Route path="/login" element={<Login />} />
              
              {/* Page de réinitialisation de mot de passe */}
              <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
