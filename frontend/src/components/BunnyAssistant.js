import { useState, useEffect, useRef } from "react";
import "../styles/BunnyAssistant.css";

import bunnyWave from "../assets/bunny/waving.png";
import bunnyMoney from "../assets/bunny/counting-money.png";
import bunnyThinking from "../assets/bunny/thinking.png";
import bunnySleep from "../assets/bunny/sleeping.png";
import bunnyAdvice from "../assets/bunny/advice.png";
import bunnyCelebrate from "../assets/bunny/celebrate.png";

function BunnyAssistant({ remainingBudget = 17550, monthlyBudget = 30000, todaySpending = 450, expenses = [] }) {
  const [bunnyState, setBunnyState] = useState("waving");
  const [isThinking, setIsThinking] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "🐰 Hey Vidya! I'm Bunny, your finance buddy! Ask me anything about your spending or budget!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef(null);

  const savingsRate = Math.round(((monthlyBudget - todaySpending) / monthlyBudget) * 100);
  const budgetUsedPercent = Math.round(((monthlyBudget - remainingBudget) / monthlyBudget) * 100);
  const budgetLeftPercent = Math.round((remainingBudget / monthlyBudget) * 100);

  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const categoryBreakdown = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});

  const bunnyStates = {
    waving: { image: bunnyWave, message: "Hello Vid 👋", sub: "Ready to track expenses?" },
    counting: { image: bunnyMoney, message: "🐰 You're doing great!", sub: "Keep saving money." },
    thinking: { image: bunnyThinking, message: "Analyzing your spending...", sub: "Give me a moment 🤔" },
    sleeping: { image: bunnySleep, message: "I'm resting 😴", sub: "Click me anytime!" },
    advice: { image: bunnyAdvice, message: "⚠️ You've used 80% of your budget!", sub: "Try reducing unnecessary expenses." },
    celebrate: { image: bunnyCelebrate, message: "Amazing! 🎉", sub: "You're saving really well!" },
  };

  useEffect(() => {
    if (!hasLoaded) { setHasLoaded(true); return; }
    if (isThinking) return;
    if (savingsRate > 75) setBunnyState("celebrate");
    else if (budgetUsedPercent >= 80) setBunnyState("advice");
    else if (budgetLeftPercent > 50) setBunnyState("counting");
    else setBunnyState("waving");
  }, [remainingBudget, todaySpending, isThinking]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (isThinking) return;
      if (savingsRate > 75) setBunnyState("celebrate");
      else if (budgetUsedPercent >= 80) setBunnyState("advice");
      else if (budgetLeftPercent > 50) setBunnyState("counting");
    }, 5000);
    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    let inactivityTimer;
    const resetTimer = () => {
      if (isThinking || showChat) return;
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => setBunnyState("sleeping"), 30000);
    };
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    resetTimer();
    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
    };
  }, [isThinking, showChat]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAskBunny = (e) => {
    e.stopPropagation();
    setShowChat(true);
    setBunnyState("waving");
  };

  const handleCardClick = () => {
    if (bunnyState === "sleeping") setBunnyState("waving");
  };

  const sendMessage = async () => {
    if (!input.trim() || isChatLoading) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsChatLoading(true);
    setBunnyState("thinking");

    const systemPrompt = `You are Bunny, a cute and friendly AI finance assistant for the BunnyBudget app. 
You speak in a warm, encouraging, and slightly playful tone. Use occasional bunny/money emojis.
Keep responses short (2-4 sentences max). Give specific, actionable financial advice.

Here is the user's current financial data:
- Monthly Budget: ₹${monthlyBudget}
- Total Expenses This Month: ₹${totalExpenses}
- Remaining Budget: ₹${remainingBudget}
- Today's Spending: ₹${todaySpending}
- Savings Rate: ${savingsRate}%
- Budget Used: ${budgetUsedPercent}%
- Spending by Category: ${JSON.stringify(categoryBreakdown)}

Always reference their actual numbers when giving advice. Be specific and helpful.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: systemPrompt,
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      const reply = data.content?.[0]?.text || "🐰 Oops! I had trouble thinking. Try again!";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);

      if (savingsRate > 75) setBunnyState("celebrate");
      else if (budgetUsedPercent >= 80) setBunnyState("advice");
      else setBunnyState("counting");
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "🐰 Sorry, I couldn't connect right now. Try again!" },
      ]);
      setBunnyState("waving");
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const current = bunnyStates[bunnyState];

  return (
    <div className="bunny-card" onClick={handleCardClick}>
      <div className="bunny-header">
        <span>🐰</span>
        <h3>Bunny Assistant</h3>
        <span className="bunny-sparkle">✦</span>
      </div>

      {!showChat ? (
        <>
          <div className={`bunny-illustration ${isThinking ? "thinking-anim" : ""}`}>
            <img src={current.image} alt={bunnyState} className="bunny-img" />
          </div>
          <p className="bunny-message">{current.message}</p>
          <p className="bunny-sub">{current.sub}</p>

          <div className="bunny-stats">
            <div className="bunny-stat-row">
              <div className="bunny-stat-icon purple">👛</div>
              <span className="bunny-stat-label">Budget Left</span>
              <span className="bunny-stat-value">₹{remainingBudget.toLocaleString()}</span>
            </div>
            <div className="bunny-stat-row">
              <div className="bunny-stat-icon blue">📈</div>
              <span className="bunny-stat-label">Today's Spending</span>
              <span className="bunny-stat-value">₹{todaySpending.toLocaleString()}</span>
            </div>
            <div className="bunny-stat-row">
              <div className="bunny-stat-icon green">🎯</div>
              <span className="bunny-stat-label">Savings Rate</span>
              <span className="bunny-stat-value green-text">{savingsRate}%</span>
            </div>
          </div>

          <button className="bunny-btn" onClick={handleAskBunny}>
            ✦ Ask Bunny →
          </button>
        </>
      ) : (
        <div className="bunny-chat" onClick={(e) => e.stopPropagation()}>
          <div className="chat-bunny-top">
            <img src={current.image} alt="bunny" className="chat-bunny-mini" />
            <button className="chat-close" onClick={() => setShowChat(false)}>✕</button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {isChatLoading && (
              <div className="chat-bubble assistant typing">
                <span></span><span></span><span></span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="chat-input-row">
            <input
              type="text"
              placeholder="Ask Bunny anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="chat-input"
            />
            <button className="chat-send" onClick={sendMessage} disabled={isChatLoading}>
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BunnyAssistant;
