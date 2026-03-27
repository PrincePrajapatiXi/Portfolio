import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Sparkles, RotateCcw } from "lucide-react";

// ─── INITIAL MESSAGES ────────────────────────────────────────────────────────
const INITIAL_MESSAGES = [
  {
    role: "assistant",
    content: "Hey! I'm Prince AI 👋 Ask me anything about Prince's skills, projects, or experience!",
  },
];

const QUICK_PROMPTS = [
  "What are his skills?",
  "Show me his projects",
  "How to contact him?",
  "Tech stack?",
];

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

// ─── PRINCE KA DATA ──────────────────────────────────────────────────────────
const PRINCE_CONTEXT = `
You are "Prince AI" — a smart, friendly portfolio assistant for Prince Prajapati, a 18-year-old freelance web developer from Orai, Uttar Pradesh, India.

ABOUT PRINCE:
- Full-stack / frontend developer skilled in: React, Next.js, Node.js, TypeScript, Tailwind CSS, Framer Motion, MongoDB, Firebase, Express.js
- Currently in 12th grade (UP Board), planning B.Tech in Computer Science
- Long-term goal: join Microsoft or Google as a Software Engineer
- Portfolio: portfolio.armysmp.fun
- Runs a Minecraft-related store: store.armysmp.fun
- GitHub: PrincePrajapatiXi

PROJECTS PRINCE HAS BUILT:
1. AkashaLog — Genshin Impact companion app (Next.js 14, TypeScript, Tailwind, Framer Motion)
2. Catchy Electronics — E-commerce platform (React, Firebase, Google OAuth)
3. AETHER — AI weather app with India-specific mobile-first features
4. DevZen — Developer SaaS platform + Discord community
5. WinGuide — Windows help site for Indian non-tech users
6. QuickShow — Movie ticket booking site (React/Vite, affiliate model)
7. Army SMP Store — Minecraft-related store (store.armysmp.fun)
8. Portfolio website — portfolio.armysmp.fun

SKILLS SUMMARY:
- Frontend: React, Next.js, HTML, CSS, Tailwind CSS, Framer Motion
- Backend: Node.js, Express.js, TypeScript
- Databases: MongoDB, Firebase, Prisma, PostgreSQL
- Auth: Clerk, Firebase Auth, OTP systems
- Payments: Razorpay, Cashfree integration experience
- Tools: Git, GitHub, VS Code, Windsurf

PERSONALITY:
Prince is a strong introvert, self-taught developer who prefers learning through doing. He is passionate about building real products, not just tutorial projects.

YOUR BEHAVIOR AS PRINCE AI:
- Answer questions about Prince's skills, projects, experience, and contact info
- Be concise, friendly, and slightly witty — like a smart friend
- If asked something unrelated to Prince's portfolio, politely redirect: "I'm best at answering questions about Prince's work! Try asking about his projects or skills."
- Respond in the same language the user uses (Hindi/Hinglish/English)
- Keep responses short (2-4 sentences max) unless more detail is needed
- Never make up information not listed above
`;
// ───────────────────────────────────────────────────────────────────────────

const callClaudeAPI = async (conversationHistory) => {
    // Try the production serverless endpoint first
    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: conversationHistory }),
        });

        if (response.ok) {
            const data = await response.json();
            return data.content[0]?.text;
        }
    } catch (e) {
        console.log("Serverless endpoint not found, falling back to direct call (Local Dev mode)");
    }

    // Fallback for Local Development (Vite dev server doesn't run /api/ functions)
    const apiKey = import.meta.env.VITE_CLAUDE_API_KEY;
    if (!apiKey) throw new Error("API Key missing");

    const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
            "dangerously-allow-browser": "true" 
        },
        body: JSON.stringify({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 1000,
            system: PRINCE_CONTEXT,
            messages: conversationHistory,
        }),
    });

    const data = await response.json();
    return data.content[0]?.text;
};

  const handleSend = async (messageText) => {
    const text = messageText || input;
    if (!text.trim() || isLoading) return;

    const userMessage = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Build conversation history for API
      const apiHistory = updatedMessages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const botReply = await callClaudeAPI(apiHistory);
      setMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Oops! Something went wrong. Make sure your API key is correct and Cors is allowed 🙏" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
    setInput("");
  };

  const TypingIndicator = () => (
    <div className="flex justify-start">
      <div className="bg-secondary text-foreground rounded-2xl rounded-tl-none px-4 py-3 text-sm flex items-center gap-1">
        <span
          className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <span
          className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <span
          className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="glass-strong w-80 md:w-96 rounded-3xl overflow-hidden shadow-2xl mb-4 flex flex-col h-[520px]"
          >
            {/* Header */}
            <div className="bg-primary p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl relative">
                  <Bot size={20} className="text-white" />
                  <Sparkles
                    size={10}
                    className="text-yellow-300 absolute -top-1 -right-1 animate-pulse"
                  />
                </div>
                <div>
                  <h3 className="text-white font-bold leading-none flex items-center gap-1">
                    Prince AI
                    <span className="text-[10px] bg-white/20 text-white/90 px-1.5 py-0.5 rounded-full font-normal ml-1">
                      Claude
                    </span>
                  </h3>
                  <span className="text-white/70 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse inline-block" />
                    Online & Ready
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  title="Clear chat"
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <RotateCcw size={16} className="text-white/70" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-primary/20"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-white rounded-tr-none"
                        : "bg-secondary text-foreground rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && <TypingIndicator />}

              {/* Quick prompts — only show at start */}
              {messages.length === 1 && !isLoading && (
                <div className="pt-1 flex flex-wrap gap-2">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      className="text-xs bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-full px-3 py-1.5 transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/50 bg-background/50">
              <div className="flex gap-2 items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask me something..."
                  disabled={isLoading}
                  className="flex-1 bg-secondary rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all disabled:opacity-50 placeholder:text-muted-foreground"
                />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="p-2.5 bg-primary text-white rounded-xl hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                </motion.button>
              </div>
              <p className="text-[10px] text-muted-foreground text-center mt-2 opacity-60">
                Powered by Claude AI · Answers about Prince only
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/30 relative group"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-highlight rounded-full border-2 border-background animate-pulse" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageSquare className="group-hover:rotate-12 transition-transform" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

