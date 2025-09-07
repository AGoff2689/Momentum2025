exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: cors(), body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: cors(), body: JSON.stringify({ error: "Method not allowed" }) };
  }
  try {
    const { prompt = "" } = JSON.parse(event.body || "{}");
    // Very light heuristic reply; replace with your LLM later.
    const reply =
`Okay — based on: "${prompt}"

Here’s a 1-week starter plan:
• Refine your resume bullets with measurable outcomes
• Apply to 5 roles that match your target
• 30 minutes of interview practice each day
• Network outreach: message 3 relevant contacts
• Block 2 hours to build/refresh a portfolio example

Ask me to tailor this to your role, industry, or timeframe.`;
    return { statusCode: 200, headers: cors(), body: JSON.stringify({ reply }) };
  } catch (e) {
    return { statusCode: 200, headers: cors(), body: JSON.stringify({ reply: "I couldn’t process that—try again." }) };
  }
};

function cors(){
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
}
