import { useEffect, useRef, useState } from "react";
import { listenMessages, sendMessage } from "../lib/chat";
import { displayNameOf, initialsOf } from "../lib/utils";
import { useAuth } from "../context/AuthContext";

export default function ChatPanel({ showChat }) {
  const { user } = useAuth();
  const userId = user?.uid || user?.id;
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    const unsub = listenMessages(setMsgs);
    return unsub;
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() || !userId) return;
    await sendMessage(text.trim(), { uid: userId, name: displayNameOf(user) });
    setText("");
  };

  if (!showChat) return null;

  return (
    <aside className="fixed bottom-20 right-6 w-[320px] bg-white rounded-[8px] shadow-lg flex flex-col">
      <header className="p-4 border-b border-[#e1e4e8]">
        <h3 className="font-medium text-[#2d3748]">Team Chat</h3>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {msgs.map((msg) => (
          <Bubble key={msg.id} msg={msg} me={msg.uid === userId} />
        ))}
        <div ref={bottomRef}></div>
      </div>

      <form onSubmit={handleSend} className="flex border-t border-[#e1e4e8]">
        <input
          className="flex-1 px-3 py-2 outline-none"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="px-4 bg-[#00a3bf] text-white disabled:opacity-40" disabled={!text.trim()}>
          Send
        </button>
      </form>
    </aside>
  );
}

function Bubble({ msg, me }) {
  return (
    <div className={`flex ${me ? "justify-end" : "justify-start"}`}>
      {!me && <Avatar name={msg.name} />}
      <div
        className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${
          me ? "bg-[#00a3bf] text-white" : "bg-[#f7fafc] text-[#2d3748]"
        }`}
      >
        {!me && <span className="block font-medium mb-1">{msg.name}</span>}
        {msg.text}
      </div>
    </div>
  );
}

function Avatar({ name }) {
  return (
    <div className="mr-2 h-8 w-8 rounded-full bg-[#e2e8f0] flex items-center justify-center text-xs font-bold text-[#4a5568]">
      {initialsOf({ name })}
    </div>
  );
}
