import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import CloseIcon from "@mui/icons-material/Close";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:5008", {
      path: "/socket.io",
      transports: ["websocket", "polling"],
      autoConnect: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("receiveMessage", (message: any) => {
      console.log("Received message:", message);

      if (
        message &&
        typeof message.content === "object" &&
        typeof message.content.content === "string" &&
        (message.content.role === "user" || message.content.role === "assistant")
      ) {
        const formattedMessage: Message = {
          content: message.content.content,
          role: message.content.role,
        };
        setMessages((prev) => [...prev, formattedMessage]);
      } else {
        console.warn("Unexpected message structure received:", message);
      }
    });

    setSocket(socket);

    return () => {
      socket.off("connect");
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, []);

  const handleSend = () => {
    if (!input.trim() || !socket) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    socket.emit("sendMessage", userMessage);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Chat Button */}
      <div
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-blue-600 transition duration-300"
        onClick={toggleChat}
      >
        <ChatIcon fontSize="large" />
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-20 right-6 w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col overflow-hidden border border-gray-300"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the chat
        >
          {/* Header */}
          <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
            <span className="font-semibold">Chat Assistant</span>
            <CloseIcon
              className="cursor-pointer"
              onClick={toggleChat}
            />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 rounded-lg max-w-xs text-sm ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-800"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-gray-300 flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
            title="hh"
              onClick={handleSend}
              className="bg-blue-500 text-white p-2 rounded-full ml-2 hover:bg-blue-600 transition duration-300"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
