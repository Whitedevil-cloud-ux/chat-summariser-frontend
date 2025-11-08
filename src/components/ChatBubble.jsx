function ChatBubble({ sender, message, timestamp, followUps = [], onClickFollowUp }) {
  const isUser = sender === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-full sm:max-w-[85%] md:max-w-[70%] px-4 py-2 rounded-2xl shadow-sm break-words ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-none"
            : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none"
        }`}
      >
        <div className="whitespace-pre-wrap">{message}</div>
        {timestamp && (
          <div
            className={`text-[10px] mt-1 opacity-70 ${
              isUser ? "text-white" : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {new Date(timestamp).toLocaleTimeString()}
          </div>
        )}

        {!isUser && followUps.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {followUps.map((q, idx) => (
              <button
                key={idx}
                onClick={() => onClickFollowUp(q)}
                className="px-3 py-1 rounded-full border border-indigo-400 text-indigo-600 dark:text-indigo-300 text-xs bg-white dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 transition shadow-sm"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatBubble;
