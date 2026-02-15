"use client";

import { useState, useRef, useEffect } from "react";
import { sendAIMessage } from "@/lib/apiClient";
import { Send, Bot, User, Sparkles, Zap } from "lucide-react";

export default function AIChatBox({ patientId = null }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await sendAIMessage({
        message: input,
        patientId,
      });

      const aiMessage = {
        role: "assistant",
        content: response.reply,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error("AI Error:", err);

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "AI failed to respond." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative h-[600px] flex flex-col">
      
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-6 scroll-smooth">
        
        {/* Empty State */}
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-6 rounded-3xl">
                <Bot className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">
                AI Medical Assistant Ready
              </h3>
              <p className="text-gray-500 max-w-md">
                Ask me about patient trends, risk patterns, clinical suggestions, or weekly summaries
              </p>
            </div>

            {/* Quick Action Pills */}
            <div className="flex flex-wrap gap-2 justify-center max-w-lg">
              <button
                onClick={() => setInput("Show me high-risk patients")}
                className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full text-sm text-blue-700 hover:from-blue-100 hover:to-indigo-100 transition-all hover:scale-105"
              >
                <Sparkles className="w-3 h-3 inline mr-1" />
                High-risk patients
              </button>
              <button
                onClick={() => setInput("Generate weekly summary")}
                className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-full text-sm text-purple-700 hover:from-purple-100 hover:to-pink-100 transition-all hover:scale-105"
              >
                <Zap className="w-3 h-3 inline mr-1" />
                Weekly summary
              </button>
              <button
                onClick={() => setInput("What are the current trends?")}
                className="px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full text-sm text-green-700 hover:from-green-100 hover:to-emerald-100 transition-all hover:scale-105"
              >
                <Sparkles className="w-3 h-3 inline mr-1" />
                Current trends
              </button>
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-3 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            } animate-fadeIn`}
            style={{
              animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`
            }}
          >
            {msg.role === "assistant" && (
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl blur-md opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 rounded-xl">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            )}

            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                  : "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 border border-gray-200 shadow-sm"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </p>
            </div>

            {msg.role === "user" && (
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl blur-md opacity-50"></div>
                  <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-xl">
                    <User className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex gap-3 justify-start animate-fadeIn">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl blur-md opacity-50"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 rounded-xl">
                  <Bot className="w-5 h-5 text-white animate-pulse" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-200"></div>
                </div>
                <span className="text-sm text-gray-600">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t bg-gradient-to-br from-gray-50 to-white p-4">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              rows="1"
              className="w-full border-2 border-gray-200 focus:border-indigo-400 rounded-2xl px-4 py-3 pr-12 resize-none focus:outline-none transition-all bg-white shadow-sm hover:shadow-md"
              placeholder="Ask me anything about your patients..."
              style={{
                minHeight: "52px",
                maxHeight: "120px",
              }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
              }}
            />
            <div className="absolute right-3 bottom-3 text-xs text-gray-400">
              Press Enter ↵
            </div>
          </div>

          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="group relative px-6 py-3 rounded-2xl font-semibold overflow-hidden transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 h-[52px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 transition-transform group-hover:scale-110"></div>
            <div className="relative flex items-center gap-2 text-white">
              <Send className="w-5 h-5" />
              <span>Send</span>
            </div>
          </button>
        </div>

        {/* Tips */}
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
          <Sparkles className="w-3 h-3" />
          <span>Pro tip: Ask specific questions for better insights</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
