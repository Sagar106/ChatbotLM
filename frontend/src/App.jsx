import { useEffect, useRef, useState } from 'react'
import './App.css'
import { IoSend } from "react-icons/io5";
import { getSessionId } from './utils/session';
import { apiFetch } from './utils/api';
import { TbLoader2 } from "react-icons/tb";
import { GiArtificialHive } from "react-icons/gi";

function App() {
  const [userInput, setUserInput] = useState("")
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const messageEndRef = useRef(null)
  const sessionId = getSessionId();

  const handleSend = async () => {
    if (!userInput.trim()) return

    const userMessage = { sender: "user", text: userInput }
    setMessages((prev) => [...prev, userMessage])

    await callServer(userInput)
  }

  const callServer = async (input) => {
    setUserInput("");
    setLoading(true)

    const loadingMessage = { sender: "bot", text: "Thinking...", loading: true };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const response = await apiFetch("/chat", {
        method: "POST",
        body: JSON.stringify({ message: input, sessionId: sessionId }),
      });

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { sender: "bot", text: response.message };
        return updated;
      });

      setLoading(false)
    } catch (err) {
      console.error(err);
      setLoading(false)
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          sender: "bot",
          text: "⚠️ Sorry, something went wrong.",
        };
        return updated;
      });
    }
  };

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  return (
    <div className="chat-wrapper flex flex-col h-screen bg-[#242424] text-white pt-5">
      {messages.length > 0 && (
        <div className="w-full px-4 md:px-8 py-2 mb-3 md:mb-5 flex justify-between items-center z-50">
          <GiArtificialHive className="text-3xl md:text-4xl" />
          <h1 className="font-[Dancing Script,cursive] font-bold text-3xl md:text-4xl">ToolLM</h1>
        </div>
      )}

      <div className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          <div className="flex flex-col flex-1 items-center justify-center space-y-6">
            <span className="flex justify-center items-center space-x-2">
              <GiArtificialHive className="text-4xl" />
              <h1 className="font-[Dancing Script,cursive] font-bold text-4xl">ToolLM</h1>
            </span>
            <p className="text-shadow-amber-50 text-xl md:text-2xl text-center">
              What's on your mind today?
            </p>
            <div className="flex items-center w-[90%] md:w-2xl mx-auto mt-4 relative rounded-4xl bg-[#414141] overflow-hidden">
              <textarea
                className="w-full py-4 px-4 outline-none resize-none max-h-20 md:max-h-16 text-sm md:text-base"
                placeholder="Ask anything"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <button
                className="cursor-pointer bg-yellow-600 p-3 mx-3 rounded-4xl hover:opacity-60"
                disabled={loading}
                onClick={handleSend}
              >
                {loading ? <TbLoader2 className="opacity-60" /> : <IoSend />}
              </button>
            </div>

          </div>
        ) : (
          <div className="flex-1 overflow-y-auto w-full md:w-[75%] mx-auto p-4 md:p-10 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`w-full ${msg.sender === "user" ? "flex justify-end" : "flex justify-start"
                    }`}
                >
                  {msg.sender === "user" ? (
                    <div className="max-w-[80%] md:max-w-md px-3 md:px-4 py-2 rounded-2xl bg-yellow-600 text-white rounded-br-none text-left text-sm md:text-base">
                      {msg.text}
                    </div>
                  ) : (
                    <div className="w-full text-gray-100 text-left px-4 md:px-6 py-3 md:py-4 rounded-xl whitespace-pre-wrap text-sm md:text-base">
                      {msg.loading ? (
                        <p className="animate-pulse text-gray-400">Thinking...</p>
                      ) : (
                        msg.text
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        )}
      </div>

      {messages.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-[#242424] px-3 py-3 md:py-6 z-50 border-t border-[#333]">
          <div className="flex items-center w-full md:w-2xl mx-auto relative rounded-4xl bg-[#414141] overflow-hidden">
            <textarea
              className="w-full py-4 px-4 outline-none resize-none max-h-20 md:max-h-16 text-sm md:text-base"
              placeholder="Ask anything"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button
              className="cursor-pointer bg-yellow-600 p-3 mx-3 rounded-4xl hover:opacity-60"
              disabled={loading}
              onClick={handleSend}
            >
              {loading ? <TbLoader2 className="opacity-60" /> : <IoSend />}
            </button>
          </div>
        </div>
      )}

    </div>
  );

}

export default App