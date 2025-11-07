import { useState } from "react";
import { motion } from "framer-motion";
import { Loader, MessageCircle, Search } from "lucide-react";
import { API_BASE } from "../config";

function QueryPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuery = async () => {
    if (!question.trim()) return;
    setIsLoading(true);
    setError(null);
    setAnswer("");
    setSources([]);

    try {
      const res = await fetch(`${API_BASE}/chat/query/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setAnswer(data.answer);
        setSources(data.sources || []);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to connect to server. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Intelligent Query
        </h1>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 border border-gray-200 dark:border-gray-700"
        >
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-lg focus:ring focus:ring-indigo-300 resize-none"
            placeholder="Ask something about past conversations..."
            disabled={isLoading}
          />

          <button
            onClick={handleQuery}
            disabled={isLoading}
            className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium py-2 rounded-lg flex items-center justify-center gap-2 transition disabled:bg-gray-400"
          >
            {isLoading ? (
              <>
                <Loader size={18} className="animate-spin" />
                Thinking...
              </>
            ) : (
              <>
                <Search size={18} />
                Ask
              </>
            )}
          </button>
        </motion.div>

        {error && (
          <div className="mt-4 bg-red-100 text-red-600 border border-red-300 rounded-lg p-3">
            {error}
          </div>
        )}

        {answer && !isLoading && (
          <motion.div
            className="mt-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-left border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <MessageCircle size={20} className="text-indigo-600" /> AI Answer
            </h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}

        {sources.length > 0 && (
          <div className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Relevant Sources
            </h2>
            {sources.map((src, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-4 rounded-lg shadow-sm text-left"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                  {src.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                  {src.summary}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Ended at: {new Date(src.ended_at).toLocaleString()}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default QueryPage;
