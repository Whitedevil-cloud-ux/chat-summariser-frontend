import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2, MessageSquarePlus, X } from "lucide-react";
import { API_BASE } from "../config";

function Sidebar({ onSelectConversation, onNewConversation, activeId, isOpen, toggleSidebar }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/chat/list/`);
      const data = await res.json();
      setConversations(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden ${isOpen ? "block" : "hidden"}`}
        onClick={toggleSidebar}
        aria-hidden
      />

      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="fixed md:static top-0 left-0 z-40 w-64 md:w-72 h-full bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg"
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 px-4 py-3 z-20 shadow-sm flex items-center justify-between">
          <button
            onClick={onNewConversation}
            className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-full flex items-center justify-center gap-2 transition focus:ring-2 focus:ring-indigo-400"
          >
            <MessageSquarePlus size={16} />
            New Chat
          </button>
          <button
            onClick={toggleSidebar}
            className="md:hidden ml-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        <div className="h-[calc(100%-56px)] overflow-y-auto overflow-x-hidden px-3 py-2">
          {loading && <div className="px-2 py-2 text-xs text-gray-500 dark:text-gray-400">Loading...</div>}
          <ul className="space-y-1">
            {conversations.map((c, index) => (
              <motion.li
                key={c.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className={`group px-3 py-2 rounded-lg cursor-pointer transition ${
                  Number(activeId) === Number(c.id)
                    ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 shadow-inner ring-2 ring-indigo-400"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <div onClick={() => onSelectConversation?.(c.id)} className="flex justify-between items-start">
                  <div className="flex flex-col flex-1 pr-2">
                    <span className="text-sm font-semibold truncate dark:text-gray-200">{c.title || "Untitled"}</span>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400">
                      {new Date(c.start_time).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-2 pl-1 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={async () => {
                      const newTitle = prompt("Enter new title:", c.title);
                      if (newTitle) {
                        await fetch(`${API_BASE}/chat/${c.id}/edit/`, {
                          method: "PATCH",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ title: newTitle }),
                        });
                        fetchList();
                      }
                    }}
                    className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-300"
                    aria-label="Edit title"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={async () => {
                      if (window.confirm("Delete this conversation?")) {
                        await fetch(`${API_BASE}/chat/${c.id}/delete/`, { method: "DELETE" });
                        fetchList();
                        if (Number(activeId) === Number(c.id)) onSelectConversation?.(null);
                      }
                    }}
                    className="text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                    aria-label="Delete conversation"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.aside>
    </>
  );
}

export default Sidebar;
