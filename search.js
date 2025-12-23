import fs from "fs";

const QURAN = JSON.parse(fs.readFileSync("./data/quran_en.json", "utf8"));

export function searchAllSources(question) {
  const q = (question || "").toLowerCase();
  const matches = QURAN.filter(v => (v.en_text || "").toLowerCase().includes(q)).slice(0, 2);
  return { question, evidence: matches.map(m => ({ type: "quran", ref: m.ref, en_text: m.en_text })) };
}
