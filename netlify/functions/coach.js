exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: cors(), body: "" };
  }

  try {
    const { prompt } = JSON.parse(event.body || "{}");
    const reply =
`Here's a 1-week plan based on: "${prompt || "your goal"}"
• Update resume bullets with metrics
• Apply to 5 roles/day
• 30 mins/day interview practice
• Reach out to 3 LinkedIn contacts
• Block 2 hrs for a portfolio project`;

    return { statusCode: 200, headers: cors(), body: JSON.stringify({ reply }) };
  } catch (e) {
    return { statusCode: 400, headers: cors(), body: JSON.stringify({ error: "Bad request" }) };
  }
};

function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
