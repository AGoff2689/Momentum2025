// Very light, client-side "resume" text extraction (no backend).
// Looks for skills, education levels, and years of experience from pasted text.
const SKILL_WORDS = [
  "python","javascript","typescript","react","next","node","sql","excel","power bi","tableau",
  "java","c++","c#","aws","gcp","azure","docker","kubernetes","git","figma","photoshop",
  "seo","sem","salesforce","hubspot","jira","confluence","html","css","go","ruby","php",
  "data analysis","machine learning","nlp","pandas","numpy","scikit-learn","spark","hadoop"
];

export function extractFromText(txt: string) {
  const text = (txt || "").toLowerCase();

  // Skills (frequency-based)
  const skills = Array.from(new Set(
    SKILL_WORDS.filter(w => text.includes(w))
               .map(w => w.replace(/\s+/g, " ").trim())
  )).sort();

  // Education (simple heuristic)
  let education = "";
  if (/ph\.?d|doctorate/.test(text)) education = "PhD";
  else if (/master|msc|mba/.test(text)) education = "Master's";
  else if (/bachelor|b\.?s|b\.?a/.test(text)) education = "Bachelor's";
  else if (/associate/.test(text)) education = "Associate";

  // Years of experience (first 1–2 digits followed by 'year')
  const yrsMatch = text.match(/(\d{1,2})\s*\+?\s*(years?|yrs)/);
  const years = yrsMatch ? parseInt(yrsMatch[1], 10) : undefined;

  return { skills, education, years };
}
