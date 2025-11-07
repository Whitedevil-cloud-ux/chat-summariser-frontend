import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChatPage from "./pages/ChatPage";
import Dashboard from "./pages/Dashboard";
import QueryPage from "./components/QueryPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/dashboard/query" element={<QueryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
