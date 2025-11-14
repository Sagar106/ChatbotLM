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
    <div
      className={`flex flex-col h-screen items-center justify-center bg-[#242424] text-white pt-5`}
    >
      {messages.length > 0 && (
        <div className="top-0 left-0 w-full px-4 md:px-8 py-2 mb-3 md:mb-5 flex justify-between items-center z-50">
          <GiArtificialHive className="text-3xl md:text-4xl" />
          <h1 className="font-[Dancing Script,cursive] font-bold text-3xl md:text-4xl">
            ToolLM
          </h1>
        </div>
      )}

      <div
        className={`w-full md:w-[75%] text-center message-container items-center-safe flex-2 overflow-y-auto p-4 md:p-10 space-y-3 md:space-y-4 ${messages.length === 0 ? "hidden" : "block"
          }`}
      >
        {messages.map((msg, i) => (
          <div
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            key={i}
          >
            <div
              className={`w-full ${msg.sender === "user" ? "flex justify-end" : "flex justify-start"
                }`}
            >
              {msg.sender === "user" ? (
                <div className="max-w-[80%] md:max-w-xs lg:max-w-md px-3 md:px-4 py-2 rounded-2xl bg-yellow-600 text-white rounded-br-none text-left text-sm md:text-base">
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

      {messages.length === 0 ? (
        <>
          <span className="flex pb-2">
            <GiArtificialHive className="text-4xl pr-1" />
            <h1 className="font-[Dancing Script,cursive] font-bold text-4xl">
              ToolLM
            </h1>
          </span>
          <p className="text-shadow-amber-50 text-xl md:text-2xl pb-5">
            What's on your mind today?
          </p>
        </>
      ) : null}

      <div className="flex items-center justify-center text-center py-4 md:py-6 w-full">
        <div className="flex items-center w-[95%] md:w-2xl relative rounded-4xl bg-[#414141] overflow-hidden">
          <textarea
            className="w-full py-4 md:py-5 px-4 md:px-5 outline-none resize-none max-h-20 md:max-h-16 text-sm md:text-base"
            placeholder="Ask anything"
            type="text"
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
            className="cursor-pointer bg-yellow-600 p-2 md:p-3 mx-2 md:mx-3 rounded-4xl hover:opacity-60"
            disabled={loading}
            onClick={handleSend}
          >
            {loading ? (
              <TbLoader2 className="opacity-60" />
            ) : (
              <IoSend />
            )}
          </button>
        </div>
      </div>
    </div>
  );

}

export default App
