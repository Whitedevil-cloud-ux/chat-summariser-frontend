import { useState } from "react";
import { motion } from "framer-motion";

function ChatInput({ onSendMessage, disabled }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 px-3 md:px-4 py-2 md:py-3 flex gap-2 bg-white dark:bg-gray-900">
      <input
        type="text"
        placeholder={disabled ? "Please wait..." : "Type your message..."}
        className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg px-3 md:px-4 py-2 focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition disabled:bg-gray-100 dark:disabled:bg-gray-800 outline-none bg-white dark:bg-gray-900 text-sm md:text-base"
        value={input}
        disabled={disabled}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => !disabled && e.key === "Enter" && handleSend()}
      />
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={handleSend}
        disabled={disabled}
        className="shrink-0 bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 text-white font-medium px-3 md:px-4 py-2 rounded-lg shadow-sm text-sm md:text-base"
      >
        Send
      </motion.button>
    </div>
  );
}

export default ChatInput;
