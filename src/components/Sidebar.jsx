import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2, MessageSquarePlus } from "lucide-react";

function Sidebar({ onSelectConversation, onNewConversation, activeId }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://127.0.0.1:8000/api/chat/list/");
      const data = await res.json();
      setConversations(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <motion.aside
      initial={{ x: -200, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, type: "spring" }}
      className="w-72 flex flex-col bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg"
    >
      <div className="sticky top-0 bg-white dark:bg-gray-800 px-4 py-3 z-20 shadow-sm">
        <button
          onClick={onNewConversation}
          className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-full flex items-center justify-center gap-2 transition focus:ring-2 focus:ring-indigo-400"
        >
          <MessageSquarePlus size={16} />
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {loading && <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">Loading...</div>}
        <ul className="mt-2 space-y-1 px-3 pb-6 w-full">
          {conversations.map((c, index) => (
            <motion.li
              key={c.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className={`group px-3 py-2 rounded-lg cursor-pointer transition ${
                activeId === c.id
                  ? "bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 shadow-inner ring-2 ring-indigo-400"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <div onClick={() => onSelectConversation?.(c.id)} className="flex justify-between items-start">
                <div className="flex flex-col flex-1 pr-2">
                  <span className="text-sm font-semibold truncate dark:text-gray-200">{c.title || "Untitled"}</span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">{new Date(c.start_time).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition mt-2 pl-1">
                <button
                  onClick={async () => {
                    const newTitle = prompt("Enter new title:", c.title);
                    if (newTitle) {
                      await fetch(`http://127.0.0.1:8000/api/chat/${c.id}/edit/`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ title: newTitle }),
                      });
                      fetchList();
                    }
                  }}
                  className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-300"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={async () => {
                    if (window.confirm("Delete this conversation?")) {
                      await fetch(`http://127.0.0.1:8000/api/chat/${c.id}/delete/`, {
                        method: "DELETE",
                      });
                      fetchList();
                      if (activeId === c.id) onSelectConversation?.(null);
                    }
                  }}
                  className="text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
}

export default Sidebar;
