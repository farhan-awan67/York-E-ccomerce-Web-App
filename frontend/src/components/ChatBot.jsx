import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { ShopContext } from "../context/shopContext";

const ChatBot = () => {
  const { chatBot, messages, setMessages, loading } = useContext(ShopContext);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  // with sent button
  const sendMessage = () => {
    if (input.trim() === "") return;
    const newMessage = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, newMessage];

    setMessages(updatedMessages);
    setInput("");
    chatBot(updatedMessages); // pass updated messages
  };
  //   with enter key
  const sendMessageWithEnter = (e) => {
    if (input.trim() === "") return;
    if (e.key === "Enter") {
      const newMessage = { role: "user", content: input.trim() };
      const updatedMessages = [...messages, newMessage];

      setMessages(updatedMessages);
      setInput("");
      chatBot(updatedMessages); // pass updated messages
    }
  };

  // inside your component
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <div
          onClick={() => setOpen(true)}
          className="rounded-full w-[65px] h-[65px] fixed right-3 bottom-4 cursor-pointer border border-[#5d5c68] overflow-hidden z-50 animate-bounce"
        >
          <img
            className="w-full h-full object-cover"
            src={assets.ai_robot}
            alt="chatbot"
          />
        </div>
      )}

      {/* Chat Window with animation */}
      <div
        className={`fixed bottom-4 right-4 w-full max-w-80 z-50 transform transition-all duration-300 ${
          open
            ? "scale-100 opacity-100"
            : "scale-90 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-white shadow-md rounded-lg p-4 border">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg mb-2">York AI Assistant 🤖</h2>
            <span
              onClick={() => setOpen(false)}
              className="text-[28px] mb-1 cursor-pointer"
            >
              ×
            </span>
          </div>

          <div className="h-60 overflow-y-auto bg-gray-100 p-2 rounded mb-2 text-sm">
            {/* Add your messages here */}
            {messages.map((msg, idx) => (
              <p
                key={idx}
                className={`mb-2 ${
                  msg.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <strong>{msg.role === "user" ? "You" : "Bot"}:</strong>
                {msg.content}
              </p>
            ))}
            {loading && (
              <p className="text-gray-500 italic text-[40px] mb-2">
                <span className="animate-pulse">...</span>
              </p>
            )}
            <div ref={messagesEndRef} /> {/* 👈 Auto-scroll anchor */}
          </div>

          <div className="flex">
            <input
              value={input}
              onKeyDown={(e) => sendMessageWithEnter(e)}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-2 py-1 border rounded-l text-sm"
              placeholder="Ask something..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-3 py-1 rounded-r text-sm"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
