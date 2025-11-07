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
    <div className="border-t border-gray-200 px-4 py-3 flex bg-white">
      <input
        type="text"
        placeholder={disabled ? "Please wait..." : "Type your message..."}
        className="flex-1 border rounded-lg px-4 py-2 focus:ring focus:ring-indigo-200 focus:border-indigo-500 transition disabled:bg-gray-100 outline-none"
        value={input}
        disabled={disabled}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => !disabled && e.key === "Enter" && handleSend()}
      />
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleSend}
        disabled={disabled}
        className="ml-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 text-white font-medium px-4 py-2 rounded-lg shadow-sm"
      >
        Send
      </motion.button>
    </div>
  );
}

export default ChatInput;
