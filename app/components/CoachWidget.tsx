const send = async () => {
  if (!input.trim()) return;
  const userMsg: Msg = { from: "user", text: input.trim() };
  setMessages(m => [...m, userMsg]);
  const payload = input.trim();
  setInput("");

  try {
    const res = await fetch("/.netlify/functions/coach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: payload })
    });
    const data = await res.json();
    setMessages(m => [...m, { from: "bot", text: data.reply || "Thanks! (no reply)" }]);
  } catch {
    setMessages(m => [...m, { from: "bot", text: "Sorry, I couldn’t reach the coach service." }]);
  }
};

