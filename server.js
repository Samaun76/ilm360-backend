import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { searchAllSources } from "./search.js";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "1mb" }));

app.use(rateLimit({ windowMs: 60 * 1000, max: 30 }));

app.get("/health", (req, res) => res.json({ ok: true }));

app.post("/ask", (req, res) => {
  const question = String(req.body?.question || "").trim();
  const results = searchAllSources(question);
  res.json(results);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
