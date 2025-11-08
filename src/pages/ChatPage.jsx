import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import Navbar from "../components/Navbar";
import { API_BASE } from "../config";

function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [conversationId, setConversationId] = useState(id || null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setConversationId(id || null);
  }, [id]);

  const handleNewConversation = async () => {
    const res = await fetch(`${API_BASE}/chat/start/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New Conversation" }),
    });
    const data = await res.json();
    navigate(`/chat/${data.conversation_id}`);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex relative">
        <Sidebar
          isOpen={sidebarOpen || window.innerWidth >= 768}
          toggleSidebar={() => setSidebarOpen((p) => !p)}
          activeId={conversationId}
          onSelectConversation={(cid) => {
            navigate(`/chat/${cid}`);
            setSidebarOpen(false);
          }}
          onNewConversation={handleNewConversation}
        />

        <div className="hidden md:block w-72 shrink-0" />

        <div className="flex-1 min-h-[calc(100vh-56px)]">
          {conversationId ? (
            <ChatArea conversationId={conversationId} />
          ) : (
            <div className="h-[calc(100vh-56px)] flex items-center justify-center text-gray-500 dark:text-gray-300 px-4">
              Select or create a conversation
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
