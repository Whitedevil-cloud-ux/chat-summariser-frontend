import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import { API_BASE } from "../config";

function ChatPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [conversationId, setConversationId] = useState(id || null);

  useEffect(() => {
    if (id) {
      setConversationId(id);
    }
  }, [id]);

  const handleNewConversation = async () => {
    const res = await fetch(`${API_BASE}/chat/start/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "New Conversation" }),
    });
    const data = await res.json();

    navigate(`/chat/${data.conversation_id}`);
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <Sidebar
        activeId={conversationId}
        onSelectConversation={(cid) => navigate(`/chat/${cid}`)}
        onNewConversation={handleNewConversation}
      />

      {conversationId ? (
        <ChatArea conversationId={conversationId} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select or create a conversation
        </div>
      )}
    </div>
  );
}

export default ChatPage;
