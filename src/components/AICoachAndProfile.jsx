import { useState } from "react";
import { Bot, User, Send, Settings, Target, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Message({ role, content }) {
  const mine = role === "user";
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm ${
          mine ? "bg-teal-600 text-white" : "bg-white text-gray-800 border border-gray-100"
        }`}
        role="text"
      >
        {content}
      </div>
    </div>
  );
}

export default function AICoachAndProfile({ view = "coach" }) {
  const [tab, setTab] = useState(view);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hey! I'm your AI Coach. How can I help today?" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input.trim() };
    const coachReply = {
      role: "assistant",
      content:
        "Got it! Based on your goal, aim for a 25‑minute full-body session today and keep protein high. Want a plan?",
    };
    setMessages((m) => [...m, userMsg, coachReply]);
    setInput("");
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-teal-100 grid place-items-center" aria-hidden>
          {tab === "coach" ? <Bot className="text-teal-700" size={20} /> : <User className="text-teal-700" size={20} />}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900">{tab === "coach" ? "AI Coach" : "Profile"}</h2>
          <p className="text-sm text-gray-500">{tab === "coach" ? "Personalized guidance and motivation" : "Your goals, preferences, and history"}</p>
        </div>
        <div className="flex gap-2 bg-gray-100 rounded-full p-1" role="tablist" aria-label="Coach or Profile">
          {[
            { key: "coach", label: "Coach" },
            { key: "profile", label: "Profile" },
          ].map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={`px-3 py-1.5 rounded-full text-sm ${
                tab === t.key ? "bg-white text-teal-700 shadow" : "text-gray-600"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {tab === "coach" ? (
          <motion.div
            key="coach"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-3"
          >
            <div className="h-[44vh] overflow-y-auto space-y-2 pr-1" aria-live="polite">
              {messages.map((m, i) => (
                <Message key={i} role={m.role} content={m.content} />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                aria-label="Message AI Coach"
                className="flex-1 px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Ask for a plan, tips, or motivation..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
              />
              <button onClick={send} className="px-4 py-2 rounded-xl bg-teal-600 text-white flex items-center gap-2">
                <Send size={16} /> Send
              </button>
            </div>
            <div className="text-xs text-gray-500">Powered by GPT-5-NANO for personalized responses.</div>
          </motion.div>
        ) : (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-xl border border-gray-100 p-3">
              <div className="font-semibold text-gray-900">Personal Information</div>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <div><span className="text-gray-500">Name:</span> Alex Runner</div>
                <div><span className="text-gray-500">Age:</span> 29</div>
                <div><span className="text-gray-500">Height:</span> 178 cm</div>
                <div><span className="text-gray-500">Weight:</span> 75 kg</div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-3">
              <div className="font-semibold text-gray-900 flex items-center gap-2"><Target size={16} className="text-teal-700" /> Goals</div>
              <ul className="list-disc ml-5 text-sm text-gray-700 mt-1">
                <li>Build lean muscle</li>
                <li>Run 5K under 25 minutes</li>
                <li>Eat 130g protein daily</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-3">
              <div className="font-semibold text-gray-900 flex items-center gap-2"><Heart size={16} className="text-orange-500" /> Wearables</div>
              <div className="text-sm text-gray-700 mt-1">Connected: Apple Health, Fitbit</div>
            </div>
            <button className="w-full px-4 py-2 rounded-xl bg-orange-400 text-white flex items-center justify-center gap-2">
              <Settings size={16} /> Settings
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
