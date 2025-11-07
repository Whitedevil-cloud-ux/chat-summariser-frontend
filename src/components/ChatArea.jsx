import { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import ChatBubble from "./ChatBubble";

function ChatArea({ conversationId }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!conversationId) {
        setMessages([{ sender: "ai", message: "Start a conversation to begin." }]);
        return;
      }
      const res = await fetch(`http://127.0.0.1:8000/api/chat/${conversationId}/`);
      const data = await res.json();
      const mapped = (data.messages || []).map((m) => ({
        sender: m.sender,
        message: m.content,
        timestamp: m.timestamp,
      }));
      setMessages(mapped.length ? mapped : [{ sender: "ai", message: "Say something and I’ll summarize!" }]);
    };
    load();
  }, [conversationId]);

  const handleSendMessage = async (text) => {
    if (!conversationId) return;
    const newMessage = { sender: "user", message: text };
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat/send/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation_id: conversationId, message: text }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          message: data.reply,
          followUps: data.follow_ups || [],
        },
      ]);
    } catch {
      setMessages((prev) => [...prev, { sender: "ai", message: "Unable to connect to backend" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndConversation = async () => {
    if (!conversationId) return;
    setIsLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat/end/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation_id: conversationId }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "ai", message: `🧾 Summary:\n${data.summary}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowUpClick = (question) => {
    handleSendMessage(question);
  };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-300">Conversation {conversationId || "—"}</div>
        <button
          onClick={handleEndConversation}
          className="text-xs bg-gray-800 dark:bg-indigo-500 text-white px-3 py-1 rounded disabled:bg-gray-400 dark:disabled:bg-indigo-300"
          disabled={isLoading || !conversationId}
        >
          End & Summarize
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <ChatBubble key={i} sender={m.sender} message={m.message} timestamp={m.timestamp} followUps={m.followUps} onClickFollowUp={handleFollowUpClick} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-4 py-2 rounded-lg rounded-bl-none">
              AI is thinking...
            </div>
          </div>
        )}
      </div>
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading || !conversationId} />
    </div>
  );
}

export default ChatArea;
