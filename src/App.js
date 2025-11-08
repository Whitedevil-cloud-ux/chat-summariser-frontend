import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChatPage from "./pages/ChatPage";
import Dashboard from "./pages/Dashboard";
import QueryPage from "./components/QueryPage";
import { useState } from "react";

function AppContent() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isChatRoute = location.pathname.startsWith("/chat") || location.pathname === "/";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar
        onToggleSidebar={isChatRoute ? () => setSidebarOpen((p) => !p) : null}
      />

      <Routes>
        <Route
          path="/"
          element={<ChatPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        />
        <Route
          path="/chat/:id"
          element={<ChatPage sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/query" element={<QueryPage />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
