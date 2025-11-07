import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, Eye, Search } from "lucide-react";
import { API_BASE } from "../config";

function Dashboard() {
  const [conversations, setConversations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");

  const fetchConversations = async () => {
    try {
      const res = await fetch(`${API_BASE}/chat/list/`);
      const data = await res.json();
      setConversations(data);
      setFiltered(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
    const filteredData = conversations.filter((conv) =>
      conv.title.toLowerCase().includes(value)
    );
    setFiltered(filteredData);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this conversation?")) {
      await fetch(`${API_BASE}/chat/${id}/delete/`, {
        method: "DELETE",
      });
      fetchConversations();
    }
  };

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Dashboard
        </h1>

        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search conversations by title..."
            value={query}
            onChange={handleSearch}
            className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring focus:ring-indigo-400 shadow-sm"
          />
          <Search className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={18} />
        </div>

        {filtered.length ? (
          <motion.div
            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  delayChildren: 0.1,
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {filtered.map((conv) => (
              <motion.div
                key={conv.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 p-5 flex flex-col justify-between hover:shadow-xl transition"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
                    {conv.title || "Untitled Chat"}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(conv.start_time).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-2">
                    {conv.ai_summary || "No summary available. Click to view full conversation."}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <Link
                    to={`/chat/${conv.id}`}
                    className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 text-sm rounded-md transition"
                  >
                    <Eye size={14} /> View
                  </Link>

                  <button
                    onClick={() => handleDelete(conv.id)}
                    className="text-red-500 hover:text-red-600"
                    title="Delete chat"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No conversations found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
